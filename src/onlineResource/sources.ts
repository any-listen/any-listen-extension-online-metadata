import kw from './kw'
import tx from './tx'
import wy from './wy'

export const sources = {
  kw,
  tx,
  wy,
  kg: null,
  mg: null,
} as const

export type Sources = keyof typeof sources
