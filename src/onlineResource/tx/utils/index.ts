import { request } from '@/shared/hostApi'
import { zzcSign } from './crypto'

export const signRequest = async <T>(data: Record<string, unknown>) => {
  // console.log(data)
  const sign = await zzcSign(JSON.stringify(data))
  // console.log('sign', sign)
  return request<T>(`https://u.y.qq.com/cgi-bin/musics.fcg?sign=${sign}`, {
    method: 'POST',
    headers: {
      'User-Agent': 'QQMusic 14090508(android 12)',
    },
    json: data,
  })
}
