import { inflate } from 'pako'
import iconv from 'iconv-lite'
import { buffer } from '@/shared/hostApi'

const handleInflate = (data: Uint8Array) =>
  new Promise<Uint8Array>((resolve, reject) => {
    try {
      resolve(inflate(data))
    } catch (err) {
      reject(err)
    }
  })

const buf_key = buffer.from('yeelion')
const buf_key_len = buf_key.length

const decodeLyric = async (buf: Uint8Array, isGetLyricx: boolean) => {
  if (buffer.bufToString(buf.slice(0, 10), 'utf8') != 'tp=content') return ''
  const rawData = buffer.bufToString(buf, 'utf8')
  const lrcData = await handleInflate(buffer.from(rawData.slice(rawData.indexOf('\r\n\r\n') + 4)))

  if (!isGetLyricx) return iconv.decode(lrcData, 'gb18030')

  const buf_str = buffer.from(buffer.bufToString(lrcData, 'utf8'), 'base64')
  const buf_str_len = buf_str.length
  const output = new Uint16Array(buf_str_len)
  let i = 0
  while (i < buf_str_len) {
    let j = 0
    while (j < buf_key_len && i < buf_str_len) {
      output[i] = buf_str[i] ^ buf_key[j]
      i++
      j++
    }
  }

  return iconv.decode(output, 'gb18030')
}
export default async (lrcBuffer: Uint8Array, isGetLyricx: boolean) => {
  const lrc = await decodeLyric(lrcBuffer, isGetLyricx)
  // console.log(lrc)
  return lrc
}
