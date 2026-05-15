import { console } from '@/shared/hostApi'

import { getList } from './musicDetail'

export const getPic = async (music: AnyListen_API.MusicInfo) => {
  const info = (await getList([music.id]))[0]
  let pic = info.meta.picUrl
  if (pic) pic += `${pic.includes('?') ? '&' : '?'}param=500y500`
  console.log('wy pic:', pic)
  return pic
}
