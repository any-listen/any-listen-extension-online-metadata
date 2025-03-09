import { crypto } from '@/shared/hostApi'
import { decodeName } from '@/shared/utils'

export const toMD5 = (str: string) => crypto.md5(str)

/**
 * 格式化歌手
 * @param singers 歌手数组
 * @param nameKey 歌手名键值
 * @param join 歌手分割字符
 */
export const formatSingerName = <T extends any[]>(singers: T, nameKey = 'name', join = '、') => {
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
