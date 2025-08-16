import { request } from '@/shared/hostApi'
import { Grp, List, MusicSearch } from './types/musicSearch'
import { decodeName, formatPlayTime, sizeFormate } from '@/shared/utils'
import { formatSingerName } from '../shared'

const pageInfo = {
  limit: 30,
  total: 0,
  page: 0,
  allPage: 1,
  successCode: 0,
}

const musicSearch = async (str: string, page: number, limit: number) => {
  const { body } = await request<MusicSearch>(
    `https://songsearch.kugou.com/song_search_v2?keyword=${encodeURIComponent(str)}&page=${page}&pagesize=${limit}&userid=0&clientver=&platform=WebFilter&filter=2&iscorrection=1&privilege_filter=0&area_code=1`
  )
  return body
}

const filterData = (rawData: List | Grp): AnyListen_API.MusicInfoOnline => {
  const types: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}
  if (rawData.FileSize !== 0) {
    const size = sizeFormate(rawData.FileSize)
    types['128k'] = {
      size,
      hash: rawData.FileHash,
    }
  }
  if (rawData.HQFileSize !== 0) {
    const size = sizeFormate(rawData.HQFileSize)
    types['320k'] = {
      size,
      hash: rawData.HQFileHash,
    }
  }
  if (rawData.SQFileSize !== 0) {
    const size = sizeFormate(rawData.SQFileSize)
    types.flac = {
      size,
      hash: rawData.SQFileHash,
    }
  }
  if (rawData.ResFileSize !== 0) {
    const size = sizeFormate(rawData.ResFileSize)
    types.flac24bit = {
      size,
      hash: rawData.ResFileHash,
    }
  }
  return {
    id: String(rawData.Audioid),
    name: decodeName(rawData.SongName),
    singer: decodeName(formatSingerName(rawData.Singers, 'name')),
    interval: formatPlayTime(rawData.Duration),
    isLocal: false,
    meta: {
      albumName: decodeName(rawData.AlbumName),
      source: 'kg',
      musicId: String(rawData.Audioid),
      qualitys: types,
      createTime: 0,
      posTime: 0,
      updateTime: 0,
      albumId: rawData.AlbumID,
      hash: rawData.FileHash,
      _interval: rawData.Duration,
    },
  }
}

const handleResult = (rawData: List[]) => {
  const ids = new Set()
  const list: AnyListen_API.MusicInfoOnline[] = []
  rawData.forEach((item) => {
    const key = item.Audioid + item.FileHash
    if (ids.has(key)) return
    ids.add(key)
    list.push(filterData(item))
    for (const childItem of item?.Grp ?? []) {
      const key = item.Audioid + item.FileHash
      if (ids.has(key)) continue
      ids.add(key)
      list.push(filterData(childItem))
    }
  })
  return list
}

export const search = async (str: string, page = 1, limit?: number): Promise<AnyListen_API.MusicSearchResult> => {
  if (limit == null) limit = pageInfo.limit
  // http://newlyric.kuwo.cn/newlyric.lrc?62355680
  const result = await musicSearch(str, page, limit)
  const list = handleResult(result.data.lists)

  pageInfo.total = result.data.total
  pageInfo.page = page
  pageInfo.allPage = Math.ceil(pageInfo.total / limit)

  return {
    list,
    limit,
    total: pageInfo.total,
    page: pageInfo.page,
  }
}
