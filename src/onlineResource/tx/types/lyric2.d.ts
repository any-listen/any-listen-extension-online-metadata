export interface Lyric {
  code: number
  ts: number
  start_ts: number
  traceid: string
  req: Req
}

export interface Req {
  code: number
  data: Data
}

export interface Data {
  songID: number
  songName: string
  songType: number
  singerName: string
  qrc: number
  crypt: number
  lyric: string
  trans: string
  roma: string
  lrc_t: number
  qrc_t: number
  trans_t: number
  roma_t: number
  lyric_style: number
  classical: number
  introduceTitle: string
  introduceText: IntroduceText[]
  vecSongID: null
  track: Track
  startTs: number
  transSource: number
  hasContributor: boolean
  hasTransContributor: boolean
  singingAnnotationsLyric: string
  singingAnnotationsTs: number
  hasMultiTrans: boolean
  lt_lyric: string
  lt_lyric_t: number
}

export interface IntroduceText {
  title: string
  content: string
}

export interface Track {
  id: number
  type: number
  mid: string
  name: string
  title: string
  subtitle: string
  singer: null
  album: Album
  mv: Mv
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  time_public: string
  status: number
  fnote: number
  file: File
  pay: Pay
  action: Record<string, number>
  ksong: Ksong
  volume: Volume
  label: string
  url: string
  bpm: number
  version: number
  trace: string
  data_type: number
  modify_stamp: number
  pingpong: string
  aid: number
  ppurl: string
  tid: number
  ov: number
  sa: number
  es: string
  vs: null
  vi: null
  ktag: string
  vf: null
  va: null
}

export interface Album {
  id: number
  mid: string
  name: string
  title: string
  subtitle: string
  time_public: string
  pmid: string
}

export interface File {
  media_mid: string
  size_24aac: number
  size_48aac: number
  size_96aac: number
  size_192ogg: number
  size_192aac: number
  size_128mp3: number
  size_320mp3: number
  size_ape: number
  size_flac: number
  size_dts: number
  size_try: number
  try_begin: number
  try_end: number
  url: string
  size_hires: number
  hires_sample: number
  hires_bitdepth: number
  b_30s: number
  e_30s: number
  size_96ogg: number
  size_360ra: null
  size_dolby: number
  size_new: null
}

export interface Ksong {
  id: number
  mid: string
}

export interface Mv {
  id: number
  vid: string
  name: string
  title: string
  vt: number
}

export interface Pay {
  pay_month: number
  price_track: number
  price_album: number
  pay_play: number
  pay_down: number
  pay_status: number
  time_free: number
}

export interface Volume {
  gain: number
  peak: number
  lra: number
}
