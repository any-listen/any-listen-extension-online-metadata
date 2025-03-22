import { buffer, console, request } from '@/shared/hostApi'
import { Lyric, LyricLangs, LyricSearch } from './types/lyric'
import { decodeKrc } from './utils'
import { decodeName } from '@/shared/utils'

const searchLyric = async (name: string, hash: string, time: number) => {
  const { body } = await request<LyricSearch>(
    `http://lyrics.kugou.com/search?ver=1&man=yes&client=pc&keyword=${encodeURIComponent(name)}&hash=${hash}&timelength=${time}&lrctxt=1`,
    {
      headers: {
        'KG-RC': '1',
        'KG-THash': 'expand_search_manager.cpp:852736169:451',
        'User-Agent': 'KuGou2012-9020-ExpandSearchManager',
      },
    }
  )
  if (body.candidates.length) {
    const info = body.candidates[0]
    return { id: info.id, accessKey: info.accesskey, fmt: info.krctype == 1 && info.contenttype != 1 ? 'krc' : 'lrc' }
  }
  return null
}

const headExp = /^.*\[id:\$\w+\]\n/
const parseLyric = (str: string) => {
  str = str.replace(/\r/g, '')
  if (headExp.test(str)) str = str.replace(headExp, '')
  const trans = str.match(/\[language:([\w=\\/+]+)\]/)
  let rlyricRaw: string[][]
  let tlyricRaw: string[][]
  const rlyric: string[] = []
  const tlyric: string[] = []
  if (trans) {
    str = str.replace(/\[language:[\w=\\/+]+\]\n/, '')
    const json = JSON.parse(buffer.bufToString(buffer.from(trans[1], 'base64'), 'utf8')) as LyricLangs
    for (const item of json.content) {
      switch (item.type) {
        case 0:
          rlyricRaw = item.lyricContent
          break
        case 1:
          tlyricRaw = item.lyricContent
          break
      }
    }
  }
  let i = 0
  let awlyric = str.replace(/\[((\d+),\d+)\].*/g, (str) => {
    const result = str.match(/\[((\d+),\d+)\].*/)
    let time = parseInt(result![2])
    const ms = time % 1000
    time /= 1000
    const m = Math.trunc(time / 60)
      .toString()
      .padStart(2, '0')
    time %= 60
    const s = Math.trunc(time).toString().padStart(2, '0')
    const timeLabel = `${m}:${s}.${ms}`
    if (rlyricRaw) rlyric[i] = `[${timeLabel}]${rlyricRaw[i]?.join('') ?? ''}`
    if (tlyricRaw) tlyric[i] = `[${timeLabel}]${tlyricRaw[i]?.join('') ?? ''}`
    i++
    return str.replace(result![1], timeLabel)
  })
  let rlyricStr = rlyric.length ? rlyric.join('\n') : ''
  let tlyricStr = tlyric.length ? tlyric.join('\n') : ''
  awlyric = awlyric.replace(/<(\d+,\d+),\d+>/g, '<$1>')
  awlyric = decodeName(awlyric)
  const lyric = awlyric.replace(/<\d+,\d+>/g, '')
  rlyricStr = decodeName(rlyricStr)
  tlyricStr = decodeName(tlyricStr)
  return {
    lyric,
    tlyric: tlyricStr,
    rlyric: rlyricStr,
    awlyric,
  }
}
const getLyricDownload = async (id: string, accessKey: string, fmt: string) => {
  const { body } = await request<Lyric>(
    `http://lyrics.kugou.com/download?ver=1&client=pc&id=${id}&accesskey=${accessKey}&fmt=${fmt}&charset=utf8`,
    {
      headers: {
        'KG-RC': '1',
        'KG-THash': 'expand_search_manager.cpp:852736169:451',
        'User-Agent': 'KuGou2012-9020-ExpandSearchManager',
      },
    }
  )

  switch (body.fmt) {
    case 'krc':
      return parseLyric(await decodeKrc(body.content))
    case 'lrc':
      return {
        lyric: buffer.bufToString(buffer.from(body.content, 'base64'), 'utf8'),
        tlyric: '',
        rlyric: '',
        awlyric: '',
      }
    default:
      throw new Error(`未知歌词格式: ${body.fmt}`)
  }
}

const getIntv = (interval: string | null) => {
  if (!interval) return 0
  const intvArr = interval.split(':')
  let intv = 0
  let unit = 1
  while (intvArr.length) {
    intv += parseInt(intvArr.pop()!) * unit
    unit *= 60
  }
  return intv
}

export const getLyric = async (musicInfo: AnyListen_API.MusicInfoOnline) => {
  const result = await searchLyric(
    musicInfo.name,
    musicInfo.meta.hash as string,
    (musicInfo.meta._interval as number) || getIntv(musicInfo.interval)
  )
  if (!result) throw new Error('Get lyric failed')
  const lrc = await getLyricDownload(result.id, result.accessKey, result.fmt)
  console.log('kg lyric:', musicInfo.meta.hash)
  return lrc
}

// getLyric(songInfo, tryNum = 0) {
//   let requestObj = httpFetch(`http://m.kugou.com/app/i/krc.php?cmd=100&keyword=${encodeURIComponent(songInfo.name)}&hash=${songInfo.hash}&timelength=${songInfo._interval || this.getIntv(songInfo.interval)}&d=0.38664927426725626`, {
//     headers: {
//       'KG-RC': 1,
//       'KG-THash': 'expand_search_manager.cpp:852736169:451',
//       'User-Agent': 'KuGou2012-9020-ExpandSearchManager',
//     },
//   })
//   requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
//     if (statusCode !== 200) {
//       if (tryNum > 5) return Promise.reject(new Error('歌词获取失败'))
//       let tryRequestObj = this.getLyric(songInfo, ++tryNum)
//       requestObj.cancelHttp = tryRequestObj.cancelHttp.bind(tryRequestObj)
//       return tryRequestObj.promise
//     }
//     return {
//       lyric: body,
//       tlyric: '',
//     }
//   })
//   return requestObj
// },
