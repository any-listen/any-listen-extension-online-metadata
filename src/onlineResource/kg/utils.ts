// s.content[0].lyricContent.forEach(([str]) => {
//   console.log(str)
// })

import { dataConverter, zlib } from '@/shared/hostApi'

import { toMD5 } from '../shared'

/**
 * 签名
 */
export const signatureParams = async (params: string, platform: 'web' | 'android' = 'android', body = '') => {
  let keyparam = 'OIlwieks28dk2k092lksi2UIkp'
  if (platform === 'web') keyparam = 'NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt'
  const paramList = params.split('&')
  paramList.sort()
  const signParams = `${keyparam}${paramList.join('')}${body}${keyparam}`
  return toMD5(signParams)
}

// https://github.com/lyswhut/lx-music-desktop/issues/296#issuecomment-683285784
const encKey = new Uint8Array([0x40, 0x47, 0x61, 0x77, 0x5e, 0x32, 0x74, 0x47, 0x51, 0x36, 0x31, 0x2d, 0xce, 0xd2, 0x6e, 0x69])
export const decodeKrc = async (str: string) => {
  if (!str.length) return ''
  const bufStr = (await dataConverter(str, 'base64', 'binary')).slice(4)
  for (let i = 0, len = bufStr.length; i < len; i++) {
    // eslint-disable-next-line operator-assignment
    bufStr[i] = bufStr[i] ^ encKey[i % 16]
  }
  return zlib.inflate(bufStr, 'utf-8')
}
