export interface Lyric {
  sgc: boolean
  sfy: boolean
  qfy: boolean
  lrc: Klyric
  klyric?: Klyric
  tlyric?: Klyric
  romalrc?: Klyric
  yrc?: Klyric
  ytlrc?: Klyric
  yromalrc?: Klyric
  code: number
}

export interface Klyric {
  version: number
  lyric: string
}
