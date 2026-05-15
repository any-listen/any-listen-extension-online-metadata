import { request } from '@/shared/hostApi'
import { formatPlayCount, dateFormat } from '@/shared/utils'

import { getList as getMusicDetailList } from './musicDetail'
import type { Songlist } from './types/songlist'
import type { SonglistDetail } from './types/songlistDetail'
import type { HotTag } from './types/songlistHotTag'
import type { SonglistSearch } from './types/songlistSearch'
import type { Tag } from './types/songlistTag'
import { buildMusicList2, eapiRequest, linuxapiRequest, weapiRequest } from './utils'

const pageInfo = {
  limit_list: 30,
  limit_song: 100000,
  successCode: 200,
  cookie: 'MUSIC_U=',
  sortList: [
    {
      label: 'hot',
      name: '最热',
      id: 'hot',
    },
    // {
    //   label: 'new',
    //   name: '最新',
    //   id: 'new',
    // },
  ],
}

const regExps = {
  listDetailLink: /^.+(?:\?|&)id=(\d+)(?:&.*$|#.*$|$)/,
  listDetailLink2: /^.+\/playlist\/(\d+)\/\d+\/.+$/,
}

interface SonglistItemLike {
  playCount: number
  id: number
  creator: {
    nickname: string
  }
  name: string
  createTime?: number
  coverImgUrl: string
  trackCount: number
  description: string | null
}

export const getSorts = async (): Promise<AnyListen_API.TagItem[]> => {
  return pageInfo.sortList.map((item) => ({
    id: String(item.id),
    name: `{songlist.sort.${item.label}}`,
  }))
}

const filterList = (rawData: SonglistItemLike[]): AnyListen_API.SongListItem[] => {
  return rawData.map((item) => ({
    play_count: formatPlayCount(item.playCount),
    id: String(item.id),
    author: item.creator.nickname,
    name: item.name,
    time: item.createTime ? dateFormat(item.createTime, 'Y-M-D') : '',
    img: item.coverImgUrl,
    total: item.trackCount,
    desc: item.description ?? '',
  }))
}

const filterTagInfo = ({ sub, categories }: Tag): AnyListen_API.TagGroupItem[] => {
  const subList: Record<string, AnyListen_API.TagItem[]> = {}
  for (const item of sub) {
    subList[item.category] ||= []
    subList[item.category].push({
      id: item.name,
      name: item.name,
    })
  }

  const list: AnyListen_API.TagGroupItem[] = []
  for (const key of Object.keys(categories)) {
    list.push({
      name: categories[key],
      list: subList[key],
    })
  }
  return list
}

const filterHotTagInfo = (rawList: HotTag['tags']): AnyListen_API.TagItem[] => {
  return rawList.map((item) => ({
    id: item.playlistTag.name,
    name: item.playlistTag.name,
  }))
}

const getTag = async (): Promise<AnyListen_API.TagGroupItem[]> => {
  const { body, statusCode } = await weapiRequest<Tag>('https://music.163.com/weapi/playlist/catalogue', {})
  if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error('wy songlistTags failed')
  return filterTagInfo(body)
}

const getHotTag = async (): Promise<AnyListen_API.TagItem[]> => {
  const { body, statusCode } = await weapiRequest<HotTag>('https://music.163.com/weapi/playlist/hottags', {})
  if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error('wy songlistTags failed')
  return filterHotTagInfo(body.tags)
}

export const getTags = async (): Promise<{ tags: AnyListen_API.TagGroupItem[]; hotTags: AnyListen_API.TagItem[] }> => {
  const [tags, hotTags] = await Promise.all([getTag(), getHotTag()])
  return { tags, hotTags }
}

export const getList = async (
  sortId: string,
  tagId: string,
  page: number,
  limit = pageInfo.limit_list
): Promise<{
  list: AnyListen_API.SongListItem[]
  total: number
  limit: number
  page: number
}> => {
  const { body, statusCode } = await weapiRequest<Songlist>('https://music.163.com/weapi/playlist/list', {
    cat: tagId || '全部',
    order: sortId,
    limit,
    offset: limit * (page - 1),
    total: true,
  })

  if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error('wy songlist failed')

  return {
    list: filterList(body.playlists),
    total: Number(body.total),
    page,
    limit,
  }
}

const handleParseId = async (link: string) => {
  const {
    headers: { location },
    statusCode,
  } = await request<string>(link, { maxRedirect: 0 })
  if (statusCode && statusCode > 400) throw new Error('link request failed')

  const url = location == null ? link : Array.isArray(location) ? location[0] : location
  return regExps.listDetailLink.test(url) ? url.replace(regExps.listDetailLink, '$1') : url.replace(regExps.listDetailLink2, '$1')
}

const getListId = async (id: string): Promise<{ id: string; cookie?: string }> => {
  let cookie: string | undefined
  if (id.includes('###')) {
    const [url, token] = id.split('###')
    id = url
    cookie = `MUSIC_U=${token}`
  }

  if (/[?&:/]/.test(id)) {
    if (regExps.listDetailLink.test(id)) {
      id = id.replace(regExps.listDetailLink, '$1')
    } else if (regExps.listDetailLink2.test(id)) {
      id = id.replace(regExps.listDetailLink2, '$1')
    } else {
      id = await handleParseId(id)
    }
  }

  return { id, cookie }
}

export const getListDetail = async (
  rawId: string,
  page: number,
  limit = pageInfo.limit_song
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  const { id, cookie } = await getListId(rawId)

  const { body, statusCode } = await linuxapiRequest<SonglistDetail>(cookie || pageInfo.cookie, {
    method: 'POST',
    url: 'https://music.163.com/api/v3/playlist/detail',
    params: {
      id,
      n: limit,
      s: 8,
    },
  })
  if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error('wy songlistDetail failed')

  const listLimit = 1000
  const rangeStart = (page - 1) * listLimit
  let list: AnyListen_API.MusicInfoOnline[]

  if (body.playlist.trackIds.length === body.privileges.length) {
    list = buildMusicList2({ songs: body.playlist.tracks, privileges: body.privileges })
  } else {
    list = await getMusicDetailList(body.playlist.trackIds.slice(rangeStart, listLimit * page).map((trackId) => trackId.id))
  }

  return {
    list,
    page,
    limit: listLimit,
    total: body.playlist.trackIds.length,
    info: {
      play_count: formatPlayCount(body.playlist.playCount),
      name: body.playlist.name,
      img: body.playlist.coverImgUrl,
      desc: body.playlist.description,
      author: body.playlist.creator.nickname,
    },
  }
}

export const search = async (
  text: string,
  page: number,
  limit = 20
): Promise<{ list: AnyListen_API.SongListItem[]; total: number; limit: number; page: number }> => {
  const { body, statusCode } = await eapiRequest<SonglistSearch>('/api/cloudsearch/pc', {
    s: text,
    type: 1000,
    limit,
    total: page === 1,
    offset: limit * (page - 1),
  })

  if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error('wy songlistSearch failed')

  return {
    list: filterList(body.result.playlists),
    limit,
    total: body.result.playlistCount,
    page,
  }
}
