import { console } from '@/shared/hostApi'
import { getMusicInfo } from './musicInfo'

export const getPic = async (music: AnyListen_API.MusicInfo) => {
  const info = await getMusicInfo(music)
  let pic = info.al.picUrl
  if (pic) pic += `${pic.includes('?') ? '&' : '?'}param=500y500`
  console.log('wy pic:', pic)
  return pic
}
