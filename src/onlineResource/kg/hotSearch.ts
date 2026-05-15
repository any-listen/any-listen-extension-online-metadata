import { request } from '@/shared/hostApi'
import { decodeName } from '@/shared/utils'

import type { HotSearch } from './types/hotSearch'

export const search = async () => {
  const { body, statusCode } = await request<HotSearch>(
    'http://gateway.kugou.com/api/v3/search/hot_tab?signature=ee44edb9d7155821412d220bcaf509dd&appid=1005&clientver=10026&plat=0',
    {
      headers: {
        dfid: '1ssiv93oVqMp27cirf2CvoF1',
        mid: '156798703528610303473757548878786007104',
        clienttime: '1584257267',
        'x-router': 'msearch.kugou.com',
        'user-agent': 'Android9-AndroidPhone-10020-130-0-searchrecommendprotocol-wifi',
        'kg-rc': '1',
      },
    }
  )

  if (statusCode !== 200 || body.errcode !== 0) throw new Error('kg hotSearch failed')

  const list: string[] = []
  for (const item of body.data?.list ?? []) {
    for (const keyword of item.keywords ?? []) {
      if (keyword.keyword) list.push(decodeName(keyword.keyword))
    }
  }
  return list
}
