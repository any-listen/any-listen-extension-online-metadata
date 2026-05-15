export interface MusicInfo {
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
  info: Info
  extras: Extras
  track_info: TrackInfo
}

export interface Extras {
  name: string
  transname: string
  subtitle: string
  from: string
  wikiurl: string
}

export interface Info {
  company: Company
  genre: Company
  lan: Company
  pub_time: Company
}

export interface Company {
  title: string
  type: string
  content: Content[]
  pos: number
  more: number
  selected: string
  use_platform: number
}

export interface Content {
  id: number
  value: string
  mid: string
  type: number
  show_type: number
  is_parent: number
  picurl: string
  read_cnt: number
  author: string
  jumpurl: string
  ori_picurl: string
}

export interface TrackInfo {
  id: number
  type: number
  mid: string
  name: string
  title: string
  subtitle: string
  singer: Singer[]
  album: Album
  mv: Mv
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  time_public: Date
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
  ppurl: string
  tid: number
  ov: number
  sa: number
  es: string
  vs: string[]
  vi: number[]
  ktag: string
  vf: number[]
}

export interface Album {
  id: number
  mid: string
  name: string
  title: string
  subtitle: string
  time_public: Date
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
  size_360ra: any[]
  size_dolby: number
  size_new: number[]
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

export interface Singer {
  id: number
  mid: string
  name: string
  title: string
  type: number
  uin: number
}

export interface Volume {
  gain: number
  peak: number
  lra: number
}
