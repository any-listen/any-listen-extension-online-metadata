import { getMusicInfo } from './musicDetail'

export const getPic = async (musicInfo: AnyListen_API.MusicInfoOnline) => {
  const info = await getMusicInfo(musicInfo.id)
  return info?.meta.picUrl
}
