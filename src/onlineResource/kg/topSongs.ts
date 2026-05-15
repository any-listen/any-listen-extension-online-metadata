import { request } from '@/shared/hostApi'
import { dateFormat, decodeName, formatPlayTime, sizeFormate } from '@/shared/utils'

import { formatSingerName } from '../shared'
import type { TopSongs } from './types/topSongs'
import type { Info as TopSongsDetailItem, TopSongsDetail } from './types/topSongsDetail'

const pageInfo = {
  listDetailLimit: 100,
  maxRetryNum: 3,
}

const boardList = [
  {
    id: '8888',
    name: 'TOP500',
    bangid: '8888',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241219/20241219164209670219.png',
  },
  {
    id: '85897',
    name: '国潮音乐榜',
    bangid: '85897',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241120/20241120202644296668.jpg',
  },
  {
    id: '100530',
    name: '视频号热歌酷狗榜',
    bangid: '100530',
    picUrl: 'http://imge.kugou.com/mcommon/500/20251202/20251202193636899095.jpg',
  },
  {
    id: '51341',
    name: '民谣榜',
    bangid: '51341',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211184719475668.jpg',
  },
  {
    id: '59900',
    name: '纯音乐榜',
    bangid: '59900',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211185324343605.jpg',
  },
  {
    id: '33160',
    name: '电音榜',
    bangid: '33160',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211184628349205.jpg',
  },
  {
    id: '82831',
    name: '网络热歌榜',
    bangid: '82831',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241219/20241219195626644029.png',
  },
  {
    id: '6666',
    name: '飙升榜',
    bangid: '6666',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241219/20241219193628550054.png',
  },
  {
    id: '52144',
    name: '抖音热歌酷狗榜',
    bangid: '52144',
    picUrl: 'http://imge.kugou.com/mcommon/500/20250725/20250725182524501565.png',
  },
  {
    id: '59896',
    name: '摇滚榜',
    bangid: '59896',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211184944114279.jpg',
  },
  {
    id: '24971',
    name: 'DJ热歌榜',
    bangid: '24971',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241219/20241219194419154116.png',
  },
  {
    id: '80025',
    name: '国乐榜',
    bangid: '80025',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211184535924138.png',
  },
  {
    id: '85432',
    name: '百万收藏榜',
    bangid: '85432',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241219/20241219171042182683.png',
  },
  {
    id: '52767',
    name: '快手热歌酷狗榜',
    bangid: '52767',
    picUrl: 'http://imge.kugou.com/mcommon/500/20250725/20250725183206991263.png',
  },
  {
    id: '74534',
    name: '新歌榜',
    bangid: '74534',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241219/20241219200509300768.png',
  },
  {
    id: '84235',
    name: '名品堂',
    bangid: '84235',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241219/20241219195054422404.png',
  },
  {
    id: '31308',
    name: '内地榜',
    bangid: '31308',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211192146592398.png',
  },
  {
    id: '33165',
    name: '粤语金曲榜',
    bangid: '33165',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241219/20241219200119140556.png',
  },
  {
    id: '31310',
    name: '欧美榜',
    bangid: '31310',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211192454699571.jpg',
  },
  {
    id: '51340',
    name: '伤感榜',
    bangid: '51340',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241219/20241219195213930623.png',
  },
  {
    id: '31311',
    name: '韩国榜',
    bangid: '31311',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211192536531946.jpg',
  },
  {
    id: '31312',
    name: '日本榜',
    bangid: '31312',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211192703831514.jpg',
  },
  {
    id: '31313',
    name: '香港地区榜',
    bangid: '31313',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211192249298044.jpg',
  },
  {
    id: '42807',
    name: 'JOOX香港热歌榜',
    bangid: '42807',
    picUrl: 'http://imge.kugou.com/mcommon/500/20250609/20250609104556453665.jpg',
  },
  {
    id: '49225',
    name: '80后热歌榜',
    bangid: '49225',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211185822886829.jpg',
  },
  {
    id: '54848',
    name: '台湾地区榜',
    bangid: '54848',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211192349409526.jpg',
  },
  {
    id: '59895',
    name: 'R&B榜',
    bangid: '59895',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211184856929448.jpg',
  },
  {
    id: '44412',
    name: '说唱先锋榜',
    bangid: '44412',
    picUrl: 'http://imge.kugou.com/mcommon/500/20240801/20240801174246809486.jpg',
  },
  {
    id: '49223',
    name: '90后热歌榜',
    bangid: '49223',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211185910253287.jpg',
  },
  {
    id: '42808',
    name: 'KKBOX风云榜',
    bangid: '42808',
    picUrl: 'http://imge.kugou.com/mcommon/500/20250605/20250605114541276767.jpg',
  },
  {
    id: '49224',
    name: '00后热歌榜',
    bangid: '49224',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211185955370846.jpg',
  },
  {
    id: '33162',
    name: 'ACG新歌榜',
    bangid: '33162',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211184809101184.jpg',
  },
  {
    id: '35811',
    name: '会员热歌榜',
    bangid: '35811',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211190815330214.jpg',
  },
  {
    id: '33166',
    name: '欧美金曲榜',
    bangid: '33166',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211190352819248.jpg',
  },
  {
    id: '33163',
    name: '影视金曲榜',
    bangid: '33163',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211190457598263.jpg',
  },
  {
    id: '59897',
    name: '爵士榜',
    bangid: '59897',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211185038580940.jpg',
  },
  {
    id: '59898',
    name: '乡村音乐榜',
    bangid: '59898',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211185123607801.jpg',
  },
  {
    id: '65234',
    name: '儿歌榜',
    bangid: '65234',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211191500485663.png',
  },
  {
    id: '60170',
    name: '闽南语榜',
    bangid: '60170',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211191332657103.jpg',
  },
  {
    id: '46910',
    name: '综艺新歌榜',
    bangid: '46910',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211191122925263.jpg',
  },
  {
    id: '30972',
    name: '酷狗音乐人原创榜',
    bangid: '30972',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211191231362267.jpg',
  },
  {
    id: '37361',
    name: '酷狗识曲榜',
    bangid: '37361',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211190930749712.jpg',
  },
  {
    id: '59899',
    name: '古典榜',
    bangid: '59899',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241211/20241211185545620318.jpg',
  },
  {
    id: '4681',
    name: '美国BillBoard榜',
    bangid: '4681',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241129/20241129191451959672.jpg',
  },
  {
    id: '108332',
    name: '粤剧榜',
    bangid: '108332',
    picUrl: 'http://imge.kugou.com/mcommon/500/20260318/20260318165457262501.jpg',
  },
  {
    id: '25028',
    name: 'Beatport电子舞曲榜',
    bangid: '25028',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241129/20241129191254713903.jpg',
  },
  {
    id: '108333',
    name: '京剧榜',
    bangid: '108333',
    picUrl: 'http://imge.kugou.com/mcommon/500/20260318/20260318165621528435.jpg',
  },
  {
    id: '4680',
    name: '英国单曲榜',
    bangid: '4680',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241129/20241129184843867507.jpg',
  },
  {
    id: '108335',
    name: '南音榜',
    bangid: '108335',
    picUrl: 'http://imge.kugou.com/mcommon/500/20260318/20260318165732662096.jpg',
  },
  {
    id: '38623',
    name: '韩国Melon音乐榜',
    bangid: '38623',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241129/20241129185007675569.jpg',
  },
  {
    id: '4673',
    name: '日本公信榜',
    bangid: '4673',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241129/20241129190753306040.jpg',
  },
  {
    id: '46868',
    name: '日本SS榜',
    bangid: '46868',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241129/20241129190920828981.jpg',
  },
  {
    id: '36107',
    name: '小语种热歌榜',
    bangid: '36107',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241129/20241129184735526204.jpg',
  },
  {
    id: '60171',
    name: '越南语榜',
    bangid: '60171',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241129/20241129184925598181.jpg',
  },
  {
    id: '60172',
    name: '泰语榜',
    bangid: '60172',
    picUrl: 'http://imge.kugou.com/mcommon/500/20241129/20241129191037702382.jpg',
  },
]

const boardInfoMap: Record<string, { name: string; pic: string; desc: string }> = {}

const updateBoardInfoMap = (boards: Array<{ id: string; name: string; pic: string; desc?: string }>) => {
  for (const board of boards) {
    boardInfoMap[board.id] = {
      name: board.name,
      pic: board.pic,
      desc: board.desc ?? '',
    }
  }
}

updateBoardInfoMap(
  boardList.map((item) => ({
    id: item.bangid,
    name: item.name,
    pic: item.picUrl,
    desc: '',
  }))
)

const getUrl = (page: number, id: string, limit: number) => {
  return `http://mobilecdnbj.kugou.com/api/v3/rank/song?version=9108&ranktype=1&plat=0&pagesize=${limit}&area_code=1&page=${page}&rankid=${id}&with_res_tag=0&show_portrait_mv=1`
}

const filterBoardList = (): AnyListen_API.TopSongsItem[] => {
  return boardList.map((board) => ({
    id: board.bangid,
    name: board.name,
    pic: board.picUrl,
  }))
}

const filterBoardsData = (rawList: TopSongs['data']['info']): AnyListen_API.TopSongsItem[] => {
  const list: AnyListen_API.TopSongsItem[] = []
  for (const board of rawList) {
    if (board.isvol !== 1) continue
    list.push({
      id: String(board.rankid),
      name: board.rankname,
      pic: (board.imgurl || board.img_cover || board.bannerurl || '').replace('{size}', '500'),
    })
  }
  updateBoardInfoMap(
    list.map((item) => ({
      id: item.id,
      name: item.name,
      pic: item.pic ?? '',
      desc: rawList.find((board) => String(board.rankid) === item.id)?.intro ?? '',
    }))
  )
  return list
}

export const getBoards = async (): Promise<AnyListen_API.TopSongsItem[]> => {
  try {
    const { body, statusCode } = await request<TopSongs>(
      'http://mobilecdnbj.kugou.com/api/v5/rank/list?version=9108&plat=0&showtype=2&parentid=0&apiver=6&area_code=1&withsong=1'
    )
    if (statusCode !== 200 || body.errcode !== 0) throw new Error('kg topSongs getBoards failed')
    return filterBoardsData(body.data.info)
  } catch {
    return filterBoardList()
  }
}

export const getDates = async (_id: string): Promise<AnyListen_API.TagItem[]> => {
  return []
}

const createQuality = (size: number, hash: string) => {
  return size > 0 && hash
    ? {
        sizeStr: sizeFormate(size),
        hash,
      }
    : null
}

const filterData = (rawList: TopSongsDetail['data']['info']): AnyListen_API.MusicInfoOnline[] => {
  return rawList.map((item) => {
    const qualitys: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}

    const quality128 = createQuality(item.filesize, item.hash)
    if (quality128) qualitys['128k'] = quality128

    const quality320 = createQuality(item['320filesize'], item['320hash'])
    if (quality320) qualitys['320k'] = quality320

    const qualityFlac = createQuality(item.sqfilesize, item.sqhash)
    if (qualityFlac) qualitys.flac = qualityFlac

    const qualityHiRes = createQuality(item.filesize_high, item.hash_high)
    if (qualityHiRes) qualitys.flac24bit = qualityHiRes

    return {
      id: String(item.audio_id),
      name: decodeName(item.songname),
      singer: decodeName(formatSingerName(item.authors, 'author_name')),
      interval: formatPlayTime(item.duration),
      isLocal: false,
      meta: {
        albumName: decodeName(item.remark),
        albumId: Number(item.album_id),
        source: 'kg',
        musicId: String(item.audio_id),
        qualitys,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
        hash: item.hash,
        _interval: item.duration,
        picUrl: null,
      },
    }
  })
}

const getBoardInfo = (id: string) => {
  return (
    boardInfoMap[id] ?? {
      name: '',
      pic: '',
      desc: '',
    }
  )
}

export const getList = async (
  id: string,
  date: string,
  page: number,
  limit = pageInfo.listDetailLimit
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.TopSongsDetailInfo
}> => {
  limit = pageInfo.listDetailLimit
  const { body, statusCode } = await request<TopSongsDetail>(getUrl(page, id, limit))
  if (statusCode !== 200 || body.errcode !== 0) throw new Error('kg topSongs getList failed')

  const rawList = body.data.info
  const firstItem: TopSongsDetailItem | undefined = rawList[0]
  const boardInfo = getBoardInfo(id)

  return {
    total: body.data.total,
    list: filterData(rawList),
    limit,
    page,
    info: {
      name: boardInfo.name || '排行榜详情',
      pic: boardInfo.pic,
      desc: boardInfo.desc,
      date: dateFormat(firstItem.rank_id_publish_date, 'Y-M-D'),
    },
  }
}

export const getDetailPageUrl = async (id: string): Promise<string> => {
  return `https://www.kugou.com/yy/rank/home/1-${id}.html`
}
