import { buffer, t } from '@/shared/hostApi'
import he from 'he'

export * from './common'

// https://stackoverflow.com/a/53387532
export function compareVer(currentVer: string, targetVer: string): -1 | 0 | 1 {
  // treat non-numerical characters as lower version
  // replacing them with a negative number based on charcode of each character
  const fix = (s: string) => `.${s.toLowerCase().charCodeAt(0) - 2147483647}.`

  const currentVerArr: Array<string | number> = ('' + currentVer).replace(/[^0-9.]/g, fix).split('.')
  const targetVerArr: Array<string | number> = ('' + targetVer).replace(/[^0-9.]/g, fix).split('.')
  const c = Math.max(currentVerArr.length, targetVerArr.length)
  for (let i = 0; i < c; i++) {
    // convert to integer the most efficient way
    currentVerArr[i] = ~~currentVerArr[i]
    targetVerArr[i] = ~~targetVerArr[i]
    if (currentVerArr[i] > targetVerArr[i]) return 1
    else if (currentVerArr[i] < targetVerArr[i]) return -1
  }
  return 0
}

export const filterMusicList = <T extends AnyListen_API.MusicInfo>(list: T[]): T[] => {
  const ids = new Set<string>()
  return list.filter((s) => {
    if (!s.id || ids.has(s.id) || !s.name) return false
    if (s.singer == null) s.singer = ''
    ids.add(s.id)
    return true
  })
}

export const deduplicationList = <T extends AnyListen_API.MusicInfo>(list: T[]): T[] => {
  const ids = new Set<string>()
  return list.filter((s) => {
    if (ids.has(s.id)) return false
    ids.add(s.id)
    return true
  })
}

/**
 * 格式化播放数量
 * @param {*} num 数字
 */
export const formatPlayCount = (num: number): string => {
  if (num > 100000000) return t('count_billion', { num: Math.trunc(num / 10000000) / 10 })
  if (num > 10000) return t('count_ten_thousand', { num: Math.trunc(num / 1000) / 10 })
  return String(num)
}

export const decodeName = (str: string | null = '') => {
  if (!str) return ''
  return he.decode(str)
}

export const b64DecodeUnicode = (str: string): string => {
  return buffer.bufToString(buffer.from(str, 'base64'), 'utf8')
}
