import { crypto, dataConverter } from '@/shared/hostApi'

export const formatSinger = (rawData: string) => rawData.replace(/&/g, '、')

export const objStr2JSON = <T>(str: string): T => {
  return JSON.parse(str.replace(/('(?=(,\s*')))|('(?=:))|((?<=([:,]\s*))')|((?<={)')|('(?=}))/g, '"')) as T
}

interface PrevWord {
  startTime: number
  endTime: number
  timeStr: string
  newTimeStr?: string
}
export const lrcTools = {
  rxps: {
    wordLine: /^(\[\d{1,2}:.*\d{1,4}\])\s*(\S+(?:\s+\S+)*)?\s*/,
    tagLine: /\[(ver|ti|ar|al|offset|by|kuwo):\s*(\S+(?:\s+\S+)*)\s*\]/,
    wordTimeAll: /<(-?\d+),(-?\d+)(?:,-?\d+)?>/g,
    wordTime: /<(-?\d+),(-?\d+)(?:,-?\d+)?>/,
  },
  offset: 1,
  offset2: 1,
  isOK: false,
  lines: [] as string[],
  tags: [] as string[],
  getWordInfo(str: string, str2: string, prevWord: PrevWord | null) {
    const offset = parseInt(str)
    const offset2 = parseInt(str2)
    const startTime = Math.abs((offset + offset2) / (this.offset * 2))
    const endTime = Math.abs((offset - offset2) / (this.offset2 * 2)) + startTime
    if (prevWord) {
      if (startTime < prevWord.endTime) {
        prevWord.endTime = startTime
        if (prevWord.startTime > prevWord.endTime) {
          prevWord.startTime = prevWord.endTime
        }

        prevWord.newTimeStr = `<${prevWord.startTime},${prevWord.endTime - prevWord.startTime}>`
        // console.log(prevWord)
      }
    }
    return {
      startTime,
      endTime,
      timeStr: `<${startTime},${endTime - startTime}>`,
    }
  },
  parseLine(line: string) {
    if (line.length < 6) return
    let result = this.rxps.wordLine.exec(line)
    if (result) {
      const time = result[1]
      let words = result[2]

      words ??= ''
      const wordTimes = words.match(this.rxps.wordTimeAll)
      if (!wordTimes) return
      // console.log(wordTimes)
      let preTimeInfo: PrevWord | null = null
      for (const timeStr of wordTimes) {
        const result = this.rxps.wordTime.exec(timeStr)
        const wordInfo = this.getWordInfo(result![1], result![2], preTimeInfo)
        words = words.replace(timeStr, wordInfo.timeStr)
        if (preTimeInfo?.newTimeStr) words = words.replace(preTimeInfo.timeStr, preTimeInfo.newTimeStr)
        preTimeInfo = wordInfo
      }
      this.lines.push(time + words)
      return
    }
    result = this.rxps.tagLine.exec(line)
    if (!result) return
    if (result[1] == 'kuwo') {
      let content = result[2]
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (content != null && content.includes('][')) {
        content = content.substring(0, content.indexOf(']['))
      }
      const valueOf = parseInt(content, 8)
      this.offset = Math.trunc(valueOf / 10)
      this.offset2 = Math.trunc(valueOf % 10)
      if (this.offset == 0 || Number.isNaN(this.offset) || this.offset2 == 0 || Number.isNaN(this.offset2)) {
        this.isOK = false
      }
    } else {
      this.tags.push(line)
    }
  },
  parse(lrc: string) {
    // console.log(lrc)
    const lines = lrc.split(/\r\n|\r|\n/)
    const tools = Object.create(this) as typeof this
    tools.isOK = true
    tools.offset = 1
    tools.offset2 = 1
    tools.lines = []
    tools.tags = []

    for (const line of lines) {
      if (!tools.isOK) throw new Error('failed')
      tools.parseLine(line)
    }
    if (!tools.lines.length) return ''
    let lrcs = tools.lines.join('\n')
    if (tools.tags.length) lrcs = `${tools.tags.join('\n')}\n${lrcs}`
    // console.log(lrcs)

    return lrcs
  },
}

export const wbdCrypto = {
  aesKey: new Uint8Array([112, 87, 39, 61, 199, 250, 41, 191, 57, 68, 45, 114, 221, 94, 140, 228]),
  aesIv: '',
  appId: 'y67sprxhhpws',
  async decodeData<T>(base64Result: string) {
    const data = await dataConverter(decodeURIComponent(base64Result), 'base64')
    const decrypted = await crypto.aesDecrypt('ECB_128_NoPadding', data, this.aesKey, this.aesIv, 'utf-8')
    return JSON.parse(decrypted) as T
  },
  async createSign(data: string, time: number) {
    const str = `${this.appId}${data}${time}`
    return (await crypto.md5(str)).toUpperCase()
  },
  async buildParam(jsonData: Record<string, unknown>) {
    const data = JSON.stringify(jsonData)
    const time = Date.now()

    const encodeData = await crypto.aesEncrypt('ECB_128_NoPadding', data, this.aesKey, this.aesIv)
    const sign = await this.createSign(encodeData, time)

    return `data=${encodeURIComponent(encodeData)}&time=${time}&appId=${this.appId}&sign=${sign}`
  },
}
