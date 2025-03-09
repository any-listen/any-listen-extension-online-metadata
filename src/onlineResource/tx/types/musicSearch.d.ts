export interface MusicSearch {
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
  body: Body
  code: number
  feedbackURL: string
  meta: Meta
  ver: number
}

export interface Body {
  direct_group: DirectGroup
  gedantip: Gedantip
  head: string
  item_album: any[]
  item_audio: any[]
  item_mv: any[]
  item_song: ItemSong[]
  item_songlist: any[]
  multi_extern_info: MultiExternInfo
  qc: any[]
  showMore: number
  showMoreText: string
  showMoreUrl: string
  singer: any[]
  subtab_infos: any[]
}

export interface DirectGroup {
  extra_info: ExtraInfo
  lateral_list: any[]
  region: string
  show_pattern: number
  title: string
  vertical_list: any[]
}

export interface ExtraInfo {
  content: string
  search_ext: string
  tjreport: string
}

export interface Gedantip {
  tab: number
  tip: string
}

export interface ItemSong {
  act: number
  action: { [key: string]: number }
  album: Album
  author: string
  bpm: number
  content: string
  custom_data: string
  data_type: number
  desc: string
  docid: string
  eq: number
  es: string
  file: File
  fnote: number
  genre: number
  grp: ItemSong[]
  hotness_desc: string
  href3: string
  id: number
  index_album: number
  index_cd: number
  interval: number
  isonly: number
  ksong: Ksong
  label: string
  language: number
  lyric: string
  mid: string
  mv: Mv
  name: string
  newStatus: number
  ov: number
  pay: Pay
  protect: number
  sa: number
  search_title: string
  singer: Singer[]
  status: number
  subtitle: string
  tag: number
  tid: number
  time_public: string
  title: string
  title_extra: string
  title_main: string
  type: number
  url: string
  vec_hotness: any[]
  version: number
  volume: Volume
  vs: string[]
}

export interface Album {
  id: number
  mid: string
  name: string
  pmid: string
  subtitle: string
  time_public: string
  title: string
}

export interface File {
  b_30s: number
  e_30s: number
  hires_bitdepth: number
  hires_sample: number
  media_mid: string
  size_128mp3: number
  size_192aac: number
  size_192ogg: number
  size_24aac: number
  size_320mp3: number
  size_360ra: any[]
  size_48aac: number
  size_96aac: number
  size_96ogg: number
  size_ape: number
  size_dolby: number
  size_dts: number
  size_flac: number
  size_hires: number
  size_new: number[]
  size_try: number
  try_begin: number
  try_end: number
  url: string
}

export interface Ksong {
  id: number
  mid: string
}

export interface Mv {
  id: number
  name: string
  title: string
  vid: string
  vt: number
}

export interface Pay {
  pay_down: number
  pay_month: number
  pay_play: number
  pay_status: number
  price_album: number
  price_track: number
  time_free: number
}

export interface Singer {
  id: number
  mid: string
  name: string
  pmid: string
  title: string
  type: number
  uin: number
}

export interface Volume {
  gain: number
  lra: number
  peak: number
}

export interface MultiExternInfo {
  is_show: number
  restype: string
  selectors: any[]
  show_rows: number
  style: number
}

export interface Meta {
  cid: string
  curpage: number
  dir: string
  display_order: any[]
  ein: number
  estimate_sum: number
  expid: string
  feedbackPlaceId: string
  is_filter: number
  next_page_start: any
  nextpage: number
  perpage: number
  query: string
  report_info: any
  result_trustworthy: number
  ret: number
  safetyType: number
  safetyUrl: string
  searchid: string
  sid: string
  sin: number
  step_rela_syntax_tree: any
  sum: number
  tab_list: any[]
  uid: string
  v: number
}
