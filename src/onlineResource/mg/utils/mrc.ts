import { iconv } from '@/shared/hostApi'

const DELTA = 2654435769n
const MIN_LENGTH = 32

const keyArr = [
  27303562373562475n,
  18014862372307051n,
  22799692160172081n,
  34058940340699235n,
  30962724186095721n,
  27303523720101991n,
  27303523720101998n,
  31244139033526382n,
  28992395054481524n,
]

const MAX = 9223372036854775807n
const MIN = -9223372036854775808n

const toLong = (value: string | bigint) => {
  const num = typeof value === 'string' ? BigInt(`0x${value}`) : value
  if (num > MAX) return toLong(num - (1n << 64n))
  if (num < MIN) return toLong(num + (1n << 64n))
  return num
}

const longToBytes = (value: bigint) => {
  const result = new Uint8Array(8)
  let current = value
  for (let i = 0; i < 8; i++) {
    result[i] = Number(current & 0xffn)
    current >>= 8n
  }
  return result
}

const toBigintArray = (data: string) => {
  const length = Math.floor(data.length / 16)
  const result = Array<bigint>(length)
  for (let i = 0; i < length; i++) {
    result[i] = toLong(data.slice(i * 16, i * 16 + 16))
  }
  return result
}

const longArrToString = async (data: bigint[]) => {
  const chunks: string[] = []
  for (const item of data) chunks.push(await iconv.decode(longToBytes(item), 'utf16le'))
  return chunks.join('')
}

const teaDecrypt = (data: bigint[], key: bigint[]) => {
  const length = data.length
  const lengthBitint = BigInt(length)
  if (length >= 1) {
    let j2 = data[0]
    let j3 = toLong((6n + 52n / lengthBitint) * DELTA)
    while (true) {
      const j4 = j3
      if (j4 == 0n) break
      const j5 = toLong(3n & toLong(j4 >> 2n))
      let j6 = lengthBitint
      while (true) {
        j6--
        if (j6 > 0n) {
          const j7 = data[Number(j6 - 1n)]
          const i = Number(j6)
          j2 = toLong(
            data[i] -
              (toLong(toLong(j2 ^ j4) + toLong(j7 ^ key[Number(toLong((3n & j6) ^ j5))])) ^
                toLong(toLong(toLong(j7 >> 5n) ^ toLong(j2 << 2n)) + toLong(toLong(j2 >> 3n) ^ toLong(j7 << 4n))))
          )
          data[i] = j2
        } else {
          break
        }
      }
      const j8 = data[Number(lengthBitint - 1n)]
      j2 = toLong(
        data[0] -
          toLong(
            toLong(toLong(key[Number(toLong((j6 & 3n) ^ j5))] ^ j8) + toLong(j2 ^ j4)) ^
              toLong(toLong(toLong(j8 >> 5n) ^ toLong(j2 << 2n)) + toLong(toLong(j2 >> 3n) ^ toLong(j8 << 4n)))
          )
      )
      data[0] = j2
      j3 = toLong(j4 - DELTA)
    }
  }
  return data
}

export const decrypt = async (data: string) => {
  if (data == null || data.length < MIN_LENGTH) return data
  return longArrToString(teaDecrypt(toBigintArray(data), keyArr))
}
