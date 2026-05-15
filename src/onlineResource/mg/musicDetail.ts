import { request } from '@/shared/hostApi'

import type { MusicDetail, Resource } from './types/musicDetail'
import { buildMusicInfoList } from './utils'

const batchSize = 100
const detailUrl = 'https://c.musicapp.migu.cn/MIGUM2.0/v1.0/content/resourceinfo.do?resourceType=2'

const createGetMusicInfosTask = (ids: string[]): string[][] => {
  const list = [...ids]
  const tasks: string[][] = []

  while (list.length) {
    tasks.push(list.splice(0, batchSize))
  }

  return tasks
}

const requestMusicInfoBatch = async (ids: string[]): Promise<Resource[]> => {
  const { body, statusCode } = await request<MusicDetail & { returnCode?: string }>(detailUrl, {
    method: 'POST',
    form: {
      resourceId: ids.join('|'),
    },
  })

  const code = body.code ?? body.returnCode
  if (statusCode !== 200 || code !== '000000') throw new Error('mg getMusicInfos failed')
  return body.resource ?? []
}

export const getMusicInfos = async (songIds: string[]): Promise<AnyListen_API.MusicInfoOnline[]> => {
  if (!songIds.length) return []

  const tasks = createGetMusicInfosTask(songIds)
  const resources = await Promise.all(tasks.map(async (task) => requestMusicInfoBatch(task))).then((data) => data.flat())
  return buildMusicInfoList(resources)
}

export const getMusicInfo = async (songId: string): Promise<AnyListen_API.MusicInfoOnline | undefined> => {
  return getMusicInfos([songId]).then((data) => data[0])
}
