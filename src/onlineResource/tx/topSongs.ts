import { request } from '@/shared/hostApi'
import { decodeName } from '@/shared/utils'

import type { TopSongs } from './types/topSongs'
import type { TopSongsDetail } from './types/topSongsDetail'
import { buildMusicList } from './utils'

const boardList = [
  { id: '4', name: '流行指数榜', bangid: '4', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000001qdESL0Utojf.jpg' },
  { id: '26', name: '热歌榜', bangid: '26', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000002Sayej2GqCJH.jpg' },
  { id: '78', name: '国乐榜', bangid: '78', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000002iwP0g3FpEfy.jpg' },
  { id: '27', name: '新歌榜', bangid: '27', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000000cPzvb0QoYOJ.jpg' },
  { id: '62', name: '飙升榜', bangid: '62', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000002qJVCm3Ooro8.jpg' },
  { id: '58', name: '说唱榜', bangid: '58', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000001JVH724BvKc2.jpg' },
  { id: '57', name: '电音榜', bangid: '57', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000003jJbYt0SxaHf.jpg' },
  { id: '28', name: '网络歌曲榜', bangid: '28', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000002yBBlS3kfK5X.jpg' },
  { id: '5', name: '内地榜', bangid: '5', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M0000017ztgy40tyJI.jpg' },
  { id: '3', name: '欧美榜', bangid: '3', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000003AifhE09cZ2R.jpg' },
  { id: '59', name: '香港地区榜', bangid: '59', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000003eD1GJ0ALk5X.jpg' },
  { id: '16', name: '韩国榜', bangid: '16', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000002XZzBK2MSSU8.jpg' },
  { id: '60', name: '抖音热歌榜', bangid: '60', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000001hgsNv0QfAXv.jpg' },
  { id: '29', name: '影视金曲榜', bangid: '29', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000002ga0xH0XStwr.jpg' },
  { id: '17', name: '日本榜', bangid: '17', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M0000031EFNo1HbDqq.jpg' },
  { id: '36', name: 'K歌金曲榜', bangid: '36', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M0000012uqZu0dhyMv.jpg' },
  { id: '61', name: '台湾地区榜', bangid: '61', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000001w6CKZ3eRVAa.jpg' },
  { id: '63', name: 'DJ舞曲榜', bangid: '63', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000002Nffh50T30L0.jpg' },
  { id: '64', name: '综艺新歌榜', bangid: '64', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000002YaQ6b207Fl1.jpg' },
  { id: '65', name: '国风热歌榜', bangid: '65', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000001QsCFf3pvEyg.jpg' },
  { id: '67', name: '听歌识曲榜', bangid: '67', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000000xxHg32YGjMI.jpg' },
  { id: '72', name: '动漫音乐榜', bangid: '72', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000000yKnVs4Bxbik.jpg' },
  { id: '73', name: '游戏音乐榜', bangid: '73', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000001xs5992hUvcs.jpg' },
  { id: '75', name: '有声榜', bangid: '75', pic: 'http://y.gtimg.cn/music/photo_new/T003R300x300M000001M59IU1bvwY1.jpg' },
]

const regExps = {
  periodList:
    /<i class="play_cover__btn c_tx_link js_icon_play" data-listkey=".+?" data-listname=".+?" data-tid=".+?" data-date=".+?" .+?<\/i>/g,
  period: /data-listname="(.+?)" data-tid=".*?\/(.+?)" data-date="(.+?)" .+?<\/i>/,
}

const filterBoardsData = (rawList: Array<{ id: number; topTitle: string; picUrl?: string }>): AnyListen_API.TopSongsItem[] => {
  const list: AnyListen_API.TopSongsItem[] = []
  for (const board of rawList) {
    // skip mv list
    if (board.id === 201) continue

    let title = board.topTitle
    if (title.startsWith('巅峰榜·')) title = title.substring(4)
    if (!title.endsWith('榜')) title += '榜'

    list.push({
      id: String(board.id),
      name: title,
      pic: board.picUrl ?? '',
    })
  }
  return list
}
export const getBoards = async (): Promise<AnyListen_API.TopSongsItem[]> => {
  try {
    const response = await request<TopSongs>(
      'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&uin=0&needNewCode=1&platform=h5'
    )

    if (response.statusCode !== 200 || response.body.code !== 0 || !response.body.data?.topList) {
      throw new Error('tx topSongs getBoards failed')
    }

    return filterBoardsData(response.body.data.topList)
  } catch {
    return boardList
  }
}

export const getDates = async (_id: string): Promise<AnyListen_API.TagItem[]> => {
  return []
}

const periodUrl = 'https://c.y.qq.com/node/pc/wk_v15/top.html'
const periodInfoMap: Record<string, { name: string; bangid: string; period: string }> = {}
const getPeriods = async (bangid: string) => {
  const { body: html } = await request<string>(periodUrl)
  const result = html.match(regExps.periodList)
  if (!result) throw new Error('tx topSongs getPeriods failed')

  result.forEach((item) => {
    const periodResult = regExps.period.exec(item)
    if (!periodResult) return
    periodInfoMap[periodResult[2]] = {
      name: periodResult[1],
      bangid: periodResult[2],
      period: periodResult[3],
    }
  })

  return periodInfoMap[bangid]?.period
}

const listDetailRequest = async (id: number, period: string | undefined, limit: number) => {
  return request<TopSongsDetail>('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    method: 'POST',
    json: {
      toplist: {
        module: 'musicToplist.ToplistInfoServer',
        method: 'GetDetail',
        param: {
          topid: id,
          num: limit,
          period,
        },
      },
      comm: {
        uin: 0,
        format: 'json',
        ct: 20,
        cv: 1859,
      },
    },
  })
}
export const getList = async (
  id: string,
  date: string,
  page: number,
  limit = 300,
  retryNum = 0
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.TopSongsDetailInfo
}> => {
  if (++retryNum > 3) throw new Error('tx topSongs getList retry max num')
  const topidInt = parseInt(id)
  if (Number.isNaN(topidInt)) throw new Error('tx topSongs invalid id')

  const period = date || periodInfoMap[id]?.period || (await getPeriods(id))

  const { body, statusCode } = await listDetailRequest(topidInt, period, limit)

  if (statusCode !== 200 || body.code !== 0) return getList(id, date, page, limit, retryNum)

  const data = body.toplist?.data
  const rawList = data?.songInfoList ?? []
  const list = buildMusicList(rawList)
  const detail = data?.data

  return {
    list,
    total: rawList.length,
    limit,
    page,
    info: {
      name: decodeName(detail?.title || ''),
      pic: detail?.frontPicUrl || '',
      desc: decodeName(detail?.intro || '').replace(/<br\s*\/?>/g, '\n'),
      date: detail?.updateTime || '',
    },
  }
}
