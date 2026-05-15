import { request } from '@/shared/hostApi'
import { decodeName, formatPlayCount, formatPlayTime } from '@/shared/utils'

import { getAlbumDetail } from './albumDetail'
import { getListDetailMusicListByBD } from './songlistBD'
import type { Songlist } from './types/songlist'
import type { SonglistDetailDigest5Info } from './types/songlistDetailDigest5Info'
import type { SonglistDetailDigest8 } from './types/songlistDetailDigest8'
import type { SonglistGroup } from './types/songlistGroups'
import type { HotTag } from './types/songlistHotTag'
import type { SonglistSearch } from './types/songlistSearch'
import type { Tag } from './types/songlistTag'
import { formatSinger, objStr2JSON } from './util'

const pageInfo = {
  limit_list: 36,
  limit_song: 1000,
  successCode: 200,
  sortList: [
    { label: 'new', name: '最新', id: 'new' },
    { label: 'hot', name: '最热', id: 'hot' },
  ],
  tagsUrl:
    'http://wapi.kuwo.cn/api/pc/classify/playlist/getTagList?cmd=rcm_keyword_playlist&user=0&prod=kwplayer_pc_9.0.5.0&vipver=9.0.5.0&source=kwplayer_pc_9.0.5.0&loginUid=0&loginSid=0&appUid=76039576',
  hotTagUrl: 'http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmTagList?loginUid=0&loginSid=0&appUid=76039576',
}

const regExps = {
  mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/,
  listDetailLink: /^.+\/playlist(?:_detail)?\/(\d+)(?:\?.*|&.*$|#.*$|$)/,
}

export const getSorts = async (): Promise<AnyListen_API.TagItem[]> => {
  return pageInfo.sortList.map((item) => ({
    id: String(item.id),
    name: `{songlist.sort.${item.label}}`,
  }))
}

const filterTagInfo = (rawList: Tag['data']): AnyListen_API.TagGroupItem[] => {
  return rawList.map((type) => ({
    name: type.name,
    list: type.data.map((item) => ({
      id: `${item.id}-${item.digest}`,
      name: item.name,
    })),
  }))
}

const filterInfoHotTag = (rawList: HotTag['data'][0]['data']): AnyListen_API.TagItem[] => {
  return rawList.map((item) => ({
    id: `${item.id}-${item.digest}`,
    name: item.name,
  }))
}

const getTag = async (): Promise<AnyListen_API.TagGroupItem[]> => {
  const { body, statusCode } = await request<Tag>(pageInfo.tagsUrl)
  if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error('kw songlistTags failed')
  return filterTagInfo(body.data)
}

const getHotTag = async (): Promise<AnyListen_API.TagItem[]> => {
  const { body, statusCode } = await request<HotTag>(pageInfo.hotTagUrl)
  if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error('kw songlistTags failed')
  return filterInfoHotTag(body.data[0].data)
}

export const getTags = async (): Promise<{ tags: AnyListen_API.TagGroupItem[]; hotTags: AnyListen_API.TagItem[] }> => {
  const [tags, hotTags] = await Promise.all([getTag(), getHotTag()])
  return { tags, hotTags }
}

const getListUrl = ({ sortId, id, type, page }: { sortId: string; id: string | null; type: string | null; page: number }) => {
  if (!id) {
    return `http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?loginUid=0&loginSid=0&appUid=76039576&&pn=${page}&rn=${pageInfo.limit_list}&order=${sortId}`
  }
  // if (type === '10000') {
  // }
  return `http://wapi.kuwo.cn/api/pc/classify/playlist/getTagPlayList?loginUid=0&loginSid=0&appUid=76039576&pn=${page}&id=${id}&rn=${pageInfo.limit_list}`
}

const filterList = (rawData: Songlist['data']['data']): AnyListen_API.SongListItem[] => {
  return rawData.map((item) => ({
    play_count: formatPlayCount(Number(item.listencnt ?? 0)),
    id: `digest-${item.digest}__${item.id}`,
    author: item.uname ?? '',
    name: item.name ?? '',
    total: Number(item.total ?? 0),
    img: item.img ?? '',
    desc: item.desc ?? '',
  }))
}

const filterList2 = (rawData: SonglistGroup[]): AnyListen_API.SongListItem[] => {
  const list: AnyListen_API.SongListItem[] = []
  // digest: 5 = list, 8 = songlist, 13 = album, 4 = artist
  const allowedTypes = ['songlist', 'list', 'album']

  for (const group of rawData) {
    for (const item of group.list) {
      if (!allowedTypes.includes(item.type)) continue
      list.push({
        id: `digest-${item.digest}__${item.id}`,
        name: item.name,
        img: item.img,
        desc: item.desc,
      })
    }
  }
  return list
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
  let id: string | null = null
  let type: string | null = null
  if (tagId) {
    const arr = tagId.split('-')
    id = arr[0]
    type = arr[1]
  }

  if (!id || type === '10000') {
    const { body } = await request<Songlist>(getListUrl({ sortId, id, type, page }))
    const dataBody = body
    return {
      list: filterList(dataBody.data.data),
      total: dataBody.data.total,
      page: dataBody.data.pn,
      limit: dataBody.data.rn,
    }
  }

  const { body } = await request<SonglistGroup[]>(
    `http://mobileinterfaces.kuwo.cn/er.s?type=get_pc_qz_data&f=web&id=${id}&prod=pc`
  )
  const list = filterList2(body)
  return {
    list,
    total: list.length,
    page,
    limit,
  }
}

const getListDetailUrl = (id: string, page: number) => {
  return `http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=${id}&pn=${page - 1}&rn=${pageInfo.limit_song}&encode=utf8&keyset=pl2012&identity=kuwo&pcmp4=1&vipver=MUSIC_9.0.5.0_W1&newver=1`
}

const filterListDetail = (rawList: SonglistDetailDigest8['musiclist']): AnyListen_API.MusicInfoOnline[] => {
  return rawList.map((item) => {
    const infoArr = item.N_MINFO.split(';')
    const qualitys: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}

    for (const info of infoArr) {
      const result = regExps.mInfo.exec(info)
      if (result) {
        switch (result[2]) {
          case '4000':
            qualitys.flac24bit = { sizeStr: result[4].toLocaleUpperCase() }
            break
          case '2000':
            qualitys.flac = { sizeStr: result[4].toLocaleUpperCase() }
            break
          case '320':
            qualitys['320k'] = { sizeStr: result[4].toLocaleUpperCase() }
            break
          case '128':
            qualitys['128k'] = { sizeStr: result[4].toLocaleUpperCase() }
            break
        }
      }
    }

    const duration = parseInt(item.duration)
    return {
      id: item.id,
      name: decodeName(item.name),
      singer: formatSinger(decodeName(item.artist)),
      interval: Number.isNaN(duration) ? null : formatPlayTime(duration),
      isLocal: false,
      meta: {
        albumName: decodeName(item.album),
        albumId: Number(item.albumid),
        source: 'kw',
        musicId: item.id,
        qualitys,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
      },
    }
  })
}

const getListDetailDigest8 = async (
  id: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  const { body, statusCode } = await request<SonglistDetailDigest8>(getListDetailUrl(id, page))
  if (statusCode !== 200 || body.result !== 'ok') throw new Error('kw getListDetail failed')
  return {
    list: filterListDetail(body.musiclist),
    page,
    limit: body.rn,
    total: body.total,
    info: {
      name: body.title,
      img: body.pic,
      desc: body.info,
      author: body.uname,
      play_count: formatPlayCount(body.playnum),
    },
  }
}

const getListDetailDigest5Info = async (id: string): Promise<string | null> => {
  const { body, statusCode } = await request<SonglistDetailDigest5Info>(
    `http://qukudata.kuwo.cn/q.k?op=query&cont=ninfo&node=${id}&pn=0&rn=1&fmt=json&src=mbox&level=2`
  )
  if (statusCode !== 200 || !body.child) return null
  return body.child.length ? body.child[0].sourceid : null
}

const getListDetailDigest5Music = async (
  id: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  const { body, statusCode } = await request<SonglistDetailDigest8>(
    `http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=${id}&pn=${page - 1}&rn=${pageInfo.limit_song}&encode=utf-8&keyset=pl2012&identity=kuwo&pcmp4=1`
  )
  if (statusCode !== 200 || body.result !== 'ok') throw new Error('kw getListDetail failed')
  return {
    list: filterListDetail(body.musiclist),
    page,
    limit: body.rn,
    total: body.total,
    info: {
      name: body.title,
      img: body.pic,
      desc: body.info,
      author: body.uname,
      play_count: formatPlayCount(body.playnum),
    },
  }
}

const getListDetailDigest5 = async (
  id: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  const detailId = await getListDetailDigest5Info(id)
  if (!detailId) throw new Error('kw getListDetail failed')
  return getListDetailDigest5Music(detailId, page)
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
  if (id.includes('/bodian/')) return getListDetailMusicListByBD(id, page)

  let rawId = id
  if (/[?&:/]/.test(id)) {
    rawId = id.replace(regExps.listDetailLink, '$1')
  } else if (id.startsWith('digest-')) {
    const [digest, _id] = id.split('__')
    const digestNum = digest.replace('digest-', '')
    rawId = _id
    switch (digestNum) {
      case '8':
        break
      case '13': {
        return getAlbumDetail(rawId, page, limit)
      }
      case '5':
      default: {
        return getListDetailDigest5(rawId, page)
      }
    }
  }
  return getListDetailDigest8(rawId, page)
}

export const getDetailPageUrl = async (id: string): Promise<string> => {
  let rawId = id
  if (/[?&:/]/.test(id)) {
    rawId = id.replace(regExps.listDetailLink, '$1')
  } else if (id.startsWith('digest-')) {
    const result = id.split('__')
    rawId = result[1]
  }
  return `http://www.kuwo.cn/playlist_detail/${rawId}`
}

export const search = async (
  keyword: string,
  page: number,
  limit = 20
): Promise<{ list: AnyListen_API.SongListItem[]; total: number; limit: number; page: number }> => {
  const { body: rawBody } = await request<string>(
    `http://search.kuwo.cn/r.s?all=${encodeURIComponent(keyword)}&pn=${page - 1}&rn=${limit}&rformat=json&encoding=utf8&ver=mbox&vipver=MUSIC_8.7.7.0_BCS37&plat=pc&devid=28156413&ft=playlist&pay=0&needliveshow=0`
  )
  const body = objStr2JSON<SonglistSearch>(rawBody)
  return {
    list: body.abslist.map((item) => ({
      play_count: formatPlayCount(Number(item.playcnt ?? 0)),
      id: String(item.playlistid ?? ''),
      author: decodeName(item.nickname ?? ''),
      name: decodeName(item.name ?? ''),
      total: Number(item.songnum ?? 0),
      img: item.pic ?? '',
      desc: decodeName(item.intro ?? ''),
    })),
    total: Number(body.TOTAL ?? 0),
    limit,
    page,
  }
}
