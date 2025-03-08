import { console, request } from '@/shared/hostApi'
import { formatSinger } from './util'
import { SearchResult } from './types/search'
import { decodeName, formatPlayTime } from '@/shared/utils'

const regExps = {
  mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/,
}
const pageInfo = {
  limit: 30,
  total: 0,
  page: 0,
  allPage: 1,
}
const musicSearch = async (str: string, page: number, limit: number) => {
  const { body } = await request<SearchResult>(
    `http://search.kuwo.cn/r.s?client=kt&all=${encodeURIComponent(str)}&pn=${page - 1}&rn=${limit}&uid=794762570&ver=kwplayer_ar_9.2.2.1&vipver=1&show_copyright_off=1&newver=1&ft=music&cluster=0&strategy=2012&encoding=utf8&rformat=json&vermerge=1&mobi=1&issubtitle=1`
  )
  return body
}
const handleResult = (rawData?: SearchResult['abslist']) => {
  const result: AnyListen_API.MusicInfoOnline[] = []
  if (!rawData) return result
  // console.log(rawData)
  for (let i = 0; i < rawData.length; i++) {
    const info = rawData[i]
    const songId = info.MUSICRID.replace('MUSIC_', '')
    // const format = (info.FORMATS || info.formats).split('|')

    if (!info.N_MINFO) {
      console.log('N_MINFO is undefined')
      return null
    }

    const types: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}

    const infoArr = info.N_MINFO.split(';')
    for (const info of infoArr) {
      const result = info.match(regExps.mInfo)
      if (result) {
        switch (result[2]) {
          case '4000':
            types.flac24bit = {
              size: result[4].toLocaleUpperCase(),
            }
            break
          case '2000':
            types.flac = {
              size: result[4].toLocaleUpperCase(),
            }
            break
          case '320':
            types['320k'] = {
              size: result[4].toLocaleUpperCase(),
            }
            break
          case '128':
            types['128k'] = {
              size: result[4].toLocaleUpperCase(),
            }
            break
        }
      }
    }

    const interval = parseInt(info.DURATION)

    result.push({
      id: String(songId),
      name: decodeName(info.SONGNAME),
      singer: formatSinger(decodeName(info.ARTIST)),
      interval: Number.isNaN(interval) ? null : formatPlayTime(interval),
      isLocal: false,
      meta: {
        albumName: info.ALBUM ? decodeName(info.ALBUM) : '',
        source: 'kw',
        musicId: songId,
        qualitys: types,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
        songId,
        albumId: decodeName(info.ALBUMID || ''),
      },
    })
  }
  // console.log(result)
  return result
}
export const search = async (str: string, page = 1, limit?: number, retryNum = 0): Promise<AnyListen_API.MusicSearchResult> => {
  if (retryNum > 2) return Promise.reject(new Error('try max num'))
  if (limit == null) limit = pageInfo.limit
  // http://newlyric.kuwo.cn/newlyric.lrc?62355680
  const result = await musicSearch(str, page, limit)
  // console.log(result)
  if (!result || (result.TOTAL !== '0' && result.SHOW === '0')) return search(str, page, limit, ++retryNum)
  const list = handleResult(result.abslist)

  if (list == null) return search(str, page, limit, ++retryNum)

  pageInfo.total = parseInt(result.TOTAL)
  pageInfo.page = page
  pageInfo.allPage = Math.ceil(pageInfo.total / limit)

  return {
    list,
    page: pageInfo.page,
    total: pageInfo.total,
    limit,
  }
}
