/* eslint-disable no-fallthrough */
import { formatPlayTime, sizeFormate } from '@/shared/utils'
import { eapiRequest } from './utils'
import { Resource, MusicSearch } from './types/musicSearch'
import { formatSingerName } from '../shared'

const pageInfo = {
  limit: 30,
  total: 0,
  page: 0,
  allPage: 1,
}

const musicSearch = async (str: string, page: number, limit: number) => {
  // const { body } = await eapiRequest<MusicSearch>('/api/cloudsearch/pc', {
  //   s: str,
  //   type: 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
  //   limit,
  //   total: page == 1,
  //   offset: limit * (page - 1),
  // })
  const { body } = await eapiRequest<MusicSearch>('/api/search/song/list/page', {
    keyword: str,
    needCorrect: '1',
    channel: 'typing',
    offset: limit * (page - 1),
    scene: 'normal',
    total: page == 1,
    limit,
  })
  return body
}

const handleResult = (rawList: Resource[]): AnyListen_API.MusicInfoOnline[] => {
  // console.log(rawList)
  if (!rawList) return []
  return rawList.map((_item) => {
    const item = _item.baseInfo.simpleSongData
    const types: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}
    let size

    if (item.privilege.maxBrLevel == 'hires') {
      size = item.hr ? sizeFormate(item.hr.size) : null
      types.flac24bit = {
        size,
      }
    }
    switch (item.privilege.maxbr) {
      case 999000:
        size = item.sq ? sizeFormate(item.sq.size) : null
        types.flac = {
          size,
        }
      case 320000:
        size = item.h ? sizeFormate(item.h.size) : null
        types['320k'] = {
          size,
        }
      case 192000:
      case 128000:
        size = item.l ? sizeFormate(item.l.size) : null
        types['128k'] = {
          size,
        }
    }

    return {
      id: String(item.id),
      name: item.name,
      singer: formatSingerName(item.ar, 'name'),
      interval: formatPlayTime(item.dt / 1000),
      isLocal: false,
      meta: {
        albumName: item.al.name,
        source: 'wy',
        musicId: String(item.id),
        picUrl: item.al.picUrl,
        qualitys: types,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
        albumId: item.al.id,
      },
    }
  })
}

export const search = async (str: string, page = 1, limit?: number): Promise<AnyListen_API.MusicSearchResult> => {
  if (limit == null) limit = pageInfo.limit
  return musicSearch(str, page, limit).then((result) => {
    // console.log(result)
    if (!result || result.code !== 200) throw new Error('search error')
    const list = handleResult(result.data.resources || [])
    // console.log(list)
    if (list == null) throw new Error('search error')

    pageInfo.total = result.data.totalCount || 0
    pageInfo.page = page
    pageInfo.allPage = Math.ceil(pageInfo.total / pageInfo.limit)

    return {
      list,
      limit,
      total: pageInfo.total,
      page: pageInfo.page,
    }
  })
}
