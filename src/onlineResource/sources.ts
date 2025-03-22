import kw from './kw'
import tx from './tx'
import wy from './wy'
import kg from './kg'

export const sources = {
  kw,
  tx,
  wy,
  kg,
  mg: null,
} as const

export type Sources = keyof typeof sources
