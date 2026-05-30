import { console, request } from '@/shared/hostApi'
import { dateFormat, formatPlayCount } from '@/shared/utils'

import { getListDetail } from './songlistDetail'
import type { Songlist } from './types/songlist'
import type { SonglistRecommend } from './types/songlistRecommend'
import type { SonglistSearch } from './types/songlistSearch'
import type { Tag } from './types/songlistTag'

const pageInfo = {
  sortList: [
    { id: '5', label: 'recommend', name: '推荐' },
    { id: '6', label: 'hot', name: '最热' },
    { id: '7', label: 'new', name: '最新' },
    { id: '3', label: 'hot_collect', name: '热藏' },
    { id: '8', label: 'soaring', name: '飙升' },
  ],
}

const regExps = {
  listDetailLink: /^.+\/(\d+)\.html(?:\?.*|&.*$|#.*$|$)/,
}

const getInfoUrl = (tagId?: string) => {
  return tagId
    ? `http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_smarty=1&cdn=cdn&t=5&c=${tagId}`
    : 'http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_smarty=1&'
}

const getSongListUrl = (sortId: string, tagId: string, page: number) => {
  const id = tagId || ''
  console.log(
    sortId,
    tagId,
    page,
    `http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_ajax=1&cdn=cdn&t=${sortId}&c=${id}&p=${page}`
  )
  return `http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_ajax=1&cdn=cdn&t=${sortId}&c=${id}&p=${page}`
}

const filterInfoHotTag = (rawData: Tag['data']['hotTag']): AnyListen_API.TagItem[] => {
  const result: AnyListen_API.TagItem[] = []
  if (rawData.status !== 1) return result
  for (const key of Object.keys(rawData.data)) {
    const tag = rawData.data[key]
    result.push({
      id: tag.special_id,
      name: tag.special_name,
    })
  }
  return result
}

const filterTagInfo = (tagMap: Tag['data']['tagids']): AnyListen_API.TagGroupItem[] => {
  const result: AnyListen_API.TagGroupItem[] = []
  for (const name of Object.keys(tagMap) as Array<keyof Tag['data']['tagids']>) {
    result.push({
      name,
      list: tagMap[name].data.map((tag) => ({
        id: String(tag.id),
        name: tag.name,
      })),
    })
  }

  return result
}

type SonglistItemLike = Songlist['special_db'][number] | SonglistRecommend['data']['special_list'][number]

const filterList = (rawData: SonglistItemLike[]): AnyListen_API.SongListItem[] => {
  return rawData.map((item) => ({
    play_count: ('total_play_count' in item ? item.total_play_count : '') || formatPlayCount(Number(item.play_count ?? 0)),
    id: `id_${item.specialid}`,
    author: item.nickname,
    name: item.specialname,
    time: dateFormat('publish_time' in item ? item.publish_time : item.publishtime, 'Y-M-D'),
    img: 'img' in item ? item.img : item.imgurl,
    desc: item.intro,
  }))
}

const getSongList = async (sortId: string, tagId: string, page: number): Promise<AnyListen_API.SongListItem[]> => {
  console.log({ sortId, tagId, page })
  const { body, statusCode } = await request<Songlist>(getSongListUrl(sortId, tagId, page))
  if (statusCode !== 200 || body?.status !== 1) throw new Error('get songlist failed')
  return filterList(body.special_db)
}

const getSongListRecommend = async (): Promise<AnyListen_API.SongListItem[]> => {
  const { body, statusCode } = await request<SonglistRecommend>('http://everydayrec.service.kugou.com/guess_special_recommend', {
    method: 'POST',
    headers: {
      'User-Agent': 'KuGou2012-8275-web_browser_event_handler',
    },
    json: {
      appid: 1001,
      clienttime: 1566798337219,
      clientver: 8275,
      key: 'f1f93580115bb106680d2375f8032d96',
      mid: '21511157a05844bd085308bc76ef3343',
      platform: 'pc',
      userid: '262643156',
      return_min: 6,
      return_max: 15,
    },
  })

  if (statusCode !== 200 || body.status !== 1) throw new Error('get songlist recommend failed')
  return filterList(body.data.special_list)
}

const currentListInfo = {
  tagId: null as string | null,
  total: 0,
  limit: 0,
}
const getListInfo = async (tagId: string): Promise<{ total: number; limit: number }> => {
  if (currentListInfo.tagId != null && currentListInfo.tagId == tagId) {
    return { total: currentListInfo.total, limit: currentListInfo.limit }
  }
  const { body, statusCode } = await request<Tag>(getInfoUrl(tagId))
  if (statusCode !== 200 || body.status !== 1) throw new Error('kg getListInfo failed')
  currentListInfo.tagId = tagId
  currentListInfo.total = body.data.params.total
  currentListInfo.limit = body.data.params.pagesize
  return { total: currentListInfo.total, limit: currentListInfo.limit }
}

export const getSorts = async (): Promise<AnyListen_API.TagItem[]> => {
  return pageInfo.sortList.map((item) => ({
    id: item.id,
    name: `{songlist.sort.${item.label}}`,
  }))
}

export const getTags = async (): Promise<{ tags: AnyListen_API.TagGroupItem[]; hotTags: AnyListen_API.TagItem[] }> => {
  const { body, statusCode } = await request<Tag>(getInfoUrl())
  if (statusCode !== 200 || body.status !== 1) throw new Error('kg getTags failed')

  return {
    tags: filterTagInfo(body.data.tagids),
    hotTags: filterInfoHotTag(body.data.hotTag),
  }
}

export const getList = async (
  sortId: string,
  tagId: string,
  page: number
): Promise<{
  list: AnyListen_API.SongListItem[]
  total: number
  page: number
  limit: number
}> => {
  const [list, listInfo, recommendList] = await Promise.all([
    getSongList(sortId, tagId, page),
    getListInfo(tagId),
    !tagId && page === 1 && sortId === pageInfo.sortList[0].id ? getSongListRecommend() : Promise.resolve(null),
  ])

  if (recommendList) list.unshift(...recommendList)

  return {
    list,
    total: listInfo.total,
    limit: listInfo.limit,
    page,
  }
}

export const getDetailPageUrl = async (id: string): Promise<string> => {
  if (/^https?:\/\//.test(id)) return id

  let rawId = id
  if (rawId.startsWith('id_')) rawId = rawId.replace('id_', '')
  if (regExps.listDetailLink.test(rawId)) rawId = rawId.replace(regExps.listDetailLink, '$1')

  return `https://www.kugou.com/yy/special/single/${rawId}.html`
}

export const search = async (
  keyword: string,
  page: number,
  limit = 20
): Promise<{
  list: AnyListen_API.SongListItem[]
  total: number
  limit: number
  page: number
}> => {
  const { body, statusCode } = await request<SonglistSearch>(
    `http://msearchretry.kugou.com/api/v3/search/special?keyword=${encodeURIComponent(keyword)}&page=${page}&pagesize=${limit}&showtype=10&filter=0&version=7910&sver=2`
  )

  if (statusCode !== 200 || body.errcode !== 0) throw new Error('kg songlist search failed')

  return {
    list: body.data.info.map((item) => ({
      play_count: formatPlayCount(item.playcount),
      id: `id_${item.specialid}`,
      author: item.nickname,
      name: item.specialname,
      time: dateFormat(item.publishtime, 'Y-M-D'),
      img: item.imgurl,
      desc: item.intro,
      total: item.songcount,
    })),
    total: body.data.total,
    limit,
    page,
  }
}

export { getListDetail }
