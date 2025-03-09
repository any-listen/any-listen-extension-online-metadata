import { request } from '@/shared/hostApi'
import { ItemSong, MusicSearch } from './types/musicSearch'
import { formatPlayTime, sizeFormate } from '@/shared/utils'
import { formatSingerName } from '../shared'

const pageInfo = {
  limit: 30,
  total: 0,
  page: 0,
  allPage: 1,
  successCode: 0,
}

const musicSearch = async (str: string, page: number, limit: number) => {
  // searchRequest = httpFetch(`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=sizer.yqq.song_next&searchid=49252838123499591&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${page}&n=${limit}&w=${encodeURIComponent(str)}&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`)
  // const searchRequest = httpFetch(`https://shc.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&remoteplace=txt.yqq.top&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${page}&n=${limit}&w=${encodeURIComponent(str)}&cv=4747474&ct=24&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&uin=0&hostUin=0&loginUin=0`)
  const { body } = await request<MusicSearch>('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
    },
    json: {
      comm: {
        ct: 11,
        cv: '1003006',
        v: '1003006',
        os_ver: '12',
        phonetype: '0',
        devicelevel: '31',
        tmeAppID: 'qqmusiclight',
        nettype: 'NETWORK_WIFI',
      },
      req: {
        module: 'music.search.SearchCgiService',
        method: 'DoSearchForQQMusicLite',
        param: {
          query: str,
          search_type: 0,
          num_per_page: limit,
          page_num: page,
          nqc_flag: 0,
          grp: 1,
        },
      },
    },
  })
  // searchRequest = httpFetch(`http://ioscdn.kugou.com/api/v3/search/song?keyword=${encodeURIComponent(str)}&page=${page}&pagesize=${this.limit}&showtype=10&plat=2&version=7910&tag=1&correct=1&privilege=1&sver=5`)
  return body.req.data
}
const handleResult = (rawList: ItemSong[]) => {
  // console.log(rawList)
  const list: AnyListen_API.MusicInfoOnline[] = []
  rawList.forEach((item) => {
    if (!item.file?.media_mid) return

    const types: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}
    const file = item.file
    if (file.size_128mp3 != 0) {
      const size = sizeFormate(file.size_128mp3)
      types['128k'] = {
        size,
      }
    }
    if (file.size_320mp3 !== 0) {
      const size = sizeFormate(file.size_320mp3)
      types['320k'] = {
        size,
      }
    }
    if (file.size_flac !== 0) {
      const size = sizeFormate(file.size_flac)
      types.flac = {
        size,
      }
    }
    if (file.size_hires !== 0) {
      const size = sizeFormate(file.size_hires)
      types.flac24bit = {
        size,
      }
    }
    // types.reverse()
    let albumId = ''
    let albumName = ''
    if (item.album) {
      albumName = item.album.name
      albumId = item.album.mid
    }
    list.push({
      id: String(item.mid),
      name: item.name + (item.title_extra ?? ''),
      singer: formatSingerName(item.singer, 'name'),
      interval: formatPlayTime(item.interval),
      isLocal: false,
      meta: {
        albumName,
        source: 'tx',
        musicId: item.mid,
        qualitys: types,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
        albumId,
        songId: String(item.id),
        albumMid: item.album?.mid ?? '',
        strMediaMid: item.file.media_mid,
        picUrl:
          albumId === '' || albumId === '空'
            ? item.singer?.length
              ? `https://y.gtimg.cn/music/photo_new/T001R500x500M000${item.singer[0].mid}.jpg`
              : ''
            : `https://y.gtimg.cn/music/photo_new/T002R500x500M000${albumId}.jpg`,
      },
    })
  })
  // console.log(list)
  return list
}
export const search = async (str: string, page = 1, limit?: number): Promise<AnyListen_API.MusicSearchResult> => {
  if (limit == null) limit = pageInfo.limit
  // http://newlyric.kuwo.cn/newlyric.lrc?62355680
  const { body, meta } = await musicSearch(str, page, limit)
  const list = handleResult(body.item_song)

  pageInfo.total = meta.estimate_sum
  pageInfo.page = page
  pageInfo.allPage = Math.ceil(pageInfo.total / limit)

  return {
    list,
    limit,
    total: pageInfo.total,
    page: pageInfo.page,
  }
}
