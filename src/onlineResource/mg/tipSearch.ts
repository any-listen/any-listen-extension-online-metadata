import { request } from '@/shared/hostApi'

import type { TipSearch } from './types/tipSearch'

const filterResult = (body: TipSearch) => {
  const result = new Set<string>()

  for (const item of body.data.singerList ?? []) {
    if (item.singerName) result.add(item.singerName)
  }
  for (const item of body.data.songList ?? []) {
    if (item.songName) result.add(item.songName)
  }

  return [...result]
}

export const search = async (str: string) => {
  const { body, statusCode } = await request<TipSearch>(
    `https://app.u.nf.migu.cn/pc/resource/content/tone_search_suggest/v1.0?text=${encodeURIComponent(str)}`,
    {
      headers: {
        'User-Agent': 'MGMobileMusic/7.33.0 (iPhone; iOS 16.6; Scale/3.00)',
        channel: '0146921',
      },
    }
  )

  if (statusCode !== 200 || body.code !== '000000') throw new Error('mg tipSearch failed')

  return filterResult(body)
}
