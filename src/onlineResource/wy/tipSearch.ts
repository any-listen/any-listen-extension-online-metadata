import { formatSingerName } from '@/onlineResource/shared'

import type { TipSearch } from './types/tipSearch'
import { weapiRequest } from './utils'

export const search = async (str: string) => {
  const { body, statusCode } = await weapiRequest<TipSearch>('https://music.163.com/weapi/search/suggest/web', {
    s: str,
  })

  if (statusCode !== 200 || body.code !== 200) throw new Error('wy tipSearch failed')

  return (body.result?.songs ?? []).map((item) => `${item.name ?? ''} ${formatSingerName(item.artists ?? [], 'name')}`.trim())
}
