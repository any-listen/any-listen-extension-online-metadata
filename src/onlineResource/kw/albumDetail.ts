import { request } from '@/shared/hostApi'
import { decodeName, formatPlayTime } from '@/shared/utils'

import type { AlbumDetail, Musiclist } from './types/albumDetail'
import { formatSinger, objStr2JSON } from './util'

const pageInfo = {
  limit_song: 1000,
}

const filterListDetail = (rawList: Musiclist[], albumName: string, albumId: number): AnyListen_API.MusicInfoOnline[] => {
  return rawList.map((item) => {
    const formats = item.formats.split('|')
    const qualitys: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}

    if (formats.includes('MP3128')) qualitys['128k'] = { sizeStr: null }
    if (formats.includes('MP3H')) qualitys['320k'] = { sizeStr: null }
    if (formats.includes('ALFLAC')) qualitys.flac = { sizeStr: null }
    if (formats.includes('HIRFLAC')) qualitys.flac24bit = { sizeStr: null }

    const duration = parseInt(item.duration)
    return {
      id: item.id,
      name: decodeName(item.name),
      singer: formatSinger(decodeName(item.artist)),
      interval: Number.isNaN(duration) ? null : formatPlayTime(duration),
      isLocal: false,
      meta: {
        albumName,
        albumId,
        source: 'kw',
        musicId: item.id,
        picUrl: item.img || item.pic120 || null,
        qualitys,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
      },
    }
  })
}

export const getAlbumDetail = async (
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
  const { body: rawBody, statusCode } = await request<string>(
    `http://search.kuwo.cn/r.s?pn=${page - 1}&rn=${limit}&stype=albuminfo&albumid=${id}&show_copyright_off=0&encoding=utf&vipver=MUSIC_9.1.0`
  )

  if (statusCode !== 200) throw new Error('kw getAlbumDetail failed')

  const body = objStr2JSON<AlbumDetail>(rawBody)
  if (!body.musiclist) throw new Error('kw getAlbumDetail failed')

  const albumName = decodeName(body.name)
  return {
    list: filterListDetail(body.musiclist, albumName, parseInt(body.albumid)),
    page,
    limit,
    total: parseInt(body.songnum),
    info: {
      name: albumName,
      img: body.img || body.hts_img,
      desc: decodeName(body.info),
      author: decodeName(body.artist),
    },
  }
}
