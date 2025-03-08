import { crypto } from '@/shared/hostApi'
import { decodeName } from '@/shared/utils'
import { sources } from './sources'

export const toMD5 = (str: string) => crypto.md5(str)

/**
 * 格式化歌手
 * @param singers 歌手数组
 * @param nameKey 歌手名键值
 * @param join 歌手分割字符
 */
export const formatSingerName = (singers: Record<string, string>, nameKey = 'name', join = '、') => {
  if (Array.isArray(singers)) {
    const singer: string[] = []
    singers.forEach((item) => {
      const name = item[nameKey]
      if (!name) return
      singer.push(name)
    })
    return decodeName(singer.join(join))
  }
  return decodeName(String(singers ?? ''))
}

export const searchMusic = async ({
  name,
  singer,
  source: s,
  limit = 25,
}: {
  name: string
  singer: string
  source: string
  limit: number
}) => {
  const trimStr = (str: string) => (typeof str == 'string' ? str.trim() : str)
  const musicName = trimStr(name)
  const tasks = []
  for (const source of Object.keys(sources) as (keyof typeof sources)[]) {
    if (!('musicSearch' in sources[source]) || source == s) continue
    tasks.push(sources[source].musicSearch(`${musicName} ${singer || ''}`.trim(), 1, limit).catch(() => null))
  }
  return (await Promise.all(tasks)).filter((s) => s != null)
}

type FindMusicType = Omit<AnyListen_API.MusicInfoOnline, 'name'> & {
  name: null | string
  fSinger?: string
  fMusicName?: string
  fAlbumName?: string
  fInterval?: number
}
export const findMusic = async ({
  name,
  singer,
  albumName,
  interval,
  source: s,
}: {
  name: string
  singer: string
  albumName: string
  interval: string | null
  source: string
}): Promise<AnyListen_API.MusicInfoOnline[]> => {
  const lists = await searchMusic({ name, singer, source: s, limit: 25 })
  // console.log(lists)
  // console.log({ name, singer, albumName, interval, source: s })

  const singersRxp = /、|&|;|；|\/|,|，|\|/
  const sortSingle = (singer: string) =>
    singersRxp.test(singer)
      ? singer
          .split(singersRxp)
          .sort((a, b) => a.localeCompare(b))
          .join('、')
      : singer || ''
  const sortMusic = (arr: FindMusicType[], callback: (item: FindMusicType) => boolean) => {
    const tempResult = []
    for (let i = arr.length - 1; i > -1; i--) {
      const item = arr[i]
      if (callback(item)) {
        delete item.fSinger
        delete item.fMusicName
        delete item.fAlbumName
        delete item.fInterval
        tempResult.push(item)
        arr.splice(i, 1)
      }
    }
    tempResult.reverse()
    return tempResult
  }
  const getIntv = (interval?: string | null) => {
    if (!interval) return 0
    // if (musicInfo._interval) return musicInfo._interval
    const intvArr = interval.split(':')
    let intv = 0
    let unit = 1
    while (intvArr.length) {
      intv += parseInt(intvArr.pop()!) * unit
      unit *= 60
    }
    return intv
  }
  const trimStr = (str: string) => (typeof str == 'string' ? str.trim() : str || '')
  const filterStr = (str: string) =>
    typeof str == 'string' ? str.replace(/\s|'|\.|,|，|&|"|、|\(|\)|（|）|`|~|-|<|>|\||\/|\]|\[|!|！/g, '') : String(str || '')
  const fMusicName = filterStr(name).toLowerCase()
  const fSinger = filterStr(sortSingle(singer)).toLowerCase()
  const fAlbumName = filterStr(albumName).toLowerCase()
  const fInterval = getIntv(interval)
  const isEqualsInterval = (intv: number) => Math.abs((fInterval || intv) - (intv || fInterval)) < 5
  const isIncludesName = (name: string) => fMusicName.includes(name) || name.includes(fMusicName)
  const isIncludesSinger = (singer: string) => (fSinger ? fSinger.includes(singer) || singer.includes(fSinger) : true)
  const isEqualsAlbum = (album: string) => (fAlbumName ? fAlbumName == album : true)

  const result = lists
    .map((source) => {
      for (const _item of source.list) {
        const item = _item as FindMusicType
        item.name = trimStr(item.name!)
        item.singer = trimStr(item.singer)
        item.fSinger = filterStr(sortSingle(item.singer).toLowerCase())
        item.fMusicName = filterStr(String(item.name ?? '').toLowerCase())
        item.fAlbumName = filterStr(String(item.meta.albumName ?? '').toLowerCase())
        item.fInterval = getIntv(item.interval)
        // console.log(fMusicName, item.fMusicName, item.source)
        if (!isEqualsInterval(item.fInterval)) {
          item.name = null
          continue
        }
        if (item.fMusicName == fMusicName && isIncludesSinger(item.fSinger)) return item
      }
      for (const item of source.list as FindMusicType[]) {
        if (item.name == null) continue
        if (item.fSinger == fSinger && isIncludesName(item.fMusicName!)) return item
      }
      for (const item of source.list as FindMusicType[]) {
        if (item.name == null) continue
        if (isEqualsAlbum(item.fAlbumName!) && isIncludesSinger(item.fSinger!) && isIncludesName(item.fMusicName!)) return item
      }
      return null
    })
    .filter((s) => s != null)
  const newResult = []
  if (result.length) {
    newResult.push(
      ...sortMusic(result, (item) => item.fSinger == fSinger && item.fMusicName == fMusicName && item.interval == interval)
    )
    newResult.push(
      ...sortMusic(result, (item) => item.fMusicName == fMusicName && item.fSinger == fSinger && item.fAlbumName == fAlbumName)
    )
    newResult.push(...sortMusic(result, (item) => item.fSinger == fSinger && item.fMusicName == fMusicName))
    newResult.push(...sortMusic(result, (item) => item.fMusicName == fMusicName && item.interval == interval))
    newResult.push(...sortMusic(result, (item) => item.fSinger == fSinger && item.interval == interval))
    newResult.push(...sortMusic(result, (item) => item.interval == interval))
    newResult.push(...sortMusic(result, (item) => item.fMusicName == fMusicName))
    newResult.push(...sortMusic(result, (item) => item.fSinger == fSinger))
    newResult.push(...sortMusic(result, (item) => item.fAlbumName == fAlbumName))
    for (const item of result) {
      delete item.fSinger
      delete item.fMusicName
      delete item.fAlbumName
      delete item.fInterval
    }
    newResult.push(...result)
  }
  // console.log(newResult)
  return newResult as unknown as AnyListen_API.MusicInfoOnline[]
}
