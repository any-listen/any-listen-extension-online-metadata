import { request } from '@/shared/hostApi'

import type { MusicSearch } from './types/musicSearch'
import { buildMusicInfoListV5, createSignature } from './utils'

const pageInfo = {
  limit: 20,
  total: 0,
  page: 0,
  allPage: 1,
}

const musicSearch = async (str: string, page: number, limit: number): Promise<MusicSearch> => {
  const time = Date.now().toString()
  const signData = await createSignature(time, str)

  const { body } = await request<MusicSearch>(
    `https://jadeite.migu.cn/music_search/v3/search/searchAll?isCorrect=0&isCopyright=1&searchSwitch=%7B%22song%22%3A1%2C%22album%22%3A0%2C%22singer%22%3A0%2C%22tagSong%22%3A1%2C%22mvSong%22%3A0%2C%22bestShow%22%3A1%2C%22songlist%22%3A0%2C%22lyricSong%22%3A0%7D&pageSize=${limit}&text=${encodeURIComponent(str)}&pageNo=${page}&sort=0&sid=USS`,
    {
      headers: {
        uiVersion: 'A_music_3.6.1',
        deviceId: signData.deviceId,
        timestamp: time,
        sign: signData.sign,
        channel: '0146921',
        'User-Agent':
          'Mozilla/5.0 (Linux; U; Android 11.0.0; zh-cn; MI 11 Build/OPR1.170623.032) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
      },
    }
  )

  return body
}

const filterData = (rawData: MusicSearch['songResultData']['resultList']): AnyListen_API.MusicInfoOnline[] => {
  return buildMusicInfoListV5(rawData.flat())
}

export const search = async (str: string, page = 1, limit?: number): Promise<AnyListen_API.MusicSearchResult> => {
  limit ??= pageInfo.limit

  const result = await musicSearch(str, page, limit)
  if (result.code !== '000000') throw new Error('mg search failed')
  const list = filterData(result.songResultData.resultList)
  pageInfo.total = Number.parseInt(result.songResultData.totalCount, 10) || 0
  pageInfo.page = page
  pageInfo.allPage = Math.ceil(pageInfo.total / limit)

  return {
    list,
    limit,
    total: pageInfo.total,
    page: pageInfo.page,
  }
}
