import { formatSingerName } from '@/onlineResource/shared'
import { request } from '@/shared/hostApi'
import { formatPlayTime, sizeFormate } from '@/shared/utils'

import type { MusicDetail } from '../types/musicDetail'
import type { Resource } from '../types/musicSearch'
import type { SonglistDetail } from '../types/songlistDetail'
import type { TopSongsDetail } from '../types/topSongsDetail'
import { eapi, linuxapi, weapi } from './crypto'

export const eapiRequest = async <T = unknown>(url: string, data: object, retryNum = 0): Promise<AnyListen_API.Response<T>> => {
  const resp = await request<T>('http://interface.music.163.com/eapi/batch', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
      referer: 'https://music.163.com/',
      origin: 'https://music.163.com',
      // cookie: 'os=pc; deviceId=A9C064BB4584D038B1565B58CB05F95290998EE8B025AA2D07AE; osver=Microsoft-Windows-10-Home-China-build-19043-64bit; appver=2.5.2.197409; channel=netease; MUSIC_A=37a11f2eb9de9930cad479b2ad495b0e4c982367fb6f909d9a3f18f876c6b49faddb3081250c4980dd7e19d4bd9bf384e004602712cf2b2b8efaafaab164268a00b47359f85f22705cc95cb6180f3aee40f5be1ebf3148d888aa2d90636647d0c3061cd18d77b7a0; __csrf=05b50d54082694f945d7de75c210ef94; mode=Z7M-KP5(7)GZ; NMTID=00OZLp2VVgq9QdwokUgq3XNfOddQyIAAAF_6i8eJg; ntes_kaola_ad=1',
    },
    form: await eapi(url, data),
  })
  if (typeof resp.body == 'string') {
    try {
      resp.body = JSON.parse(resp.body as string)
    } catch (error) {
      if (retryNum >= 3) throw error
      return eapiRequest<T>(url, data, retryNum + 1)
    }
  }
  return resp
}

export const weapiRequest = async <T = unknown>(url: string, data: object, retryNum = 0): Promise<AnyListen_API.Response<T>> => {
  const resp = await request<T>(url, {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
      referer: 'https://music.163.com/',
      origin: 'https://music.163.com',
      // cookie: 'os=pc; deviceId=A9C064BB4584D038B1565B58CB05F95290998EE8B025AA2D07AE; osver=Microsoft-Windows-10-Home-China-build-19043-64bit; appver=2.5.2.197409; channel=netease; MUSIC_A=37a11f2eb9de9930cad479b2ad495b0e4c982367fb6f909d9a3f18f876c6b49faddb3081250c4980dd7e19d4bd9bf384e004602712cf2b2b8efaafaab164268a00b47359f85f22705cc95cb6180f3aee40f5be1ebf3148d888aa2d90636647d0c3061cd18d77b7a0; __csrf=05b50d54082694f945d7de75c210ef94; mode=Z7M-KP5(7)GZ; NMTID=00OZLp2VVgq9QdwokUgq3XNfOddQyIAAAF_6i8eJg; ntes_kaola_ad=1',
    },
    form: await weapi(data),
  })
  if (typeof resp.body == 'string') {
    try {
      resp.body = JSON.parse(resp.body as string)
    } catch (error) {
      if (retryNum >= 3) throw error
      return weapiRequest<T>(url, data, retryNum + 1)
    }
  }
  return resp
}

export const linuxapiRequest = async <T = unknown>(
  cookie: string,
  data: object,
  retryNum = 0
): Promise<AnyListen_API.Response<T>> => {
  const resp = await request<T>('https://music.163.com/api/linux/forward', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
      Cookie: cookie,
    },
    form: await linuxapi(data),
  })
  if (typeof resp.body == 'string') {
    try {
      resp.body = JSON.parse(resp.body as string)
    } catch (error) {
      if (retryNum >= 3) throw error
      return linuxapiRequest<T>(cookie, data, retryNum + 1)
    }
  }
  return resp
}

export const buildMusicList = (rawList: Resource[]): AnyListen_API.MusicInfoOnline[] => {
  // console.log(rawList)
  if (!rawList) return []
  return rawList.map((_item) => {
    const item = _item.baseInfo.simpleSongData
    const types: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}
    let size

    if (item.privilege.maxBrLevel == 'hires') {
      size = item.hr ? sizeFormate(item.hr.size) : null
      types.flac24bit = {
        sizeStr: size,
      }
    }
    switch (item.privilege.maxbr) {
      case 999000:
        size = item.sq ? sizeFormate(item.sq.size) : null
        types.flac = {
          sizeStr: size,
        }
      // eslint-disable-next-line no-fallthrough
      case 320000:
        size = item.h ? sizeFormate(item.h.size) : null
        types['320k'] = {
          sizeStr: size,
        }
      // eslint-disable-next-line no-fallthrough
      case 192000:
      case 128000:
        size = item.l ? sizeFormate(item.l.size) : null
        types['128k'] = {
          sizeStr: size,
        }
    }
    if (item.al.picUrl) item.al.picUrl += `${item.al.picUrl.includes('?') ? '&' : '?'}param=500y500`

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

type Detail =
  | {
      songs: MusicDetail['songs']
      privileges: MusicDetail['privileges']
    }
  | {
      songs: TopSongsDetail['playlist']['tracks']
      privileges: TopSongsDetail['privileges']
    }
  | {
      songs: SonglistDetail['playlist']['tracks']
      privileges: SonglistDetail['privileges']
    }

export const buildMusicList2 = ({ songs, privileges }: Detail): AnyListen_API.MusicInfoOnline[] => {
  const list: AnyListen_API.MusicInfoOnline[] = []
  songs.forEach((item, index) => {
    let privilege: Detail['privileges'][number] | undefined = privileges[index]
    if (privilege?.id !== item.id) privilege = privileges.find((current) => current.id === item.id)
    if (!privilege) return

    let size: string | null
    const qualitys: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}
    if (privilege.maxBrLevel == 'hires') {
      size = item.hr ? sizeFormate(item.hr.size) : null
      qualitys.flac24bit = {
        sizeStr: size,
      }
    }
    switch (privilege.maxbr) {
      case 999000:
        size = item.sq ? sizeFormate(item.sq.size) : null
        qualitys.flac = {
          sizeStr: size,
        }
      // eslint-disable-next-line no-fallthrough
      case 320000:
        size = item.h ? sizeFormate(item.h.size) : null
        qualitys['320k'] = {
          sizeStr: size,
        }
      // eslint-disable-next-line no-fallthrough
      case 192000:
      case 128000:
        size = item.l ? sizeFormate(item.l.size) : null
        qualitys['128k'] = {
          sizeStr: size,
        }
    }
    if (item.al.picUrl) item.al.picUrl += `${item.al.picUrl.includes('?') ? '&' : '?'}param=500y500`

    list.push({
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
        qualitys,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
        albumId: item.al.id,
      },
    })
  })
  return list
}
