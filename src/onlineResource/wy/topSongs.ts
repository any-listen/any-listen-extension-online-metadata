import { dateFormat } from '@/shared/utils'

import type { TopSongs } from './types/topSongs'
import type { TopSongsDetail } from './types/topSongsDetail'
import { buildMusicList2, weapiRequest } from './utils'

const boardList = [
  {
    id: '19723756',
    name: '飙升榜',
    bangid: '19723756',
    pic: 'https://p1.music.126.net/rIi7Qzy2i2Y_1QD7cd0MYA==/109951170048506929.jpg',
  },
  {
    id: '3779629',
    name: '新歌榜',
    bangid: '3779629',
    pic: 'https://p1.music.126.net/5guhqPBTcIrrhLBotgaT6w==/109951170048511751.jpg',
  },
  {
    id: '2884035',
    name: '原创榜',
    bangid: '2884035',
    pic: 'https://p1.music.126.net/BaP9nrocNTL3gGThysv4eQ==/109951170091896587.jpg',
  },
  {
    id: '3778678',
    name: '热歌榜',
    bangid: '3778678',
    pic: 'https://p1.music.126.net/0SUEG8yDACfx0Bw2MYFv4Q==/109951170048519512.jpg',
  },
  {
    id: '991319590',
    name: '网易云中文说唱榜',
    bangid: '991319590',
    pic: 'https://p1.music.126.net/GgHbgDfGXHpE2YTchU7IvA==/109951171510498108.jpg',
  },
  {
    id: '71384707',
    name: '网易云古典榜',
    bangid: '71384707',
    pic: 'https://p1.music.126.net/urByD_AmfBDBrs7fA9-O8A==/109951167976973225.jpg',
  },
  {
    id: '1978921795',
    name: '网易云电音榜',
    bangid: '1978921795',
    pic: 'https://p1.music.126.net/hXGObvXfsGtFjFvRhOYAkA==/109951170091888741.jpg',
  },
  {
    id: '14028249541',
    name: '网易云全球说唱榜',
    bangid: '14028249541',
    pic: 'https://p1.music.126.net/0hhFjP6WyIjHYDXKW5E7BA==/109951171535150782.jpg',
  },
  {
    id: '13372522766',
    name: '潮流风向榜',
    bangid: '13372522766',
    pic: 'https://p1.music.126.net/dIKA5e7jCncz2Br1Toxgaw==/109951170621574552.jpg',
  },
  {
    id: '12911403728',
    name: '音乐合伙人推荐榜',
    bangid: '12911403728',
    pic: 'https://p1.music.126.net/s6ITpmGjKbyDpi7DPkqd2w==/109951170187827373.jpg',
  },
  {
    id: '12911589513',
    name: '音乐合伙人热歌榜',
    bangid: '12911589513',
    pic: 'https://p1.music.126.net/RgYxQmB-ZUjkMRo2N1jWnQ==/109951170187823494.jpg',
  },
  {
    id: '12911619970',
    name: '音乐合伙人留名榜',
    bangid: '12911619970',
    pic: 'https://p1.music.126.net/aJJzGIxhkVaD7dX0XBNUnw==/109951170187831145.jpg',
  },
  {
    id: '12911379734',
    name: '音乐合伙人高分新歌榜',
    bangid: '12911379734',
    pic: 'https://p1.music.126.net/bfk15bvanhdPFU7yjPFgWA==/109951170187832038.jpg',
  },
  {
    id: '12768855486',
    name: '音乐合伙人高分榜',
    bangid: '12768855486',
    pic: 'https://p1.music.126.net/fPP5T0Z8Ac15qNvRTcHa6g==/109951170074028970.jpg',
  },
  {
    id: '5453912201',
    name: '黑胶VIP爱听榜',
    bangid: '5453912201',
    pic: 'https://p1.music.126.net/qo6-o9n5AhMjNyejev38-A==/109951169743111905.jpg',
  },
  {
    id: '71385702',
    name: '网易云ACG榜',
    bangid: '71385702',
    pic: 'https://p1.music.126.net/na1kEeCS1iZEkzOrs9r_9g==/109951167976973667.jpg',
  },
  {
    id: '745956260',
    name: '网易云韩语榜',
    bangid: '745956260',
    pic: 'https://p1.music.126.net/5oN9YaFznwNGXkmi8i2Ytw==/109951167430864741.jpg',
  },
  {
    id: '180106',
    name: 'UK排行榜周榜',
    bangid: '180106',
    pic: 'https://p1.music.126.net/fhAqiflLy3eU-ldmBQByrg==/109951165613082765.jpg',
  },
  {
    id: '60198',
    name: '美国Billboard榜',
    bangid: '60198',
    pic: 'https://p1.music.126.net/rwRsVIJHQ68gglhA6TNEYA==/109951165611413732.jpg',
  },
  {
    id: '3812895',
    name: 'Beatport全球电子舞曲榜',
    bangid: '3812895',
    pic: 'https://p1.music.126.net/oT-RHuPBJiD7WMoU7WG5Rw==/109951166093489621.jpg',
  },
  {
    id: '21845217',
    name: 'KTV唛榜',
    bangid: '21845217',
    pic: 'https://p1.music.126.net/5wDP78s43ydVTKt62C8OjQ==/109951165613100063.jpg',
  },
  {
    id: '60131',
    name: '日本Oricon榜',
    bangid: '60131',
    pic: 'https://p1.music.126.net/aXUPgImt8hhf4cMUZEjP4g==/109951165611417794.jpg',
  },
  {
    id: '2809513713',
    name: '网易云欧美热歌榜',
    bangid: '2809513713',
    pic: 'https://p1.music.126.net/70_EO_Dc7NT_hhfvsapzcQ==/109951167430862162.jpg',
  },
  {
    id: '2809577409',
    name: '网易云欧美新歌榜',
    bangid: '2809577409',
    pic: 'https://p1.music.126.net/0lPWpI9Ejn1OiW2LSbg-qw==/109951167430863224.jpg',
  },
  {
    id: '27135204',
    name: '法国 NRJ Vos Hits 周榜',
    bangid: '27135204',
    pic: 'https://p2.music.126.net/-fyzrPWd06FfWl_0JDAxMQ==/109951165613108584.jpg',
  },
  {
    id: '3001835560',
    name: '网易云ACG动画榜',
    bangid: '3001835560',
    pic: 'https://p2.music.126.net/SkGlKQ6acixthb77VlD9eQ==/109951164432300406.jpg',
  },
  {
    id: '3001795926',
    name: '网易云ACG游戏榜',
    bangid: '3001795926',
    pic: 'https://p2.music.126.net/hivOOHMwEmnn9s_6rgZwEQ==/109951164432303700.jpg',
  },
  {
    id: '3001890046',
    name: '网易云ACG VOCALOID榜',
    bangid: '3001890046',
    pic: 'https://p2.music.126.net/Ag7RyRCYiINcd9EtRXf6xA==/109951164432303690.jpg',
  },
  {
    id: '5059644681',
    name: '网易云日语榜',
    bangid: '5059644681',
    pic: 'https://p2.music.126.net/YFBFNI2F-4BveUpv6FKFuw==/109951167430864069.jpg',
  },
  {
    id: '5059633707',
    name: '网易云摇滚榜',
    bangid: '5059633707',
    pic: 'https://p2.music.126.net/LjkX2hktgFD1NXc3W6w0sA==/109951170048522513.jpg',
  },
  {
    id: '5059642708',
    name: '网易云国风榜',
    bangid: '5059642708',
    pic: 'https://p2.music.126.net/kTJC5OBhg8I477X_ZmXyDQ==/109951168539740982.jpg',
  },
  {
    id: '5338990334',
    name: '潜力爆款榜',
    bangid: '5338990334',
    pic: 'https://p2.music.126.net/Mi4QPklg1mtbWAfq74tEqQ==/109951165498334721.jpg',
  },
  {
    id: '5059661515',
    name: '网易云民谣榜',
    bangid: '5059661515',
    pic: 'https://p2.music.126.net/Xe9qLTAqtBAWX_hPgFHMyw==/109951170048510929.jpg',
  },
  {
    id: '6688069460',
    name: '听歌识曲榜',
    bangid: '6688069460',
    pic: 'https://p2.music.126.net/wJVUAiUuykKk7yGbQxDBug==/109951167430857712.jpg',
  },
  {
    id: '6723173524',
    name: '网络热歌榜',
    bangid: '6723173524',
    pic: 'https://p2.music.126.net/_kSxOPqQ5J5etC5DKTFwNA==/109951170048519530.jpg',
  },
  {
    id: '6732051320',
    name: '俄语榜',
    bangid: '6732051320',
    pic: 'https://p2.music.126.net/HbJ0BK5doY4I4pEMY6-FQw==/109951167430852698.jpg',
  },
  {
    id: '6732014811',
    name: '越南语榜',
    bangid: '6732014811',
    pic: 'https://p2.music.126.net/N-Y5maLGWgrowt3TE6RtSg==/109951167430857045.jpg',
  },
  {
    id: '6886768100',
    name: '中文慢摇DJ榜',
    bangid: '6886768100',
    pic: 'https://p2.music.126.net/w_01BfDU012ojxnzLO6tYw==/109951167977358686.jpg',
  },
  {
    id: '6939992364',
    name: '俄罗斯top hit流行音乐榜',
    bangid: '6939992364',
    pic: 'https://p2.music.126.net/KLVO8PxVZzOoLdWQQNyprA==/109951166327316568.jpg',
  },
  {
    id: '7095271308',
    name: '泰语榜',
    bangid: '7095271308',
    pic: 'https://p2.music.126.net/4W0WBHBgwYlYfRniuyL47A==/109951167430843284.jpg',
  },
  {
    id: '7356827205',
    name: 'BEAT排行榜',
    bangid: '7356827205',
    pic: 'https://p2.music.126.net/yhzlQJCJ9NcT4MvJBG_HgQ==/109951167977014958.jpg',
  },
  {
    id: '7325478166',
    name: '星云榜VOL.31 翁杰新专来袭，愿我们拥有广阔的天地！',
    bangid: '7325478166',
    pic: 'https://p2.music.126.net/m9HWYdcz9xH-7SSito3-3A==/109951172864859483.jpg',
  },
  {
    id: '7603212484',
    name: 'LOOK直播歌曲榜',
    bangid: '7603212484',
    pic: 'https://p2.music.126.net/u-RQC-LyY0aoeseRumJ14A==/109951167977730469.jpg',
  },
  {
    id: '7775163417',
    name: '赏音榜',
    bangid: '7775163417',
    pic: 'https://p2.music.126.net/m9hQzC-d5wefBipedNPaHg==/109951168178601971.jpg',
  },
  {
    id: '7785123708',
    name: '黑胶VIP新歌榜',
    bangid: '7785123708',
    pic: 'https://p2.music.126.net/vjitpkT9nXBCth6tvdDMWg==/109951169743115266.jpg',
  },
  {
    id: '7785066739',
    name: '黑胶VIP热歌榜',
    bangid: '7785066739',
    pic: 'https://p2.music.126.net/Ay3mLgQ9weG_c8JjYrD-Bw==/109951169743106495.jpg',
  },
  {
    id: '7785091694',
    name: '黑胶VIP爱搜榜',
    bangid: '7785091694',
    pic: 'https://p2.music.126.net/R7DtZqNraesnsiaIKvzTHA==/109951169743112799.jpg',
  },
  {
    id: '8246775932',
    name: '实时热度榜',
    bangid: '8246775932',
    pic: 'https://p2.music.126.net/U7ZbdpWzRdmZVr6Khn_4ag==/109951168673982478.jpg',
  },
  {
    id: '8537588450',
    name: '喜力®星电音派对潮音榜',
    bangid: '8537588450',
    pic: 'https://p2.music.126.net/HVu2hGYvzN5XBuvFc_4Bgg==/109951168730309120.jpg',
  },
  {
    id: '8661209031',
    name: '乐夏榜',
    bangid: '8661209031',
    pic: 'https://p2.music.126.net/RlStCmE97y0xYFk7rS3Zww==/109951168864907822.jpg',
  },
  {
    id: '8703179781',
    name: '特斯拉车友爱听榜',
    bangid: '8703179781',
    pic: 'https://p2.music.126.net/UL8dhobSa3TR6Wd1JmWe_g==/109951168924385363.jpg',
  },
  {
    id: '8703052295',
    name: '理想车友爱听榜',
    bangid: '8703052295',
    pic: 'https://p2.music.126.net/U--PWdWupY1ER5cVSjr1jQ==/109951168928365496.jpg',
  },
  {
    id: '8702582160',
    name: '比亚迪车友爱听榜',
    bangid: '8702582160',
    pic: 'https://p2.music.126.net/S1OG-OLTaofa3HfrHW48kA==/109951168924393585.jpg',
  },
  {
    id: '8703220480',
    name: '蔚来车友爱听榜',
    bangid: '8703220480',
    pic: 'https://p2.music.126.net/r9kBQNsOro1EAB82Ol51WQ==/109951168924380971.jpg',
  },
  {
    id: '8702982391',
    name: '极氪车友爱听榜',
    bangid: '8702982391',
    pic: 'https://p2.music.126.net/Cu0RXoKewSPM9Gyc7Cp8jw==/109951168924391596.jpg',
  },
  {
    id: '8532443277',
    name: '蛋仔派对听歌榜',
    bangid: '8532443277',
    pic: 'https://p2.music.126.net/TMb0be5QLMZKOFeuOKT4tg==/109951168717283910.jpg',
  },
  {
    id: '9651277674',
    name: 'AI歌曲榜',
    bangid: '9651277674',
    pic: 'https://p2.music.126.net/M0m6GeZ1Y8Osz9jqxaW8Wg==/109951169462048035.jpg',
  },
  {
    id: '10131772880',
    name: '昊铂车友爱听榜',
    bangid: '10131772880',
    pic: 'https://p2.music.126.net/EL7H4rkKejZY7Uv54EFNXg==/109951169655010112.jpg',
  },
  {
    id: '10162841534',
    name: '埃安车友爱听榜',
    bangid: '10162841534',
    pic: 'https://p2.music.126.net/FcP1U6Bck0wPKqd0XgBwSQ==/109951169679731241.jpg',
  },
  {
    id: '12225155968',
    name: '欧美R&B榜',
    bangid: '12225155968',
    pic: 'https://p2.music.126.net/0E6MzYzyA5uvQ4CSoIG2mw==/109951169739660034.jpg',
  },
  {
    id: '12344472377',
    name: '黑胶VIP限免榜',
    bangid: '12344472377',
    pic: 'https://p2.music.126.net/WXCSf4ZNcDCdOTY5ixm3Bg==/109951169809318325.jpg',
  },
  {
    id: '12717025277',
    name: '吉利车友爱听榜',
    bangid: '12717025277',
    pic: 'https://p2.music.126.net/XVmZb3JSyrwMgqu9WVz61A==/109951170037568570.jpg',
  },
]

const filterBoardsData = (rawList: TopSongs['list']): AnyListen_API.TopSongsItem[] => {
  return rawList.map((board) => ({
    id: String(board.id),
    name: board.name,
    pic: board.coverImgUrl,
  }))
}

export const getBoards = async (): Promise<AnyListen_API.TopSongsItem[]> => {
  try {
    const response = await weapiRequest<TopSongs>('https://music.163.com/weapi/toplist', {})
    if (response.statusCode !== 200 || response.body.code !== 200 || !response.body.list) {
      throw new Error('wy topSongs getBoards failed')
    }
    return filterBoardsData(response.body.list)
  } catch {
    return boardList
  }
}

export const getDates = async (_id: string): Promise<AnyListen_API.TagItem[]> => {
  return []
}

export const getList = async (
  id: string,
  date: string,
  page: number,
  limit = 100000
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.TopSongsDetailInfo
}> => {
  const { body, statusCode } = await weapiRequest<TopSongsDetail>('https://music.163.com/weapi/v3/playlist/detail', {
    id,
    n: 100000,
    p: 1,
  })

  if (statusCode !== 200 || body.code !== 200) throw new Error('wy topSongs getList failed')

  const list = buildMusicList2({ songs: body.playlist.tracks, privileges: body.privileges })

  return {
    list,
    total: body.playlist.trackCount,
    limit,
    page,
    info: {
      name: body.playlist.name ?? '',
      pic: body.playlist.coverImgUrl ?? '',
      desc: body.playlist.description ?? '',
      date: dateFormat(body.playlist.updateTime, 'Y-M-D'),
    },
  }
}
