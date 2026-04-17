// eslint-disable-next-line @typescript-eslint/no-require-imports
const api = require('any-listen')

export const console = {
  log: api.logcat.info,
  error: api.logcat.error,
  warn: api.logcat.warn,
}

export const version = api.env.version
export const registerResourceAction = api.registerResourceAction

export const request = api.request!
export const t = api.t

export const crypto = api.utils.crypto
export const dataConverter = api.utils.dataConverter
export const iconv = api.utils.iconv
export const zlib = api.utils.zlib
