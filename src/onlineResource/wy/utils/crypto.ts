// https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/util/crypto.js

import { crypto, buffer } from '@/shared/hostApi'

const iv = '0102030405060708'
const presetKey = '0CoJUm6Qyw8W8jud'
const linuxapiKey = 'rFgB&h#%2?^eDg:Q'
// const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const publicKey =
  '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB\n-----END PUBLIC KEY-----'

const eapiKey = 'e82ckenh8dichen8'

const aesEncrypt = (data: string, mode: AnyListen_API.AES_MODE, key: Uint8Array | string, iv: Uint8Array | string) => {
  // console.log(data, mode, key, iv)
  // const cipher = createCipheriv(mode, key, iv)
  // return Buffer.concat([cipher.update(buffer), cipher.final()])
  return crypto.aesEncrypt(mode, data, key, iv)
}

const rsaEncrypt = (buf: Uint8Array, key: Uint8Array | string) => {
  return crypto.rsaEncrypt('RSA_NO_PADDING', buf, key)
}

export const weapi = (object: object) => {
  const text = JSON.stringify(object)
  const secretKey = buffer.from(String(Math.random()).substring(2, 18))
  return {
    params: aesEncrypt(aesEncrypt(text, 'CBC_128_PKCS7Padding', presetKey, iv), 'CBC_128_PKCS7Padding', secretKey, iv),
    encSecKey: buffer.bufToString(buffer.from(rsaEncrypt(secretKey.reverse(), publicKey), 'base64'), 'hex'),
  }
}

export const linuxapi = (object: object) => {
  const text = JSON.stringify(object)
  return {
    eparams: buffer
      .bufToString(buffer.from(aesEncrypt(text, 'ECB_128_NoPadding', linuxapiKey, ''), 'base64'), 'hex')
      .toUpperCase(),
  }
}

export const eapi = (url: string, object: object) => {
  const text = typeof object === 'object' ? JSON.stringify(object) : object
  const message = `nobody${url}use${text}md5forencrypt`
  const digest = crypto.md5(message)
  const data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`
  return {
    params: buffer.bufToString(buffer.from(aesEncrypt(data, 'ECB_128_NoPadding', eapiKey, ''), 'base64'), 'hex').toUpperCase(),
  }
}
