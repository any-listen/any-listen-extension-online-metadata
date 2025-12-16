import { console, request } from '@/shared/hostApi'

export const getPic = async ({ id }: AnyListen_API.MusicInfo) => {
  let { body } = await request<string>(
    `http://artistpicserver.kuwo.cn/pic.web?corp=kuwo&type=rid_pic&pictype=500&size=500&rid=${id}`
  )
  console.log('kw pic:', body)
  if (/^http/.test(body)) {
    if (/^http:\/\//.test(body) && body.includes('.kwcdn.kuwo.cn')) {
      body = body.replace('.kwcdn.kuwo.cn', '.kuwo.cn')
      body = body.replace('http://', 'https://')
    }
    return body
  }
  return null
}
