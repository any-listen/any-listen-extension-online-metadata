import { request } from '@/shared/hostApi'

import type { TipSearch } from './types/tipSearch'

const tipSearchBySong = async (str: string) => {
  // 报错403，加了referer还是有问题（直接换一个
  // this.requestObj = await tokenRequest(`http://www.kuwo.cn/api/www/search/searchKey?key=${encodeURIComponent(str)}`)

  const { body, statusCode } = await request<TipSearch>(
    `https://tips.kuwo.cn/t.s?corp=kuwo&newver=3&p2p=1&notrace=0&c=mbox&w=${encodeURIComponent(str)}&encoding=utf8&rformat=json`,
    {
      headers: {
        Referer: 'http://www.kuwo.cn/',
      },
    }
  )
  if (statusCode != 200 || !body.WORDITEMS) throw new Error('search failed')
  return body.WORDITEMS.map((item) => item.RELWORD)
}

export const search = async (str: string) => {
  return tipSearchBySong(str)
}
