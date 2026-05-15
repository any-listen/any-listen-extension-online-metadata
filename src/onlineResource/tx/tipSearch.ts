import { request } from '@/shared/hostApi'

import type { TipSearch } from './types/tipSearch'

export const search = async (str: string) => {
  const { body, statusCode } = await request<TipSearch>(
    `https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=json&key=${encodeURIComponent(str)}&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
    {
      headers: {
        Referer: 'https://y.qq.com/portal/player.html',
      },
    }
  )

  if (statusCode !== 200 || body.code !== 0) throw new Error('tx tipSearch failed')

  return (body.data?.song?.itemlist ?? []).map((item) => `${item.name ?? ''} ${item.singer ?? ''}`.trim())
}
