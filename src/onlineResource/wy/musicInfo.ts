// https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/module/song_detail.js
import { request } from '@/shared/hostApi'
import { weapi } from './utils/crypto'
import { MusicInfo } from './types/musicinfo'

export const getMusicInfo = async ({ meta }: AnyListen_API.MusicInfo) => {
  const resp = await request<MusicInfo>('https://music.163.com/weapi/v3/song/detail', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
      Referer: 'https://music.163.com/song?id=' + meta.musicId,
      origin: 'https://music.163.com',
    },
    form: weapi({
      c: `[{"id":${meta.musicId}}]`,
      ids: `[${meta.musicId}]`,
    }),
  })
  if (typeof resp.body == 'string') resp.body = JSON.parse(resp.body as string)
  const { body } = resp
  if (body.code !== 200 || !body.songs.length) throw new Error('get music info error')
  return body.songs[0]
}
