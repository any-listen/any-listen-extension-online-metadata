import { request } from '@/shared/hostApi'

export const getPic = async ({ id }: AnyListen_API.MusicInfo) => {
  const { body } = await request<string>(
    `http://artistpicserver.kuwo.cn/pic.web?corp=kuwo&type=rid_pic&pictype=500&size=500&rid=${id}`
  )
  return /^http/.test(body) ? body : null
}
