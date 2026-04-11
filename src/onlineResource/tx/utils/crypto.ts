import { crypto, dataConverter } from '@/shared/hostApi'

const PART_1_INDEXES = [23, 14, 6, 36, 16, 40, 7, 19]
const PART_2_INDEXES = [16, 1, 32, 12, 19, 27, 8, 5]
const SCRAMBLE_VALUES = [89, 39, 179, 150, 218, 82, 58, 252, 177, 52, 186, 123, 120, 64, 242, 133, 143, 161, 121, 179]

function pickHashByIdx(hash: string, indexes: number[]) {
  return indexes.map((idx) => hash[idx]).join('')
}

async function base64Encode(data: number[]): Promise<string> {
  return (await dataConverter(new Uint8Array(data), 'base64')).replace(/[\\/+=]/g, '')
}

export async function zzcSign(text: string): Promise<string> {
  const hash = await crypto.sha1(text)
  const part1 = pickHashByIdx(hash, PART_1_INDEXES)
  const part2 = pickHashByIdx(hash, PART_2_INDEXES)
  const part3 = SCRAMBLE_VALUES.map((value, i) => value ^ parseInt(hash.slice(i * 2, i * 2 + 2), 16))
  const b64Part = await base64Encode(part3)
  return `zzc${part1}${b64Part}${part2}`.toLowerCase()
}
