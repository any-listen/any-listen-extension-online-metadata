import { request } from '@/shared/hostApi'

import type { TipSearch } from './types/tipSearch'

export const search = async (str: string) => {
  const { body, statusCode } = await request<TipSearch>(
    `https://searchtip.kugou.com/getSearchTip?MusicTipCount=10&keyword=${encodeURIComponent(str)}`,
    {
      headers: {
        Referer: 'https://www.kugou.com/',
      },
    }
  )

  if (statusCode !== 200 || body.error_code !== 0 || !body.data.length) throw new Error('kg tipSearch failed')

  return body.data[0].RecordDatas.map((item) => item.HintInfo ?? '').filter(Boolean)
}
