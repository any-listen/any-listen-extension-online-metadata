import kg from './kg'
import kw from './kw'
import mg from './mg'
import tx from './tx'
import wy from './wy'

export const sources = {
  kw,
  tx,
  wy,
  kg,
  mg,
} as const

export type Sources = keyof typeof sources
