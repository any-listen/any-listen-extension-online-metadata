/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-labels */
import { dataConverter, iconv, zlib } from '@/shared/hostApi'

function uint8IndexOfSequence(uint8Array: Uint8Array, sequence: Uint8Array) {
  const seqLen = sequence.length
  if (seqLen === 0) return -1

  outer: for (let i = 0; i <= uint8Array.length - seqLen; i++) {
    for (let j = 0; j < seqLen; j++) {
      if (uint8Array[i + j] !== sequence[j]) {
        continue outer
      }
    }
    return i
  }
  return -1
}

const buf_key = new Uint8Array([121, 101, 101, 108, 105, 111, 110])
const delimiter = new Uint8Array([13, 10, 13, 10])
const buf_key_len = buf_key.length

const decodeLyric = async (buf: Uint8Array, isGetLyricx: boolean) => {
  if ((await dataConverter(buf.slice(0, 10), 'utf-8')) != 'tp=content') return ''
  const lrcData = await zlib.inflate(buf.subarray(uint8IndexOfSequence(buf, delimiter) + 4))

  if (!isGetLyricx) return iconv.decode(lrcData, 'gb18030')
  const buf_str = await dataConverter(await dataConverter(lrcData, 'utf-8'), 'base64')
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
