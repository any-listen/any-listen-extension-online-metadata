import { dateFormat } from '@/shared/common'
import { request } from '@/shared/hostApi'

import type { TopSongs } from './types/topSongs'
import type { TopSongsDetail } from './types/topSongsDetail'
import { buildMusicInfoList } from './utils'

const boardList: AnyListen_API.TopSongsItem[] = [
  {
    id: '75959118',
    name: '音乐风向榜',
    pic: 'https://d.musicapp.migu.cn/data/oss/column/00/1w/w7/913ca325104448e7a019b6c3f9ec4874.webp',
  },
  {
    id: '76557036',
    name: '彩铃分贝榜',
    pic: 'https://d.musicapp.migu.cn/data/oss/column/00/1w/w7/6bfcc5b221404d00a84fa70576f35655.webp',
  },
  {
    id: '76557745',
    name: '会员臻爱榜',
    pic: 'https://d.musicapp.migu.cn/data/oss/column/00/1w/w7/61ee20c3cea148168405ca9ddbf93807.webp',
  },
  {
    id: '23189800',
    name: '港台榜',
    pic: 'https://d.musicapp.migu.cn/data/oss/column/00/1w/w7/529556c1b7a5450c8a8a77fc17b6da00.webp',
  },
  {
    id: '23189399',
    name: '内地榜',
    pic: 'https://d.musicapp.migu.cn/data/oss/column/00/1w/w6/72b0840d1c84402eb25d59e5f0257b20.webp',
  },
  {
    id: '83176390',
    name: '国风热歌榜',
    pic: 'https://d.musicapp.migu.cn/data/oss/resource/00/5s/8y/67eabab4110847809d319eefe5794cbd.webp',
  },
  {
    id: '27553319',
    name: '新歌榜',
    pic: 'https://d.musicapp.migu.cn/data/oss/resource/00/5s/8y/67eabab4110847809d319eefe5794cbd.webp',
  },
  {
    id: '27186466',
    name: '热歌榜',
    pic: 'https://d.musicapp.migu.cn/data/oss/resource/00/4t/9y/a64e69c4d8c54f59b580b1a25ae5ceb3.webp',
  },
  {
    id: '27553408',
    name: '原创榜',
    pic: 'https://d.musicapp.migu.cn/data/oss/resource/00/5l/hn/52e4c5c1862347928827e9f00cfada1a.webp',
  },
]

const parseBoards = (data: TopSongs): AnyListen_API.TopSongsItem[] => {
  const list: AnyListen_API.TopSongsItem[] = []
  const seen = new Set<string>()

  for (const content of data.data?.contents ?? []) {
    for (const item of content.contents ?? []) {
      if (item.rankId && !seen.has(item.rankId)) {
        seen.add(item.rankId)
        list.push({
          id: item.rankId,
          name: item.rankName,
          pic: item.imageUrl,
        })
      }
    }
  }

  return list.length > 0 ? list : boardList
}

export const getBoards = async (): Promise<AnyListen_API.TopSongsItem[]> => {
  try {
    const { body, statusCode } = await request<TopSongs>('https://app.c.nf.migu.cn/pc/bmw/rank/rank-index/v1.0', {
      headers: {
        Referer: 'https://app.c.nf.migu.cn/',
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
        channel: '0146921',
      },
    })

    if (statusCode !== 200 || body.code !== '000000' || !body.data?.contents) {
      throw new Error('wy topSongs getBoards failed')
    }
    return parseBoards(body)
  } catch {
    return boardList
  }
}

export const getDates = async (): Promise<AnyListen_API.TagItem[]> => {
  return []
}

export const getList = async (
  id: string,
  _date: string,
  page: number,
  limit = 200
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.TopSongsDetailInfo
}> => {
  const url = `https://app.c.nf.migu.cn/MIGUM2.0/v1.0/content/querycontentbyId.do?columnId=${id}&needAll=0`
  const { body, statusCode } = await request<TopSongsDetail>(url, {
    headers: {
      Referer: 'https://app.c.nf.migu.cn/',
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
      channel: '0146921',
    },
  })
  if (statusCode !== 200 || body.code !== '000000') {
    throw new Error('mg topSongs getList failed')
  }
  const list = buildMusicInfoList(body.columnInfo.contents.map((item) => item.objectInfo))

  return {
    list,
    total: body.columnInfo.contentsCount,
    limit: body.columnInfo.contentsCount,
    page,
    info: {
      name: body.columnInfo.columnTitle,
      pic: body.columnInfo.columnSmallpicUrl,
      desc: body.columnInfo.columnDes,
      date: dateFormat(body.columnInfo.columnUpdateTime, 'Y-M-D'),
    },
  }
}
