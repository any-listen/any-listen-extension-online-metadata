import { formatPlayTime, sizeFormate } from '@/shared/utils'

import { formatSingerName } from '../shared'
import type { List, MusicSearch } from './types/musicSearch'
import { signRequest } from './utils'

const pageInfo = {
  limit: 30,
  total: 0,
  page: 0,
  allPage: 1,
  successCode: 0,
}

const getSearchId = () => {
  let guid = ''
  for (let i = 0; i < 32; i++) guid += Math.floor(Math.random() * 16).toString(16)
  return guid.toUpperCase() + String(Math.floor(Math.random() * 100000)).padStart(5, '0')
}
const musicSearch = async (str: string, page: number, limit: number) => {
  // searchRequest = httpFetch(`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=sizer.yqq.song_next&searchid=49252838123499591&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${page}&n=${limit}&w=${encodeURIComponent(str)}&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`)
  // const searchRequest = httpFetch(`https://shc.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&remoteplace=txt.yqq.top&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${page}&n=${limit}&w=${encodeURIComponent(str)}&cv=4747474&ct=24&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&uin=0&hostUin=0&loginUin=0`)
  const { body } = await signRequest<MusicSearch>({
    comm: {
      _channelid: '0',
      _os_version: '6.2.9200-2',
      ct: '19',
      cv: '2151',
      guid: '1F70E520B2EAA7D25E11760783C53CA9',
      patch: '118',
      psrf_access_token_expiresAt: 0,
      psrf_qqaccess_token: '',
      psrf_qqopenid: '',
      psrf_qqunionid: '',
      tmeAppID: 'qqmusic',
      tmeLoginType: 0,
      uin: '0',
      wid: '7223299733393904640',
    },
    req: {
      module: 'music.search.SearchCgiService',
      method: 'DoSearchForQQMusicDesktop',
      param: {
        grp: 1,
        num_per_page: limit,
        page_num: page,
        query: str,
        remoteplace: 'txt.newclient.top',
        search_type: 0,
        searchid: getSearchId(),
      },
    },
  })
  if (body.code != pageInfo.successCode || body.req?.code != pageInfo.successCode) {
    throw new Error(`Search failed: ${body.code} ${body.req?.code}`)
  }
  // searchRequest = httpFetch(`http://ioscdn.kugou.com/api/v3/search/song?keyword=${encodeURIComponent(str)}&page=${page}&pagesize=${this.limit}&showtype=10&plat=2&version=7910&tag=1&correct=1&privilege=1&sver=5`)
  return body.req.data
}
const handleResult = (rawList: List[]) => {
  // console.log(rawList)
  if (!rawList || !Array.isArray(rawList)) return []
  const list: AnyListen_API.MusicInfoOnline[] = []
  rawList.forEach((item) => {
    if (!item.file?.media_mid) return

    const types: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}
    const file = item.file
    if (file.size_128mp3 != 0) {
      const size = sizeFormate(file.size_128mp3)
      types['128k'] = {
        sizeStr: size,
      }
    }
    if (file.size_320mp3 !== 0) {
      const size = sizeFormate(file.size_320mp3)
      types['320k'] = {
        sizeStr: size,
      }
    }
    if (file.size_flac !== 0) {
      const size = sizeFormate(file.size_flac)
      types.flac = {
        sizeStr: size,
      }
    }
    if (file.size_hires !== 0) {
      const size = sizeFormate(file.size_hires)
      types.flac24bit = {
        sizeStr: size,
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
      // name: item.name + (item.title_extra ?? ''),
      name: item.title,
      singer: formatSingerName(item.singer, 'name'),
      interval: item.interval ? formatPlayTime(item.interval) : null,
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
  limit ??= pageInfo.limit
  const { body, meta } = await musicSearch(str, page, limit)
  const list = handleResult(body.song.list)

  pageInfo.total = meta.sum
  pageInfo.page = page
  pageInfo.allPage = Math.ceil(pageInfo.total / limit)

  return {
    list,
    limit,
    total: pageInfo.total,
    page: pageInfo.page,
  }
}
