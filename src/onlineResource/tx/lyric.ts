import { request } from '@/shared/hostApi'

import { getMusicInfo } from './musicInfo'
import { decodeQrc } from './qrcDecode'
import type { Lyric } from './types/lyric2'

const decodeLyric = async (lrc: string, tlrc: string, rlrc: string) => ({
  lyric: await decodeQrc(lrc),
  tlyric: await decodeQrc(tlrc),
  rlyric: await decodeQrc(rlrc),
})

const parseTools = {
  rxps: {
    info: /^{"/,
    lineTime: /^\[(\d+),\d+\]/,
    lineTime2: /^\[([\d:.]+)\]/,
    wordTime: /\(\d+,\d+\)/,
    wordTimeAll: /(\(\d+,\d+\))/g,
    timeLabelFixRxp: /(?:\.0+|0+)$/,
  },
  msFormat(timeMs: number) {
    if (Number.isNaN(timeMs)) return ''
    let ms = timeMs % 1000
    timeMs /= 1000
    let m = Math.trunc(timeMs / 60)
      .toString()
      .padStart(2, '0')
    timeMs %= 60
    let s = Math.trunc(timeMs).toString().padStart(2, '0')
    return `[${m}:${s}.${String(ms).padStart(3, '0')}]`
  },
  parseLyric(lrc: string) {
    lrc = lrc.trim()
    lrc = lrc.replace(/\r/g, '')
    if (!lrc) return { lyric: '', awlyric: '' }
    const lines = lrc.split('\n')

    const awlrcLines = []
    const lrcLines = []

    for (let line of lines) {
      line = line.trim()
      let result = this.rxps.lineTime.exec(line)
      if (!result) {
        if (line.startsWith('[offset')) {
          awlrcLines.push(line)
          lrcLines.push(line)
        }
        if (this.rxps.lineTime2.test(line)) {
          // awlrcLines.push(line)
          lrcLines.push(line)
        }
        continue
      }

      const startMsTime = parseInt(result[1])
      const startTimeStr = this.msFormat(startMsTime)
      if (!startTimeStr) continue

      let words = line.replace(this.rxps.lineTime, '')

      lrcLines.push(`${startTimeStr}${words.replace(this.rxps.wordTimeAll, '')}`)

      let times = words.match(this.rxps.wordTimeAll)
      if (!times) continue
      const timesArr = times.map((time) => {
        const result = /\((\d+),(\d+)\)/.exec(time)
        return `<${Math.max(parseInt(result![1]) - startMsTime, 0)},${result![2]}>`
      })
      const wordArr = words.split(this.rxps.wordTime)
      const newWords = timesArr.map((time, index) => `${time}${wordArr[index]}`).join('')
      awlrcLines.push(`${startTimeStr}${newWords}`)
    }
    return {
      lyric: lrcLines.join('\n'),
      awlyric: awlrcLines.join('\n'),
    }
  },
  parseRlyric(lrc: string) {
    lrc = lrc.trim()
    lrc = lrc.replace(/\r/g, '')
    if (!lrc) return ''
    const lines = lrc.split('\n')

    const lrcLines: string[] = []

    for (let line of lines) {
      line = line.trim()
      let result = this.rxps.lineTime.exec(line)
      if (!result) continue

      const startMsTime = parseInt(result[1])
      const startTimeStr = this.msFormat(startMsTime)
      if (!startTimeStr) continue

      let words = line.replace(this.rxps.lineTime, '')

      lrcLines.push(`${startTimeStr}${words.replace(this.rxps.wordTimeAll, '')}`)
    }
    return lrcLines.join('\n')
  },
  removeTag(str: string) {
    return str.replace(/^[\S\s]*?LyricContent="/, '').replace(/"\/>[\S\s]*?$/, '')
  },
  getIntv(interval: string) {
    if (!interval) return 0
    if (!interval.includes('.')) interval += '.0'
    let arr = interval.split(/:|\./)
    while (arr.length < 3) arr.unshift('0')
    const [m, s, ms] = arr
    return parseInt(m) * 3600000 + parseInt(s) * 1000 + parseInt(ms)
  },
  fixRlrcTimeTag(rlrc: string, lrc: string) {
    // console.log(lrc)
    // console.log(rlrc)
    const rlrcLines = rlrc.split('\n')
    let lrcLines = lrc.split('\n')
    // let temp = []
    let newLrc: string[] = []
    rlrcLines.forEach((line) => {
      const result = this.rxps.lineTime2.exec(line)
      if (!result) return
      const words = line.replace(this.rxps.lineTime2, '')
      if (!words.trim()) return
      const t1 = this.getIntv(result[1])

      while (lrcLines.length) {
        const lrcLine = lrcLines.shift()!
        const lrcLineResult = this.rxps.lineTime2.exec(lrcLine)
        if (!lrcLineResult) continue
        const t2 = this.getIntv(lrcLineResult[1])
        if (Math.abs(t1 - t2) < 100) {
          newLrc.push(line.replace(this.rxps.lineTime2, lrcLineResult[0]))
          break
        }
        // temp.push(line)
      }
      // lrcLines = [...temp, ...lrcLines]
      // temp = []
    })
    return newLrc.join('\n')
  },
  fixTlrcTimeTag(tlrc: string, lrc: string) {
    // console.log(lrc)
    // console.log(tlrc)
    const tlrcLines = tlrc.split('\n')
    let lrcLines = lrc.split('\n')
    // let temp = []
    let newLrc: string[] = []
    tlrcLines.forEach((line) => {
      const result = this.rxps.lineTime2.exec(line)
      if (!result) return
      const words = line.replace(this.rxps.lineTime2, '')
      if (!words.trim()) return
      let time = result[1]
      if (time.includes('.')) {
        time += ''.padStart(3 - time.split('.')[1].length, '0')
      }
      const t1 = this.getIntv(time)

      while (lrcLines.length) {
        const lrcLine = lrcLines.shift()!
        const lrcLineResult = this.rxps.lineTime2.exec(lrcLine)
        if (!lrcLineResult) continue
        const t2 = this.getIntv(lrcLineResult[1])
        if (Math.abs(t1 - t2) < 100) {
          newLrc.push(line.replace(this.rxps.lineTime2, lrcLineResult[0]))
          break
        }
        // temp.push(line)
      }
      // lrcLines = [...temp, ...lrcLines]
      // temp = []
    })
    return newLrc.join('\n')
  },
  parse(lrc: string, tlrc: string, rlrc: string) {
    const info = {
      lyric: '',
      tlyric: '',
      rlyric: '',
      awlyric: '',
    }
    if (lrc) {
      let { lyric, awlyric } = this.parseLyric(this.removeTag(lrc))
      info.lyric = lyric
      info.awlyric = awlyric
      // console.log(lyric)
      // console.log(awlyric)
    }
    if (rlrc) info.rlyric = this.fixRlrcTimeTag(this.parseRlyric(this.removeTag(rlrc)), info.lyric)
    if (tlrc) info.tlyric = this.fixTlrcTimeTag(tlrc, info.lyric)
    // console.log(info.lyric)
    // console.log(info.tlyric)
    // console.log(info.rlyric)

    return info
  },
}

const promises = new Map<string, Promise<AnyListen_API.MusicInfoOnline | null>>()
const getSongId = async ({ meta: { songId, musicId } }: AnyListen_API.MusicInfoOnline): Promise<string | undefined> => {
  if (songId) return songId as string
  if (promises.has(musicId)) return (await promises.get(musicId)!)?.meta.songId as string | undefined
  const promise = getMusicInfo(musicId)
  promises.set(musicId, promise)
  const info = await promise
  promises.delete(musicId)
  return info?.meta.songId as string | undefined
}
const parseLyric = async (lrc: string, tlrc: string, rlrc: string) => {
  const { lyric, tlyric, rlyric } = await decodeLyric(lrc, tlrc, rlrc)
  // console.log(lyric)
  // console.log(tlyric)
  // console.log(rlyric)
  return parseTools.parse(lyric, tlyric, rlyric)
}

export const getLyric = async (mInfo: AnyListen_API.MusicInfoOnline) => {
  const songId = await getSongId(mInfo)
  if (!songId) throw new Error('Get lyric failed: songId not found')
  const { body } = await request<Lyric>('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    method: 'POST',
    headers: {
      referer: 'https://y.qq.com',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    },
    json: {
      comm: {
        ct: '19',
        cv: '1859',
        uin: '0',
      },
      req: {
        method: 'GetPlayLyricInfo',
        module: 'music.musichallSong.PlayLyricInfo',
        param: {
          format: 'json',
          crypt: 1,
          ct: 19,
          cv: 1873,
          interval: 0,
          lrc_t: 0,
          qrc: 1,
          qrc_t: 0,
          roma: 1,
          roma_t: 0,
          songID: parseInt(songId),
          trans: 1,
          trans_t: 0,
          type: -1,
        },
      },
    },
  })
  // console.log(body)
  if (body.code != 0 || body.req.code != 0) throw new Error('Get lyric failed')
  const data = body.req.data
  return parseLyric(data.lyric, data.trans, data.roma)
}

// export default {
//   regexps: {
//     matchLrc: /.+"lyric":"([\w=+/]*)".+/,
//   },
//   getLyric(songmid) {
//     const requestObj = httpFetch(`https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songmid}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&platform=yqq`, {
//       headers: {
//         Referer: 'https://y.qq.com/portal/player.html',
//       },
//     })
//     requestObj.promise = requestObj.promise.then(({ body }) => {
//       if (body.code != 0 || !body.lyric) return Promise.reject(new Error('Get lyric failed'))
//       return {
//         lyric: decodeName(b64DecodeUnicode(body.lyric)),
//         tlyric: decodeName(b64DecodeUnicode(body.trans)),
//       }
//     })
//     return requestObj
//   },
// }

// const regexps = {
//   matchLrc: /.+"lyric":"([\w=+/]*)".+/,
// }

// export const getLyric = async ({ meta }: AnyListen_API.MusicInfo) => {
//   const songmid = meta.musicId
//   const { body } = await request<Lyric>(
//     `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songmid}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&platform=yqq`,
//     {
//       headers: {
//         Referer: 'https://y.qq.com/portal/player.html',
//       },
//     }
//   )
//   if (body.code != 0 || !body.lyric) return Promise.reject(new Error('Get lyric failed'))
//   console.log('tx lyric:', songmid)
//   return {
//     lyric: decodeName(await b64DecodeUnicode(body.lyric)),
//     tlyric: decodeName(await b64DecodeUnicode(body.trans)),
//     awlyric: null,
//     rlyric: null,
//   }
// }
