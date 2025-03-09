import { console } from '@/shared/hostApi'
import { getMusicInfo } from './musicInfo'

export const getPic = async (music: AnyListen_API.MusicInfo) => {
  const info = await getMusicInfo(music)
  console.log('wy pic:', info.al.picUrl)
  return info.al.picUrl
}
