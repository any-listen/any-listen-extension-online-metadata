import { console } from '@/shared/hostApi'

export const getPic = async ({ meta }: AnyListen_API.MusicInfo) => {
  console.log('tx pic:', meta.picUrl)
  return meta.picUrl
}
