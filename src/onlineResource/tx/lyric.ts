import { console, request } from '@/shared/hostApi'
import { b64DecodeUnicode, decodeName } from '@/shared/utils'
import { Lyric } from './types/lyric'

// const regexps = {
//   matchLrc: /.+"lyric":"([\w=+/]*)".+/,
// }

export const getLyric = async ({ meta }: AnyListen_API.MusicInfo) => {
  const songmid = meta.musicId
  const { body } = await request<Lyric>(
    `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songmid}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&platform=yqq`,
    {
      headers: {
        Referer: 'https://y.qq.com/portal/player.html',
      },
    }
  )
  if (body.code != 0 || !body.lyric) return Promise.reject(new Error('Get lyric failed'))
  console.log('tx lyric:', songmid)
  return {
    lyric: decodeName(b64DecodeUnicode(body.lyric)),
    tlyric: decodeName(b64DecodeUnicode(body.trans)),
    awlyric: null,
    rlyric: null,
  }
}
