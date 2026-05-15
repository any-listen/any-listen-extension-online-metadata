import { request } from '@/shared/hostApi'
import { formatPlayCount } from '@/shared/utils'

import type { FluffyContent, PurpleContent, Songlist } from './types/songlist'
import type { SonglistByTagId } from './types/songlistByTagId'
import type { SonglistDetail } from './types/songlistDetail'
import type { SonglistDetailInfo } from './types/songlistDetailInfo'
import type { SonglistSearch } from './types/songlistSearch'
import type { Tag } from './types/songlistTag'
import { buildMusicInfoListV5, createSignature } from './utils'

const pageInfo = {
  limit_list: 30,
  limit_song: 100,
  successCode: '000000',
  sortList: [
    {
      label: 'recommend',
      name: '推荐',
      id: '15127315',
    },
  ],
}

const defaultHeaders = {
  Referer: 'https://app.c.nf.migu.cn/',
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
  channel: '0146921',
}

const filterTagData = (rawData: Tag['data']) => {
  const hotTags: AnyListen_API.TagItem[] =
    rawData[0]?.content
      ?.map((item) => ({
        id: item.texts[1] ?? '',
        name: item.texts[0] ?? '',
      }))
      .filter((item) => item.id && item.name) ?? []

  const tags: AnyListen_API.TagGroupItem[] = rawData.slice(1).map((item) => ({
    name: item.header.title,
    list: item.content
      .map((tag) => ({
        id: tag.texts[1] ?? '',
        name: tag.texts[0] ?? '',
      }))
      .filter((tag) => tag.id && tag.name),
  }))

  return { tags, hotTags }
}

const filterListByTag = (
  rawData: SonglistByTagId['data']['contentItemList'][number]['itemList'] = []
): AnyListen_API.SongListItem[] => {
  return rawData.map((item) => ({
    play_count: item.barList[0]?.title,
    id: item.logEvent.contentId,
    name: item.title,
    img: item.imageUrl,
  }))
}

const filterListRecommend = (rawData: Songlist['data']['contents']): AnyListen_API.SongListItem[] => {
  const list: AnyListen_API.SongListItem[] = []
  const ids = new Set<string>()

  const walk = (items: PurpleContent[] | FluffyContent[]) => {
    for (const item of items) {
      if ('contents' in item && item.contents) {
        walk(item.contents)
        continue
      }

      if (item.resType !== '2021' || !item.resId || ids.has(item.resId)) continue
      ids.add(item.resId)
      list.push({
        id: item.resId,
        name: item.txt ?? 'Unknown',
        img: item.img,
        desc: item.txt2,
      })
    }
  }

  for (const item of rawData) {
    walk(item.contents)
  }

  return list
}

export const getSorts = async (): Promise<AnyListen_API.TagItem[]> => {
  return pageInfo.sortList.map((item) => ({
    id: String(item.id),
    name: `{songlist.sort.${item.label}}`,
  }))
}

export const getTags = async (): Promise<{ tags: AnyListen_API.TagGroupItem[]; hotTags: AnyListen_API.TagItem[] }> => {
  try {
    const { body, statusCode } = await request<Tag>('https://app.c.nf.migu.cn/pc/v1.0/template/musiclistplaza-taglist/release', {
      headers: defaultHeaders,
    })

    if (statusCode !== 200 || body.code !== pageInfo.successCode || !body.data?.length) {
      throw new Error('mg songlistTags failed')
    }

    return filterTagData(body.data)
  } catch (e) {
    throw new Error('mg songlistTags failed', { cause: e })
  }
}

export const getList = async (
  _sortId: string,
  tagId: string,
  page: number,
  limit = pageInfo.limit_list
): Promise<{
  list: AnyListen_API.SongListItem[]
  total: number
  limit: number
  page: number
}> => {
  const hasTag = Boolean(tagId)
  const url = hasTag
    ? `https://app.c.nf.migu.cn/pc/v1.0/template/musiclistplaza-listbytag/release?pageNumber=${page}&templateVersion=2&tagId=${tagId}`
    : `https://app.c.nf.migu.cn/pc/bmw/page-data/playlist-square-recommend/v1.0?templateVersion=2&pageNo=${page}`

  const { body, statusCode } = await request<Songlist | SonglistByTagId>(url, { headers: defaultHeaders })

  if (statusCode !== 200 || body.code !== pageInfo.successCode) {
    throw new Error('mg songlist failed')
  }

  const list = hasTag
    ? filterListByTag((body as SonglistByTagId).data.contentItemList[1].itemList)
    : filterListRecommend((body as Songlist).data.contents)

  return {
    list,
    total: list.length,
    page,
    limit: list.length,
  }
}

export const getListDetail = async (
  id: string,
  page: number,
  limit = pageInfo.limit_song
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  // 先获取歌单详情信息
  const infoUrl = `https://c.musicapp.migu.cn/MIGUM3.0/resource/playlist/v2.0?playlistId=${id}`
  const { body: infoBody, statusCode: infoStatusCode } = await request<SonglistDetailInfo>(infoUrl, {
    headers: defaultHeaders,
  })

  if (infoStatusCode !== 200 || infoBody.code !== pageInfo.successCode) {
    throw new Error('mg songlistDetail failed')
  }

  // 获取歌曲列表
  const songUrl = `https://app.c.nf.migu.cn/MIGUM3.0/resource/playlist/song/v2.0?pageNo=${page}&pageSize=${limit}&playlistId=${id}`
  const { body: songBody, statusCode: songStatusCode } = await request<SonglistDetail>(songUrl, {
    headers: defaultHeaders,
  })

  if (songStatusCode !== 200 || songBody.code !== pageInfo.successCode) {
    throw new Error('mg songlistDetail failed')
  }

  const musicList = buildMusicInfoListV5(songBody.data?.songList || [])

  return {
    list: musicList,
    total: songBody.data.totalCount,
    limit,
    page,
    info: {
      play_count: formatPlayCount(infoBody.data.opNumItem.playNum),
      name: infoBody.data.title,
      img: infoBody.data.imgItem.img,
      desc: infoBody.data.summary,
      author: infoBody.data.ownerName,
    },
  }
}

export const search = async (
  text: string,
  page: number,
  limit = 20
): Promise<{ list: AnyListen_API.SongListItem[]; total: number; limit: number; page: number }> => {
  const timeStr = Date.now().toString()
  const signData = await createSignature(timeStr, text)
  const url = `https://jadeite.migu.cn/music_search/v3/search/searchAll?isCorrect=1&isCopyright=1&searchSwitch=%7B%22song%22%3A0%2C%22album%22%3A0%2C%22singer%22%3A0%2C%22tagSong%22%3A0%2C%22mvSong%22%3A0%2C%22bestShow%22%3A0%2C%22songlist%22%3A1%2C%22lyricSong%22%3A0%7D&pageSize=${limit}&text=${encodeURIComponent(text)}&pageNo=${page}&sort=0&sid=USS`

  const { body, statusCode } = await request<SonglistSearch>(url, {
    headers: {
      uiVersion: 'A_music_3.6.1',
      deviceId: signData.deviceId,
      timestamp: timeStr,
      sign: signData.sign,
      channel: '0146921',
      'User-Agent':
        'Mozilla/5.0 (Linux; U; Android 11.0.0; zh-cn; MI 11 Build/OPR1.170623.032) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    },
  })

  if (statusCode !== 200 || body.code !== pageInfo.successCode) {
    throw new Error('mg songlistSearch failed')
  }

  const results = body.songListResultData?.result || []
  const list = results.map((item) => ({
    play_count: formatPlayCount(Number(item.playNum) || 0),
    id: item.id,
    author: item.userName,
    name: item.name,
    time: '',
    img: item.musicListPicUrl,
    total: Number(item.musicNum) || 0,
    desc: item.intro ?? '',
  }))

  return {
    list,
    limit,
    total: Number(body.songListResultData?.totalCount) || 0,
    page,
  }
}
