import { formatSingerName, toMD5 } from '@/onlineResource/shared'
import { formatPlayTime, sizeFormate } from '@/shared/utils'

import type { Resource } from '../types/musicDetail'
import type { SongResultDataResultList } from '../types/musicSearch'
import type { SongList } from '../types/songlistDetail'
import type { ObjectInfo } from '../types/topSongsDetail'

type QualityKey = '128k' | '320k' | 'flac' | 'flac24bit'
type QualityMap = NonNullable<AnyListen_API.MusicInfoOnline['meta']['qualitys']>

const setQuality = (qualitys: QualityMap, key: QualityKey, rawSize: number) => {
  if (!rawSize) return
  const sizeStr = sizeFormate(rawSize)
  qualitys[key] = { sizeStr }
}

const normalizeMiguImg = (img: string | null) => {
  if (!img) return null
  return /^https?:/.test(img) ? img : `http://d.musicapp.migu.cn${img}`
}

export const createSignature = async (time: number | string, str: string) => {
  const deviceId = '963B7AA0D21511ED807EE5846EC87D20'
  const signatureMd5 = '6cdc72a439cef99a3418d2a78aa28c73'
  const sign = await toMD5(`${str}${signatureMd5}yyapp2d16148780a1dcc7408e06336b98cfd50${deviceId}${time}`)
  return { sign, deviceId }
}

export const buildMusicInfoList = (rawList: ObjectInfo[] | Resource[]): AnyListen_API.MusicInfoOnline[] => {
  // console.log(rawList)
  const ids = new Set<string>()
  const list: AnyListen_API.MusicInfoOnline[] = []
  rawList.forEach((item) => {
    if (!item.songId || ids.has(item.songId)) return
    ids.add(item.songId)
    const qualitys: QualityMap = {}
    item.newRateFormats.forEach((type) => {
      const rawSize = Number(type.size ?? type.androidSize ?? 0)
      switch (type.formatType) {
        case 'PQ':
          setQuality(qualitys, '128k', rawSize)
          break
        case 'HQ':
          setQuality(qualitys, '320k', rawSize)
          break
        case 'SQ':
          setQuality(qualitys, 'flac', rawSize)
          break
        case 'ZQ':
          setQuality(qualitys, 'flac24bit', rawSize)
          break
        default:
          break
      }
    })

    const interval = /(\d\d:\d\d)$/.exec(item.length)?.[1] ?? null
    const img = item.albumImgs?.length ? item.albumImgs[0].img : null

    list.push({
      id: item.songId,
      singer: formatSingerName(item.artists, 'name'),
      name: item.songName,
      interval,
      isLocal: false,
      meta: {
        source: 'mg',
        musicId: item.songId,
        albumId: item.albumId,
        albumName: item.album,
        qualitys,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
        copyrightId: item.copyrightId,
        contentId: item.contentId,
        img,
        picUrl: img,
        lrc: null,
        lrcUrl: item.lrcUrl,
        mrcUrl: item.mrcUrl,
        trcUrl: item.trcUrl,
      },
    })
  })
  return list
}

export const buildMusicInfoListV5 = (rawList: SongList[] | SongResultDataResultList[]): AnyListen_API.MusicInfoOnline[] => {
  // console.log(rawList)
  const ids = new Set<string>()
  const list: AnyListen_API.MusicInfoOnline[] = []
  rawList.forEach((item) => {
    if (!item.songId || ids.has(item.songId)) return
    ids.add(item.songId)
    const qualitys: QualityMap = {}
    item.audioFormats.forEach((type) => {
      const rawSize = Number(type.isize ?? type.asize ?? 0)
      switch (type.formatType) {
        case 'PQ':
          setQuality(qualitys, '128k', rawSize)
          break
        case 'HQ':
          setQuality(qualitys, '320k', rawSize)
          break
        case 'SQ':
          setQuality(qualitys, 'flac', rawSize)
          break
        case 'ZQ':
        case 'ZQ24':
          setQuality(qualitys, 'flac24bit', rawSize)
          break
        default:
          break
      }
    })
    const img = normalizeMiguImg(item.img3 || item.img2 || item.img1 || null)

    list.push({
      id: item.songId,
      singer: formatSingerName(item.singerList, 'name'),
      name: item.songName,
      interval: formatPlayTime(item.duration),
      isLocal: false,
      meta: {
        source: 'mg',
        musicId: item.songId,
        albumId: item.albumId,
        albumName: item.album,
        qualitys,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
        copyrightId: item.copyrightId,
        contentId: item.contentId,
        img,
        picUrl: img,
        lrc: null,
        lrcUrl: item.lrcUrl,
        mrcUrl: item.mrcUrl,
        trcUrl: item.trcUrl,
      },
    })
  })
  return list
}
