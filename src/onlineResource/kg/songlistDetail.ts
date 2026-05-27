import { console, request } from '@/shared/hostApi'
import { dateFormat, formatPlayCount } from '@/shared/utils'

import { getMusicInfos } from './musicDetail'
import type {
  HashItem,
  SonglistDetailByIdResponse,
  SonglistDetailChainTransferResponse,
  SonglistDetailCodeResponse,
  SonglistDetailDecodeGcidResponse,
  SonglistDetailShareInfoV2,
} from './types/songlistDetail'
import type { SonglistDetailV2 } from './types/songlistDetailV2'
import { signatureParams } from './utils'

const pageInfo = {
  limitSong: 10000,
}

const regExps = {
  listData: /global\.data = (\[.+\]);/,
  listInfo: /global = {[\s\S]+?name: "(.+)"[\s\S]+?pic: "(.+)"[\s\S]+?};/,
  listDetailLink: /^.+\/(\d+)\.html(?:\?.*|&.*$|#.*$|$)/,
}

interface SonglistDetailParsed {
  hashes: HashItem[]
  info: AnyListen_API.SongListDetailInfo
}

const getSongListDetailUrl = (id: string) => {
  return `http://www2.kugou.kugou.com/yueku/v9/special/single/${id}-5-9999.html`
}

const parseHtmlDesc = (html: string): string | null => {
  const prefix = '<div class="pc_specail_text pc_singer_tab_content" id="specailIntroduceWrap">'
  let index = html.indexOf(prefix)
  if (index < 0) return null

  const afterStr = html.substring(index + prefix.length)
  index = afterStr.indexOf('</div>')
  if (index < 0) return null

  return afterStr.substring(0, index)
}

const parseDetailHtml = (html: string): SonglistDetailParsed | null => {
  const listData = regExps.listData.exec(html)
  if (!listData) return null

  let hashes: HashItem[]
  try {
    hashes = JSON.parse(listData[1]) as HashItem[]
  } catch {
    return null
  }

  const listInfo = regExps.listInfo.exec(html)
  const desc = parseHtmlDesc(html)

  return {
    hashes,
    info: {
      name: listInfo?.[1] ?? '',
      img: listInfo?.[2] ?? '',
      desc: desc ?? '',
      author: '',
      play_count: '',
    },
  }
}

const getListDetailBySpecialId = async (
  id: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  const { body, statusCode } = await request<string>(getSongListDetailUrl(id))
  if (statusCode !== 200) throw new Error('kg getListDetailBySpecialId failed')

  const parsed = parseDetailHtml(body)
  if (!parsed) throw new Error('kg getListDetailBySpecialId parse failed')

  const list = await getMusicInfos(parsed.hashes)

  return {
    list,
    page: 1,
    limit: pageInfo.limitSong,
    total: list.length,
    info: parsed.info,
  }
}

const getErrorCode = (body: { error_code?: number; errcode?: number; err_code?: number }) => {
  return body.error_code ?? body.errcode ?? body.err_code ?? 0
}

const requestWithRetry = async <T extends { error_code?: number; errcode?: number; err_code?: number }>(
  url: string,
  options?: {
    method?: 'GET' | 'POST'
    headers?: Record<string, string>
    json?: Record<string, unknown>
    maxRedirect?: number
  }
): Promise<T> => {
  const { body, statusCode } = await request<T>(url, options)
  console.log(url)
  console.log(body)
  if (statusCode !== 200 || getErrorCode(body) !== 0) throw new Error(`kg songlistDetail request failed: ${url}`)
  return body
}

const decodeGcid = async (gcid: string): Promise<string> => {
  const params = 'dfid=-&appid=1005&mid=0&clientver=20109&clienttime=640612895&uuid=-'
  const payload = {
    ret_info: 1,
    data: [{ id: gcid, id_type: 2 }],
  }
  const signature = await signatureParams(params, 'android', JSON.stringify(payload))

  const body = await requestWithRetry<SonglistDetailDecodeGcidResponse>(
    `https://t.kugou.com/v1/songlist/batch_decode?${params}&signature=${signature}`,
    {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 10; HUAWEI HMA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36',
        Referer: 'https://m.kugou.com/',
      },
      json: payload as unknown as Record<string, unknown>,
    }
  )
  const collectionId = body.data.list?.[0]?.global_collection_id
  if (!collectionId) throw new Error('kg decodeGcid failed')
  return collectionId
}

const createGetListDetail2Task = async (id: string, total: number): Promise<HashItem[]> => {
  const tasks: Array<Promise<HashItem[]>> = []
  let page = 0

  while (total > 0) {
    const limit = total > 300 ? 300 : total
    total -= limit
    page += 1
    const params =
      `appid=1058&global_specialid=${id}&specialid=0&plat=0&version=8000&page=${page}` +
      `&pagesize=${limit}&srcappid=2919&clientver=20000&clienttime=1586163263991&mid=1586163263991&uuid=1586163263991&dfid=-`
    const signature = await signatureParams(params, 'web')

    tasks.push(
      requestWithRetry<SonglistDetailV2>(`https://mobiles.kugou.com/api/v5/special/song_v2?${params}&signature=${signature}`, {
        headers: {
          mid: '1586163263991',
          Referer: 'https://m3ws.kugou.com/share/index.php',
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
          dfid: '-',
          clienttime: '1586163263991',
        },
      }).then((resp) => resp.data.info ?? [])
    )
  }

  return Promise.all(tasks).then((datas) => datas.flat())
}

const getUserListDetail2 = async (
  globalCollectionId: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  if (globalCollectionId.length > 1000) throw new Error('kg getUserListDetail2 failed')

  const infoParams =
    `appid=1058&specialid=0&global_specialid=${globalCollectionId}` +
    '&format=jsonp&srcappid=2919&clientver=20000&clienttime=1586163242519&mid=1586163242519&uuid=1586163242519&dfid=-'
  const infoSignature = await signatureParams(infoParams, 'web')

  const { data: info } = await requestWithRetry<SonglistDetailShareInfoV2>(
    `https://mobiles.kugou.com/api/v5/special/info_v2?${infoParams}&signature=${infoSignature}`,
    {
      headers: {
        mid: '1586163242519',
        Referer: 'https://m3ws.kugou.com/share/index.php',
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        dfid: '-',
        clienttime: '1586163242519',
      },
    }
  )

  const hashList = await createGetListDetail2Task(globalCollectionId, info.songcount)
  const list = await getMusicInfos(hashList)

  return {
    list,
    page,
    limit: pageInfo.limitSong,
    total: list.length,
    info: {
      name: info.specialname,
      img: info.imgurl?.replace('{size}', '240') ?? '',
      desc: info.intro,
      author: info.nickname,
      date: info.publishtime ? dateFormat(info.publishtime, 'Y-M-D') : '',
      play_count: formatPlayCount(info.playcount),
    },
  }
}

const getListInfoByChain = async (chain: string) => {
  const { body, statusCode } = await request<string>(`https://m.kugou.com/share/?chain=${chain}&id=${chain}`, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    },
  })
  if (statusCode !== 200) throw new Error('kg getListInfoByChain failed')

  const result = /var\sphpParam\s=\s({.+?});/.exec(body)
  if (!result?.[1]) throw new Error('kg getListInfoByChain failed')
  return JSON.parse(result[1]) as {
    specialname?: string
    imgurl?: string
    nickname?: string
  }
}

const getUserListDetailByPcChain = async (chain: string): Promise<AnyListen_API.MusicInfoOnline[]> => {
  const { body, statusCode } = await request<string>(`http://www.kugou.com/share/${chain}.html`, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    },
  })
  if (statusCode !== 200) throw new Error('kg getUserListDetailByPcChain failed')

  const result = /var\sdataFromSmarty\s=\s(\[.+?\])/.exec(body)
  if (!result?.[1]) throw new Error('kg getUserListDetailByPcChain failed')

  const hashList = JSON.parse(result[1]) as HashItem[]
  return getMusicInfos(hashList)
}

const getUserListDetail5 = async (
  chain: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  const [listInfo, list] = await Promise.all([getListInfoByChain(chain), getUserListDetailByPcChain(chain)])
  return {
    list,
    page,
    limit: pageInfo.limitSong,
    total: list.length,
    info: {
      name: listInfo.specialname ?? '',
      img: listInfo.imgurl ? listInfo.imgurl.replace('{size}', '240') : '',
      desc: '',
      author: listInfo.nickname ?? '',
      play_count: '',
    },
  }
}

const getUserListDetailById = async (
  id: string | number,
  page: number,
  limit: number
): Promise<AnyListen_API.MusicInfoOnline[]> => {
  const params = `srcappid=2919&clientver=20000&appid=1058&type=0&module=playlist&page=${page}&pagesize=${limit}&specialid=${String(id)}`
  const signature = await signatureParams(params, 'web')

  const resp = await requestWithRetry<SonglistDetailByIdResponse>(
    `https://pubsongscdn.kugou.com/v2/get_other_list_file?${params}&signature=${signature}`,
    {
      headers: {
        Referer: 'https://m3ws.kugou.com/share/index.php',
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        dfid: '-',
      },
    }
  )

  const rawResp: unknown = resp
  const info =
    rawResp && typeof rawResp === 'object' && 'info' in rawResp && Array.isArray((rawResp as { info?: unknown }).info)
      ? ((rawResp as { info: HashItem[] }).info ?? [])
      : []

  return getMusicInfos(info)
}

const getUserListDetail4 = async (
  songInfo: SonglistDetailChainTransferResponse['info'],
  chain: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  const limit = 100
  const songInfoId = songInfo.id
  const [listInfo, list] = await Promise.all([
    getListInfoByChain(chain),
    typeof songInfoId === 'string' || typeof songInfoId === 'number'
      ? getUserListDetailById(songInfoId, page, limit)
      : Promise.resolve<AnyListen_API.MusicInfoOnline[]>([]),
  ])

  return {
    list,
    page,
    limit,
    total: list.length,
    info: {
      name: listInfo.specialname ?? '',
      img: listInfo.imgurl ? listInfo.imgurl.replace('{size}', '240') : '',
      desc: '',
      author: listInfo.nickname ?? '',
      play_count: '',
    },
  }
}

const getUserListDetail3 = async (
  chain: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  const { info: songInfo } = await requestWithRetry<SonglistDetailChainTransferResponse>(
    `http://m.kugou.com/schain/transfer?pagesize=${pageInfo.limitSong}&chain=${chain}&su=1&page=${page}&n=0.7928855356604456`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
      },
    }
  )

  if (!songInfo.list?.length) {
    if (songInfo.global_collection_id) return getUserListDetail2(songInfo.global_collection_id, page)
    return getUserListDetail4(songInfo, chain, page).catch(async () => getUserListDetail5(chain, page))
  }

  const list = await getMusicInfos(songInfo.list)
  return {
    list,
    page,
    limit: pageInfo.limitSong,
    total: list.length,
    info: {
      name: songInfo.info?.name ?? '未命名歌单',
      img: songInfo.info?.img ?? '',
      desc: '',
      author: songInfo.info?.username ?? '',
      play_count: '',
    },
  }
}

const getUserListDetailByCode = async (
  id: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  const body = await requestWithRetry<SonglistDetailCodeResponse>('http://t.kugou.com/command/', {
    method: 'POST',
    headers: {
      'KG-RC': '1',
      'KG-THash': 'network_super_call.cpp:3676261689:379',
      'User-Agent': '',
    },
    json: {
      appid: 1001,
      clientver: 9020,
      mid: '21511157a05844bd085308bc76ef3343',
      clienttime: 640612895,
      key: '36164c4015e704673c588ee202b9ecb8',
      data: id,
    },
  })
  const info = body.data.info
  if (info.type === 2 && !info.global_collection_id && info.id) {
    return getListDetailBySpecialId(String(info.id), page)
  }

  if (info.global_collection_id) {
    return getUserListDetail2(info.global_collection_id, page)
  }

  const list = await getMusicInfos(body.data.list ?? [])
  return {
    list,
    page,
    limit: Number(info.count ?? pageInfo.limitSong),
    total: list.length,
    info: {
      name: info.name ?? '',
      img: info.img_size ? info.img_size.replace('{size}', '240') : (info.img ?? ''),
      desc: '',
      author: info.username ?? '',
      play_count: '',
    },
  }
}

const getUserListDetail = async (
  link: string,
  page: number
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  let rawLink = link
  if (rawLink.includes('#')) rawLink = rawLink.replace(/#.*$/, '')

  if (rawLink.includes('global_collection_id')) {
    const globalCollectionId = rawLink.replace(/^.*?global_collection_id=(\w+)(?:&.*$|#.*$|$)/, '$1')
    return getUserListDetail2(globalCollectionId, page)
  }

  const gcidInLink = /gcid_\w+/.exec(rawLink)?.[0]
  if (gcidInLink) {
    const globalCollectionId = await decodeGcid(gcidInLink)
    return getUserListDetail2(globalCollectionId, page)
  }

  if (rawLink.includes('chain=')) {
    const chain = rawLink.replace(/^.*?chain=(\w+)(?:&.*$|#.*$|$)/, '$1')
    return getUserListDetail3(chain, page)
  }
  if (rawLink.includes('.html')) {
    if (rawLink.includes('zlist.html')) {
      rawLink = rawLink.replace(/^(.*)zlist\.html/, 'https://m3ws.kugou.com/zlist/list')
      if (rawLink.includes('pagesize')) {
        rawLink = rawLink.replace('pagesize=30', `pagesize=${pageInfo.limitSong}`).replace('page=1', `page=${page}`)
      } else {
        rawLink += `&pagesize=${pageInfo.limitSong}&page=${page}`
      }
    } else if (!rawLink.includes('song.html')) {
      return getUserListDetail3(rawLink.replace(/.+\/(\w+).html(?:\?.*|&.*$|#.*$|$)/, '$1'), page)
    }
  }

  const {
    body,
    statusCode,
    headers: { location },
  } = await request<string>(rawLink, {
    maxRedirect: 0,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
      Referer: rawLink,
    },
  })

  if ((statusCode ?? 500) >= 400) throw new Error('kg getUserListDetail failed')

  const nextLocation = Array.isArray(location) ? location[0] : location
  if (nextLocation) return getUserListDetail(nextLocation, page)

  let globalCollectionId = /"global_collection_id":"(\w+)"/.exec(body)?.[1]
  if (!globalCollectionId) {
    let gcid = /"encode_gic":"(\w+)"/.exec(body)?.[1]
    gcid ||= /"encode_src_gid":"(\w+)"/.exec(body)?.[1]
    if (gcid) globalCollectionId = await decodeGcid(gcid)
  }

  if (globalCollectionId) return getUserListDetail2(globalCollectionId, page)
  throw new Error('kg getUserListDetail failed')
}

export const getListDetail = async (
  id: string,
  page: number,
  _limit = pageInfo.limitSong
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  let rawId = String(id)

  if (rawId.includes('special/single/')) {
    rawId = rawId.replace(regExps.listDetailLink, '$1')
    return getListDetailBySpecialId(rawId, page)
  }

  if (rawId.startsWith('id_')) {
    rawId = rawId.replace('id_', '')
    return getListDetailBySpecialId(rawId, page)
  }

  if (/^\d+$/.test(rawId)) {
    return getUserListDetailByCode(rawId, page)
  }

  if (/^https?:/.test(rawId)) {
    const linkId = regExps.listDetailLink.exec(rawId)?.[1]
    if (linkId) return getListDetailBySpecialId(linkId, page)

    return getUserListDetail(rawId, page)
  }

  return getListDetailBySpecialId(rawId, page)
}
