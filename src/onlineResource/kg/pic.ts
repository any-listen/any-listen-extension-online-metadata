import { console, request } from '@/shared/hostApi'

export const getPic = async (musicInfo: AnyListen_API.MusicInfoOnline) => {
  const { body } = await request<{
    data: Array<{
      info: {
        imgsize?: string[]
        image: string
      }
    }>
  }>('http://media.store.kugou.com/v1/get_res_privilege', {
    method: 'POST',
    headers: {
      'KG-RC': '1',
      'KG-THash': 'expand_search_manager.cpp:852736169:451',
      'User-Agent': 'KuGou2012-9020-ExpandSearchManager',
    },
    json: {
      appid: 1001,
      area_code: '1',
      behavior: 'play',
      clientver: '9020',
      need_hash_offset: 1,
      relate: 1,
      resource: [
        {
          album_audio_id: musicInfo.meta.musicId,
          album_id: musicInfo.meta.albumId,
          hash: musicInfo.meta.hash,
          id: 0,
          name: `${musicInfo.singer} - ${musicInfo.name}.mp3`,
          type: 'audio',
        },
      ],
      token: '',
      userid: 2626431536,
      vip: 1,
    },
  })
  const info = body.data[0].info
  const img = info.imgsize ? info.image.replace('{size}', info.imgsize[0]) : info.image
  if (!img) return Promise.reject(new Error('Pic get failed'))
  console.log('kg pic:', img)
  return img
}
