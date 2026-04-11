// s.content[0].lyricContent.forEach(([str]) => {
//   console.log(str)
// })

import { dataConverter } from '@/shared/hostApi'
import { toMD5 } from '../shared'
import pako from 'pako'

/**
 * 签名
 */
export const signatureParams = async (params: string, platform = 'android', body = '') => {
  let keyparam = 'OIlwieks28dk2k092lksi2UIkp'
  if (platform === 'web') keyparam = 'NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt'
  const param_list = params.split('&')
  param_list.sort()
  const sign_params = `${keyparam}${param_list.join('')}${body}${keyparam}`
  return await toMD5(sign_params)
}

// https://github.com/lyswhut/lx-music-desktop/issues/296#issuecomment-683285784
const enc_key = new Uint8Array([0x40, 0x47, 0x61, 0x77, 0x5e, 0x32, 0x74, 0x47, 0x51, 0x36, 0x31, 0x2d, 0xce, 0xd2, 0x6e, 0x69])
export const decodeKrc = async (str: string) => {
  if (!str.length) return ''
  const buf_str = (await dataConverter(str, 'base64', 'binary')).slice(4)
  for (let i = 0, len = buf_str.length; i < len; i++) {
    buf_str[i] = buf_str[i] ^ enc_key[i % 16]
  }
  return pako.inflate(buf_str, { to: 'string' })
}
