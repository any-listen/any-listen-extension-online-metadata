import { request } from '@/shared/hostApi'

import type { HotSearch } from './types/hotSearch'

export const search = async () => {
  const { body, statusCode } = await request<HotSearch>(
    'http://hotword.kuwo.cn/hotword.s?prod=kwplayer_ar_9.3.0.1&corp=kuwo&newver=2&vipver=9.3.0.1&source=kwplayer_ar_9.3.0.1_40.apk&p2p=1&notrace=0&uid=0&plat=kwplayer_ar&rformat=json&encoding=utf8&tabid=1',
    {
      headers: {
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9;)',
      },
    }
  )
  if (statusCode != 200 || body.status !== 'ok') throw new Error('search failed')
  return body.tagvalue.map((item) => item.key)
}
