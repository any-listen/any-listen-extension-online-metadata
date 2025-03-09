import { console, request } from '@/shared/hostApi'
import { eapi } from './utils/crypto'
import { Lyric } from './types/lyric'

const eapiRequest = async <T = unknown>(url: string, data: object) => {
  const resp = await request<T>('https://interface3.music.163.com/eapi/song/lyric/v1', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
      origin: 'https://music.163.com',
      // cookie: 'os=pc; deviceId=A9C064BB4584D038B1565B58CB05F95290998EE8B025AA2D07AE; osver=Microsoft-Windows-10-Home-China-build-19043-64bit; appver=2.5.2.197409; channel=netease; MUSIC_A=37a11f2eb9de9930cad479b2ad495b0e4c982367fb6f909d9a3f18f876c6b49faddb3081250c4980dd7e19d4bd9bf384e004602712cf2b2b8efaafaab164268a00b47359f85f22705cc95cb6180f3aee40f5be1ebf3148d888aa2d90636647d0c3061cd18d77b7a0; __csrf=05b50d54082694f945d7de75c210ef94; mode=Z7M-KP5(7)GZ; NMTID=00OZLp2VVgq9QdwokUgq3XNfOddQyIAAAF_6i8eJg; ntes_kaola_ad=1',
    },
    form: eapi(url, data),
  })
  if (typeof resp.body == 'string') resp.body = JSON.parse(resp.body as string)
  return resp
}

interface Info {
  t: number
  c: C[]
}

interface C {
  tx: string
  li?: string
  or?: string
}

const parseTools = {
  rxps: {
    info: /^{"/,
    lineTime: /^\[(\d+),\d+\]/,
    wordTime: /\(\d+,\d+,\d+\)/,
    wordTimeAll: /(\(\d+,\d+,\d+\))/g,
  },
  msFormat(timeMs: number) {
    if (Number.isNaN(timeMs)) return ''
    const ms = timeMs % 1000
    timeMs /= 1000
    const m = Math.trunc(timeMs / 60)
      .toString()
      .padStart(2, '0')
    timeMs %= 60
    const s = Math.trunc(timeMs).toString().padStart(2, '0')
    return `[${m}:${s}.${ms}]`
  },
  parseLyric(lines: string[]) {
    const lxlrcLines = []
    const lrcLines = []

    for (let line of lines) {
      line = line.trim()
      const result = this.rxps.lineTime.exec(line)
      if (!result) {
        if (line.startsWith('[offset')) {
          lxlrcLines.push(line)
          lrcLines.push(line)
        }
        continue
      }

      const startMsTime = parseInt(result[1])
      const startTimeStr = this.msFormat(startMsTime)
      if (!startTimeStr) continue

      const words = line.replace(this.rxps.lineTime, '')

      lrcLines.push(`${startTimeStr}${words.replace(this.rxps.wordTimeAll, '')}`)

      const times = words.match(this.rxps.wordTimeAll)
      if (!times) continue
      const formatTimes = times.map((time) => {
        const result = /\((\d+),(\d+),\d+\)/.exec(time)!
        return `<${Math.max(parseInt(result[1]) - startMsTime, 0)},${result[2]}>`
      })
      const wordArr = words.split(this.rxps.wordTime)
      wordArr.shift()
      const newWords = formatTimes.map((time, index) => `${time}${wordArr[index]}`).join('')
      lxlrcLines.push(`${startTimeStr}${newWords}`)
    }
    return {
      lyric: lrcLines.join('\n'),
      awlyric: lxlrcLines.join('\n'),
    }
  },
  parseHeaderInfo(str: string) {
    str = str.trim()
    str = str.replace(/\r/g, '')
    if (!str) return null
    const lines = str.split('\n')
    return lines.map((line) => {
      if (!this.rxps.info.test(line)) return line
      try {
        const info = JSON.parse(line) as Info
        const timeTag = this.msFormat(info.t)
        return timeTag ? `${timeTag}${info.c.map((t) => t.tx).join('')}` : ''
      } catch {
        return ''
      }
    })
  },
  getIntv(interval?: string) {
    if (!interval) return 0
    if (!interval.includes('.')) interval += '.0'
    const arr = interval.split(/:|\./)
    while (arr.length < 3) arr.unshift('0')
    const [m, s, ms] = arr
    return parseInt(m) * 3600000 + parseInt(s) * 1000 + parseInt(ms)
  },
  fixTimeTag(lrc: string, targetlrc: string) {
    let lrcLines = lrc.split('\n')
    const targetlrcLines = targetlrc.split('\n')
    const timeRxp = /^\[([\d:.]+)\]/
    let temp: string[] = []
    const newLrc: string[] = []
    targetlrcLines.forEach((line) => {
      const result = timeRxp.exec(line)
      if (!result) return
      const words = line.replace(timeRxp, '')
      if (!words.trim()) return
      const t1 = this.getIntv(result[1])

      while (lrcLines.length) {
        const lrcLine = lrcLines.shift()!
        const lrcLineResult = timeRxp.exec(lrcLine)
        if (!lrcLineResult) continue
        const t2 = this.getIntv(lrcLineResult[1])
        if (Math.abs(t1 - t2) < 100) {
          const lrc = line.replace(timeRxp, lrcLineResult[0]).trim()
          if (!lrc) continue
          newLrc.push(lrc)
          break
        }
        temp.push(lrcLine)
      }
      lrcLines = [...temp, ...lrcLines]
      temp = []
    })
    return newLrc.join('\n')
  },
  parse(ylrc?: string, ytlrc?: string, yrlrc?: string, lrc?: string, tlrc?: string, rlrc?: string) {
    const info = {
      lyric: '',
      tlyric: '',
      rlyric: '',
      awlyric: '',
    }
    if (ylrc) {
      const lines = this.parseHeaderInfo(ylrc)
      if (lines) {
        const result = this.parseLyric(lines)
        if (ytlrc) {
          const lines = this.parseHeaderInfo(ytlrc)
          if (lines) {
            // if (lines.length == result.lyricLines.length) {
            info.tlyric = this.fixTimeTag(result.lyric, lines.join('\n'))
            // } else info.tlyric = lines.join('\n')
          }
        }
        if (yrlrc) {
          const lines = this.parseHeaderInfo(yrlrc)
          if (lines) {
            // if (lines.length == result.lyricLines.length) {
            info.rlyric = this.fixTimeTag(result.lyric, lines.join('\n'))
            // } else info.rlyric = lines.join('\n')
          }
        }

        const timeRxp = /^\[[\d:.]+\]/
        const headers = lines.filter((l) => timeRxp.test(l)).join('\n')
        info.lyric = `${headers}\n${result.lyric}`
        info.awlyric = result.awlyric
        return info
      }
    }
    if (lrc) {
      const lines = this.parseHeaderInfo(lrc)
      if (lines) info.lyric = lines.join('\n')
    }
    if (tlrc) {
      const lines = this.parseHeaderInfo(tlrc)
      if (lines) info.tlyric = lines.join('\n')
    }
    if (rlrc) {
      const lines = this.parseHeaderInfo(rlrc)
      if (lines) info.rlyric = lines.join('\n')
    }

    return info
  },
}

// https://github.com/lyswhut/lx-music-mobile/issues/370
const fixTimeLabel = (lrc: string, tlrc?: string, romalrc?: string) => {
  if (lrc) {
    const newLrc = lrc.replace(/\[(\d{2}:\d{2}):(\d{2})]/g, '[$1.$2]')
    const newTlrc = tlrc?.replace(/\[(\d{2}:\d{2}):(\d{2})]/g, '[$1.$2]') ?? tlrc
    if (newLrc != lrc || newTlrc != tlrc) {
      lrc = newLrc
      tlrc = newTlrc
      if (romalrc)
        romalrc = romalrc.replace(/\[(\d{2}:\d{2}):(\d{2,3})]/g, '[$1.$2]').replace(/\[(\d{2}:\d{2}\.\d{2})0]/g, '[$1]')
    }
  }

  return { lrc, tlrc, romalrc }
}

// https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/module/lyric_new.js
export const getLyric = async ({ meta }: AnyListen_API.MusicInfo) => {
  const { body } = await eapiRequest<Lyric>('/api/song/lyric/v1', {
    id: meta.musicId,
    cp: false,
    tv: 0,
    lv: 0,
    rv: 0,
    kv: 0,
    yv: 0,
    ytv: 0,
    yrv: 0,
  })
  // console.log(body)
  if (body.code !== 200 || !body?.lrc?.lyric) return Promise.reject(new Error('Get lyric failed'))
  const fixTimeLabelLrc = fixTimeLabel(body.lrc.lyric, body.tlyric?.lyric, body.romalrc?.lyric)
  const info = parseTools.parse(
    body.yrc?.lyric,
    body.ytlrc?.lyric,
    body.yromalrc?.lyric,
    fixTimeLabelLrc.lrc,
    fixTimeLabelLrc.tlrc,
    fixTimeLabelLrc.romalrc
  )
  // console.log(info)
  if (!info.lyric) return Promise.reject(new Error('Get lyric failed'))
  console.log('wy lyric:', meta.musicId)
  return info
}
