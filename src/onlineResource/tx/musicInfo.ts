import { request } from '@/shared/hostApi'

import type { MusicInfo } from './types/musicInfo'
import { buildMusicList } from './utils'

export const getMusicInfo = async (songmid: string): Promise<AnyListen_API.MusicInfoOnline | null> => {
  const { body } = await request<MusicInfo>('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
    },
    json: {
      comm: {
        ct: '19',
        cv: '1859',
        uin: '0',
      },
      req: {
        module: 'music.pf_song_detail_svr',
        method: 'get_song_detail_yqq',
        param: {
          song_type: 0,
          song_mid: songmid,
        },
      },
    },
  })

  if (body.code !== 0 || body.req.code !== 0) throw new Error('tx getMusicInfo failed')
  const item = body.req.data.track_info
  if (!item.file?.media_mid) return null

  return buildMusicList([item])[0]
}
