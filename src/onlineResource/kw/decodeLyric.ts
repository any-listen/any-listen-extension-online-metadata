import { inflate } from 'pako'
import { buffer, iconv } from '@/shared/hostApi'

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
const handleInflate = (data: Uint8Array) => {
  return new Promise<Uint8Array>((resolve, reject) => {
    try {
      resolve(inflate(data))
    } catch (err) {
      reject(err)
    }
  })
}

const buf_key = buffer.from('yeelion')
const delimiter = buffer.from('\r\n\r\n')
const buf_key_len = buf_key.length

const decodeLyric = async (buf: Uint8Array, isGetLyricx: boolean) => {
  if (buffer.bufToString(buf.slice(0, 10), 'utf8') != 'tp=content') return ''
  const lrcData = await handleInflate(buf.subarray(uint8IndexOfSequence(buf, delimiter) + 4))

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
