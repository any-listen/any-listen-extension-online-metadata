import { request } from '@/shared/hostApi'
import { decodeName, formatPlayTime, sizeFormate } from '@/shared/utils'

import type { MusicDetail, PurpleDatum } from './types/musicDetail'

const pageInfo = {
  maxRetryNum: 3,
  maxBatchSize: 100,
}

interface HashItem {
  hash: string
}

interface MusicDetailTask {
  area_code: string
  show_privilege: number
  show_album_info: string
  is_publish: string
  appid: number
  clientver: number
  mid: string
  dfid: string
  clienttime: number
  key: string
  fields: string
  data: HashItem[]
}

const deDuplication = (hashes: HashItem[]): HashItem[] => {
  const ids = new Set<string>()
  return hashes.filter((item) => {
    if (!item.hash || ids.has(item.hash)) return false
    ids.add(item.hash)
    return true
  })
}

const createQuality = (size: string, hash: string) => {
  const sizeInt = Number.parseInt(size, 10)
  if (!hash || !Number.isFinite(sizeInt) || sizeInt <= 0) return null

  return {
    sizeStr: sizeFormate(sizeInt),
    hash,
  }
}

const filterData2 = (rawList: Array<PurpleDatum | null | undefined>): AnyListen_API.MusicInfoOnline[] => {
  const ids = new Set<string>()
  const list: AnyListen_API.MusicInfoOnline[] = []

  rawList.forEach((item) => {
    if (!item) return
    const audioId = String(item.audio_info.audio_id)
    if (!audioId || ids.has(audioId)) return
    ids.add(audioId)

    const qualitys: AnyListen_API.MusicInfoOnline['meta']['qualitys'] = {}

    const quality128 = createQuality(item.audio_info.filesize, item.audio_info.hash)
    if (quality128) qualitys['128k'] = quality128

    const quality320 = createQuality(item.audio_info.filesize_320, item.audio_info.hash_320)
    if (quality320) qualitys['320k'] = quality320

    const qualityFlac = createQuality(item.audio_info.filesize_flac, item.audio_info.hash_flac)
    if (qualityFlac) qualitys.flac = qualityFlac

    const qualityHiRes = createQuality(item.audio_info.filesize_high, item.audio_info.hash_high)
    if (qualityHiRes) qualitys.flac24bit = qualityHiRes

    const timelength = Number.parseInt(item.audio_info.timelength, 10)
    const intervalSecond = Number.isFinite(timelength) ? timelength / 1000 : 0

    list.push({
      id: audioId,
      name: decodeName(item.songname || item.ori_audio_name || ''),
      singer: decodeName(item.author_name || ''),
      interval: formatPlayTime(intervalSecond),
      isLocal: false,
      meta: {
        albumName: decodeName(item.album_info.album_name || ''),
        albumId: Number(item.album_info.album_id || 0),
        source: 'kg',
        musicId: audioId,
        qualitys,
        createTime: 0,
        posTime: 0,
        updateTime: 0,
        hash: item.audio_info.hash,
        _interval: intervalSecond,
        picUrl: null,
      },
    })
  })

  return list
}

const createTask = (hashes: HashItem[]): MusicDetailTask[] => {
  const commonData = {
    area_code: '1',
    show_privilege: 1,
    show_album_info: '1',
    is_publish: '',
    appid: 1005,
    clientver: 11451,
    mid: '1',
    dfid: '-',
    clienttime: Date.now(),
    key: 'OIlwieks28dk2k092lksi2UIkp',
    fields: 'album_info,author_name,audio_info,ori_audio_name,base,songname',
  }

  const list = [...hashes]
  const tasks: MusicDetailTask[] = []
  while (list.length) {
    tasks.push({
      ...commonData,
      data: list.splice(0, pageInfo.maxBatchSize),
    })
  }
  return tasks
}

const requestData = async (task: MusicDetailTask): Promise<Array<PurpleDatum | null>> => {
  const { body, statusCode } = await request<MusicDetail>('http://gateway.kugou.com/v2/album_audio/audio', {
    method: 'POST',
    json: task as unknown as Record<string, unknown>,
    headers: {
      'KG-THash': '13a3164',
      'KG-RC': '1',
      'KG-Fake': '0',
      'KG-RF': '00869891',
      'User-Agent': 'Android712-AndroidPhone-11451-376-0-FeeCacheUpdate-wifi',
      'x-router': 'kmr.service.kugou.com',
    },
  })

  const bodyData = body as MusicDetail & { err_code?: number }
  const errorCode = bodyData.error_code ?? bodyData.errcode ?? bodyData.err_code ?? -1
  if (statusCode !== 200 || errorCode !== 0 || !Array.isArray(body.data)) throw new Error('kg getMusicInfos failed')

  return body.data.map((item) => {
    if (!Array.isArray(item)) return null
    return (item[0] as PurpleDatum | undefined) ?? null
  })
}

export const getMusicInfos = async (hashes: HashItem[]): Promise<AnyListen_API.MusicInfoOnline[]> => {
  const targetHashes = deDuplication(hashes)
  if (!targetHashes.length) return []

  const taskResults = await Promise.all(createTask(targetHashes).map(async (task) => requestData(task)))
  return filterData2(taskResults.flat())
}

export const getMusicInfoRaw = async (hash: string) => {
  return Promise.all(createTask([{ hash }])).then((data) => data.flat()[0])
}

export const getMusicInfo = async (hash: string): Promise<AnyListen_API.MusicInfoOnline> => {
  return getMusicInfos([{ hash }]).then((data) => data[0])
}

export const getMusicInfosByList = async (list: HashItem[]): Promise<AnyListen_API.MusicInfoOnline[]> => {
  return getMusicInfos(list.map((item) => ({ hash: item.hash })))
}
