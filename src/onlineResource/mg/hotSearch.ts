import { request } from '@/shared/hostApi'

import type { HotSearch } from './types/hotSearch'

const filterList = (rawList: HotSearch['data']['hotwords'][number]['hotwordList'] = []) => {
  return rawList.filter((item) => item.resourceType === 'song').map((item) => item.word)
}

export const search = async () => {
  const { body, statusCode } = await request<HotSearch>('http://jadeite.migu.cn:7090/music_search/v3/search/hotword')
  if (statusCode !== 200 || body.code !== '000000') throw new Error('mg hotSearch failed')

  return filterList(body.data.hotwords[0]?.hotwordList ?? [])
}
