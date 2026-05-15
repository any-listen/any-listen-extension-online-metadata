import { request } from '@/shared/hostApi'

import { getMusicInfo } from './musicDetail'
import { decrypt } from './utils/mrc'

const rxps = {
  lineTime: /^\s*\[(\d+),\d+\]/,
  wordTime: /\(\d+,\d+\)/,
  wordTimeAll: /(\(\d+,\d+\))/g,
}

const parseLyric = (str: string) => {
  str = str.replace(/\r/g, '')
  const lines = str.split('\n')
  const lxlrcLines: string[] = []
  const lrcLines: string[] = []

  for (const line of lines) {
    if (line.length < 6) continue
    const result = rxps.lineTime.exec(line)
    if (!result) continue

    const startTime = Number.parseInt(result[1], 10)
    let time = startTime
    const ms = time % 1000
    time /= 1000
    const m = Number.parseInt(String(time / 60), 10)
      .toString()
      .padStart(2, '0')
    time %= 60
    const s = Number.parseInt(String(time), 10).toString().padStart(2, '0')
    const timeLabel = `${m}:${s}.${ms}`

    const words = line.replace(rxps.lineTime, '')
    lrcLines.push(`[${timeLabel}]${words.replace(rxps.wordTimeAll, '')}`)

    const times = words.match(rxps.wordTimeAll) ?? []
    if (!times.length) continue
    const formatTimes = times.map((value) => {
      const result = /\((\d+),(\d+)\)/.exec(value)
      if (!result) return ''
      return `<${Number.parseInt(result[1], 10) - startTime},${result[2]}>`
    })
    const wordArr = words.split(rxps.wordTime)
    const newWords = formatTimes.map((value, index) => `${value}${wordArr[index]}`).join('')
    lxlrcLines.push(`[${timeLabel}]${newWords}`)
  }

  return {
    lyric: lrcLines.join('\n'),
    awlyric: lxlrcLines.join('\n'),
  }
}

const getText = async (url: string, tryNum = 0): Promise<string> => {
  const { body, statusCode } = await request<string>(url, {
    headers: {
      Referer: 'https://app.c.nf.migu.cn/',
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
      channel: '0146921',
    },
  })

  if (statusCode === 200) return body
  if (tryNum > 5 || statusCode === 404) throw new Error('歌词获取失败')
  return getText(url, tryNum + 1)
}

const getMrc = async (url: string) => {
  return parseLyric(await decrypt(await getText(url)))
}

const getLrc = async (url: string) => {
  return getText(url).then((text) => ({ lyric: text, awlyric: '' }))
}

const getTrc = async (url?: string) => {
  if (!url) return ''
  return getText(url)
}

export const getLyric = async (musicInfo: AnyListen_API.MusicInfoOnline) => {
  const songId = musicInfo.meta.musicId as string | undefined
  if (!songId) throw new Error('获取歌词失败')

  const info = musicInfo.meta.mrcUrl == null ? await getMusicInfo(songId) : musicInfo
  if (!info) throw new Error('获取歌词失败')

  const mrcUrl = typeof info.meta.mrcUrl === 'string' ? info.meta.mrcUrl : ''
  const lrcUrl = typeof info.meta.lrcUrl === 'string' ? info.meta.lrcUrl : ''
  const trcUrl = typeof info.meta.trcUrl === 'string' ? info.meta.trcUrl : undefined

  let promise: Promise<{ lyric: string; awlyric: string }>
  if (mrcUrl) promise = getMrc(mrcUrl)
  else if (lrcUrl) promise = getLrc(lrcUrl)
  else throw new Error('获取歌词失败')

  const [lrcInfo, tlyric] = await Promise.all([promise, getTrc(trcUrl)])
  return {
    lyric: lrcInfo.lyric,
    tlyric,
    rlyric: '',
    awlyric: lrcInfo.awlyric,
  }
}
