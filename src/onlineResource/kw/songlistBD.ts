import { request } from '@/shared/hostApi'
import { formatPlayCount, formatPlayTime } from '@/shared/utils'

import type { SonglistDetailBDList, List as BDListItem } from './types/songlistDetailBDList'
import type { SonglistDetailBDListInfo } from './types/songlistDetailBDListInfo'
import type { SonglistDetailBDUserPub } from './types/songlistDetailBDUserPub'

const pageInfo = {
  limit_song: 1000,
}

const getReqId = () => {
  const t = () => ((65536 * (1 + Math.random())) | 0).toString(16).substring(1)
  return t() + t() + t() + t() + t() + t() + t() + t()
}

const filterBDListDetail = (rawList: BDListItem[]): AnyListen_API.MusicInfoOnline[] => {
  return rawList.map((item) => {
    const qualitys: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}

    for (const audio of item.audios) {
      const size = audio.size?.toLocaleUpperCase()
      switch (audio.bitrate) {
        case '4000':
          qualitys.flac24bit = { sizeStr: size ?? null }
          break
        case '2000':
          qualitys.flac = { sizeStr: size ?? null }
          break
        case '320':
          qualitys['320k'] = { sizeStr: size ?? null }
          break
        case '128':
          qualitys['128k'] = { sizeStr: size ?? null }
          break
      }
    }

    return {
      id: String(item.id),
      name: item.name,
      singer: item.artists.map((s) => s.name).join('、'),
      interval: formatPlayTime(item.duration),
      isLocal: false,
      meta: {
        albumName: item.album,
        albumId: item.albumId,
        source: 'kw',
        musicId: String(item.id),
        qualitys,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
        picUrl: item.albumPic,
      },
    }
  })
}

const getListDetailMusicListByBDListInfo = async (
  id: string,
  source: string
): Promise<AnyListen_API.SongListDetailInfo | null> => {
  const { body, statusCode } = await request<SonglistDetailBDListInfo>(
    `https://bd-api.kuwo.cn/api/service/playlist/info/${id}?reqId=${getReqId()}&source=${source}`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
        plat: 'h5',
      },
    }
  )

  if (statusCode !== 200 || body.code !== 200) return null

  return {
    name: `${body.data.name}喜欢的音乐`,
    img: body.data.pic,
    desc: body.data.description,
    author: body.data.creatorName,
    play_count: formatPlayCount(body.data.playNum),
  }
}

const getListDetailMusicListByBDUserPub = async (id: string): Promise<AnyListen_API.SongListDetailInfo | null> => {
  const { body, statusCode } = await request<SonglistDetailBDUserPub>(
    `https://bd-api.kuwo.cn/api/ucenter/users/pub/${id}?reqId=${getReqId()}`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
        plat: 'h5',
      },
    }
  )

  if (statusCode !== 200 || body.code !== 200) return null

  return {
    name: `${body.data.userInfo.nickname}喜欢的音乐`,
    img: body.data.userInfo.headImg,
    desc: '',
    author: body.data.userInfo.nickname,
    play_count: '',
  }
}

const getListDetailMusicListByBDList = async (
  id: string,
  source: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
}> => {
  const { body, statusCode } = await request<SonglistDetailBDList>(
    `https://bd-api.kuwo.cn/api/service/playlist/${id}/musicList?reqId=${getReqId()}&source=${source}&pn=${page}&rn=${pageInfo.limit_song}`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
        plat: 'h5',
      },
    }
  )

  if (statusCode !== 200 || body.code !== 200) throw new Error('kw getListDetail failed')

  return {
    list: filterBDListDetail(body.data.list),
    page,
    limit: body.data.pageSize,
    total: body.data.total,
  }
}

export const getListDetailMusicListByBD = async (
  id: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  const uid = /uid=(\d+)/.exec(id)?.[1]
  const listId = /playlistId=(\d+)/.exec(id)?.[1]
  const source = /source=(\d+)/.exec(id)?.[1]
  if (!listId) throw new Error('kw getListDetail failed')

  const listData = await getListDetailMusicListByBDList(listId, source || '4', page)
  let info: AnyListen_API.SongListDetailInfo | null = null
  if (source === '4') {
    info = await getListDetailMusicListByBDListInfo(listId, source)
  } else if (source === '5') {
    info = await getListDetailMusicListByBDUserPub(uid ?? listId)
  }

  return {
    ...listData,
    info: info ?? {
      name: '',
      img: '',
      desc: '',
      author: '',
      play_count: '',
    },
  }
}
