import type { MusicDetail } from './types/musicDetail'
import { buildMusicList2, weapiRequest } from './utils'

export const getList = async (ids: Array<string | number> = []): Promise<AnyListen_API.MusicInfoOnline[]> => {
  const requestIds = ids.map((id) => Number(id)).filter((id) => Number.isFinite(id))
  const { body, statusCode } = await weapiRequest<MusicDetail>('https://music.163.com/weapi/v3/song/detail', {
    c: `[${requestIds.map((id) => `{"id":${id}}`).join(',')}]`,
    ids: `[${requestIds.join(',')}]`,
  })

  if (statusCode !== 200 || body.code !== 200) throw new Error('wy musicDetail failed')

  return buildMusicList2(body)
}
