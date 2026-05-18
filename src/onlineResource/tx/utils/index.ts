import { formatSingerName } from '@/onlineResource/shared'
import { request } from '@/shared/hostApi'
import { formatPlayTime, sizeFormate } from '@/shared/utils'

import type { TrackInfo } from '../types/musicInfo'
import type { ItemSong } from '../types/musicSearch'
import type { Songlist } from '../types/songlistDetail'
import type { Songlist as Songlist2 } from '../types/songlistDetail2'
import type { SongInfoList } from '../types/topSongsDetail'
import { zzcSign } from './crypto'

export const signRequest = async <T>(data: Record<string, unknown>) => {
  // console.log(data)
  const sign = await zzcSign(JSON.stringify(data))
  // console.log('sign', sign)
  return request<T>(`https://u.y.qq.com/cgi-bin/musics.fcg?sign=${sign}`, {
    method: 'POST',
    headers: {
      'User-Agent': 'QQMusic 14090508(android 12)',
    },
    json: data,
  })
}

export const buildMusicList = (
  rawList: ItemSong[] | Songlist[] | SongInfoList[] | TrackInfo[] | Songlist2[]
): AnyListen_API.MusicInfoOnline[] => {
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
      interval: formatPlayTime(item.interval),
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
