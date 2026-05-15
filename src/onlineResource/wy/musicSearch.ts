import type { MusicSearch } from './types/musicSearch'
import { buildMusicList, eapiRequest } from './utils'

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

export const search = async (str: string, page = 1, limit?: number): Promise<AnyListen_API.MusicSearchResult> => {
  limit ??= pageInfo.limit
  return musicSearch(str, page, limit).then((result) => {
    // console.log(result)
    if (result?.code !== 200) throw new Error('search error')
    const list = buildMusicList(result.data.resources || [])
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
