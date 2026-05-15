import type { HotSearch } from './types/hotSearch'
import { eapiRequest } from './utils'

export const search = async () => {
  const { body, statusCode } = await eapiRequest<HotSearch>('/api/search/chart/detail', {
    id: 'HOT_SEARCH_SONG#@#',
  })

  if (statusCode !== 200 || body.code !== 200) throw new Error('wy hotSearch failed')

  return (body.data?.itemList ?? []).map((item) => item.searchWord ?? '').filter(Boolean)
}
