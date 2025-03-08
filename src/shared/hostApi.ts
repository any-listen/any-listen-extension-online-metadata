// eslint-disable-next-line @typescript-eslint/no-require-imports
const api = require('any-listen')

export const console = {
  log: api.logcat.info,
  error: api.logcat.error,
}

export const registerResourceAction = api.registerResourceAction

export const request = api.request
export const t = api.t

export const crypto = api.utils.crypto
export const buffer = api.utils.buffer
