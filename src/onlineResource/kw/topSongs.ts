import { request } from '@/shared/hostApi'
import { decodeName, formatPlayTime } from '@/shared/utils'

import type { TopSongs } from './types/topSongs'
import type { Musiclist, TopSongsDetail } from './types/topSongsDetail'
import { formatSinger, wbdCrypto } from './util'

const boardList = [
  {
    id: '340',
    name: '青少年专属飙升榜',
    pic: 'http://img2.kwcdn.kuwo.cn/star/upload/8/8/1543919795640_.png',
  },
  {
    id: '93',
    name: '酷我飙升榜',
    pic: 'http://img3.kwcdn.kuwo.cn/star/upload/8/8/1543919795640_.png',
  },
  {
    id: '17',
    name: '酷我新歌榜',
    pic: 'http://img4.kwcdn.kuwo.cn/star/upload/9/9/1543919747769_.png',
  },
  {
    id: '16',
    name: '酷我热歌榜',
    pic: 'http://img1.kwcdn.kuwo.cn/star/upload/2/2/1543919658018_.png',
  },
  {
    id: '158',
    name: '抖音热歌榜',
    pic: 'http://img4.kwcdn.kuwo.cn/star/upload/6/6/1554970547302_.png',
  },
  {
    id: '145',
    name: '会员畅听榜',
    pic: 'http://img3.kwcdn.kuwo.cn/star/upload/1/1/1554695862673_.png',
  },
  {
    id: '176',
    name: 'DJ嗨歌榜',
    pic: 'http://img1.kwcdn.kuwo.cn/star/upload/9/9/1543805792217_.png',
  },
  {
    id: '69',
    name: '儿童歌曲榜',
    pic: 'https://kwimg1.kuwo.cn/star/upload/83/45/1708661051345_.jpg',
  },
  {
    id: '344',
    name: '儿童故事榜',
    pic: 'https://kwimg2.kuwo.cn/star/upload/64/29/1708661051623_.jpg',
  },
  {
    id: '284',
    name: '酷我热评榜',
    pic: 'http://img3.kwcdn.kuwo.cn/star/upload/11/11/1576751304219_.png',
  },
  {
    id: '278',
    name: '古风音乐榜',
    pic: 'http://img1.kwcdn.kuwo.cn/star/upload/12/12/1600079704156_.png',
  },
  {
    id: '264',
    name: 'Vlog音乐榜',
    pic: 'https://kwimg4.kuwo.cn/star/upload/48/48/1693479025902_.png',
  },
  {
    id: '242',
    name: '酷我电音榜',
    pic: 'http://img2.kwcdn.kuwo.cn/star/upload/1/1/1588145907409_.png',
  },
  {
    id: '187',
    name: '流行趋势榜',
    pic: 'http://img1.kwcdn.kuwo.cn/star/upload/13/13/1562810920205_.png',
  },
  {
    id: '204',
    name: '现场音乐榜',
    pic: 'http://img2.kwcdn.kuwo.cn/star/upload/13/13/1567493121245_.png',
  },
  {
    id: '185',
    name: '最强翻唱榜',
    pic: 'http://img3.kwcdn.kuwo.cn/star/upload/15/15/1558696739359_.png',
  },
  {
    id: '26',
    name: '经典怀旧榜',
    pic: 'https://kwimg4.kuwo.cn/star/upload/71/0/1693479018896_.png',
  },
  {
    id: '104',
    name: '酷我华语榜',
    pic: 'https://kwimg2.kuwo.cn/star/upload/89/89/1693479025943_.png',
  },
  {
    id: '182',
    name: '酷我粤语榜',
    pic: 'https://kwimg2.kuwo.cn/star/upload/7/9/1693479026059_.png',
  },
  {
    id: '22',
    name: '酷我欧美榜',
    pic: 'https://kwimg1.kuwo.cn/star/upload/93/93/1693479025947_.png',
  },
  {
    id: '184',
    name: '酷我韩语榜',
    pic: 'http://img1.kwcdn.kuwo.cn/star/upload/5/5/1558696815381_.png',
  },
  {
    id: '183',
    name: '酷我日语榜',
    pic: 'http://img4.kwcdn.kuwo.cn/star/upload/8/8/1558695640280_.png',
  },
  {
    id: '153',
    name: '网红新歌榜',
    pic: 'https://kwimg4.kuwo.cn/star/upload/22/23/1693479025975_.png',
  },
  {
    id: '64',
    name: '影视金曲榜',
    pic: 'http://img2.kwcdn.kuwo.cn/star/upload/9/9/1549010297209_.png',
  },
  {
    id: '151',
    name: '腾讯音乐人原创榜',
    pic: 'https://kwimg4.kuwo.cn/star/upload/4/19/1693480696087_.png',
  },
  {
    id: '12',
    name: 'Billboard榜',
    pic: 'http://img2.kwcdn.kuwo.cn/star/upload/7/7/1543920767111_.png',
  },
  {
    id: '180',
    name: 'beatport电音榜',
    pic: 'http://img2.kwcdn.kuwo.cn/star/upload/0/0/1548990226481_.png',
  },
  {
    id: '13',
    name: '英国UK榜',
    pic: 'http://img2.kwcdn.kuwo.cn/star/upload/4/4/1543920895540_.png',
  },
  {
    id: '164',
    name: '百大DJ榜',
    pic: 'http://img1.kwcdn.kuwo.cn/star/upload/7/7/1543921876743_.png',
  },
  {
    id: '246',
    name: 'YouTube音乐排行榜',
    pic: 'http://img2.kwcdn.kuwo.cn/star/upload/14/14/1569378463582_.png',
  },
  {
    id: '15',
    name: '日本公信榜',
    pic: 'http://img1.kwcdn.kuwo.cn/star/upload/11/11/1543921161339_.png',
  },
]

const regExps = {
  mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/,
}

const filterBoardsData = (rawList: TopSongs[]): AnyListen_API.TopSongsItem[] => {
  let list: AnyListen_API.TopSongsItem[] = []
  for (const board of rawList) {
    if (board.source != '1') continue
    list.push({
      id: board.sourceid,
      name: board.name,
      pic: board.pic,
    })
  }
  return list
}
export const getBoards = async (): Promise<AnyListen_API.TopSongsItem[]> => {
  try {
    const resp = await request<TopSongs>('http://qukudata.kuwo.cn/q.k?op=query&cont=tree&node=2&pn=0&rn=1000&fmt=json&level=2')
    if (resp.statusCode !== 200 || !resp.body.child) throw new Error('Failed to fetch boards')
    const list = filterBoardsData(resp.body.child)
    return list
  } catch {
    return boardList
  }
}

export const getDates = async (id: string): Promise<AnyListen_API.TagItem[]> => {
  return []
}

const filterData = (rawList: Musiclist[]): AnyListen_API.MusicInfoOnline[] => {
  return rawList.map((item) => {
    const types: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}

    const infoArr = item.n_minfo.split(';')
    for (const info of infoArr) {
      const result = regExps.mInfo.exec(info)
      if (result) {
        switch (result[2]) {
          case '4000':
            types.flac24bit = {
              sizeStr: result[4].toLocaleUpperCase(),
            }
            break
          case '2000':
            types.flac = {
              sizeStr: result[4].toLocaleUpperCase(),
            }
            break
          case '320':
            types['320k'] = {
              sizeStr: result[4].toLocaleUpperCase(),
            }
            break
          case '128':
            types['128k'] = {
              sizeStr: result[4].toLocaleUpperCase(),
            }
            break
        }
      }
    }

    return {
      id: String(item.id),
      name: decodeName(item.name),
      singer: formatSinger(decodeName(item.artist)),
      interval: formatPlayTime(item.duration),
      isLocal: false,
      meta: {
        picUrl: item.pic,
        albumName: decodeName(item.album),
        source: 'kw',
        musicId: String(item.id),
        qualitys: types,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
        albumId: item.albumId,
      },
    } satisfies AnyListen_API.MusicInfoOnline
  })
}

export const getList = async (
  id: string,
  date: string,
  page: number,
  limit?: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.TopSongsDetailInfo
}> => {
  limit = 100
  const requestBody = {
    uid: '',
    devId: '',
    sFrom: 'kuwo_sdk',
    user_type: 'AP',
    carSource: 'kwplayercar_ar_6.0.1.0_apk_keluze.apk',
    id,
    pn: page - 1,
    rn: limit,
  }
  const requestUrl = `https://wbd.kuwo.cn/api/bd/bang/bang_info?${await wbdCrypto.buildParam(requestBody)}`
  const { statusCode, body } = await request<string>(requestUrl)

  const rawData = await wbdCrypto.decodeData<TopSongsDetail>(body)
  // console.log(rawData)
  const data = rawData.data
  if (statusCode !== 200 || rawData.code != 200 || !data.musiclist) throw new Error('Failed to fetch top songs')

  const total = data.total
  const list = filterData(data.musiclist)

  return {
    total,
    list,
    limit,
    page,
    info: {
      name: data.name,
      pic: data.pic,
      date: data.releaseDate,
      desc: data.info,
    },
  }
}
