export interface MusicSearch {
  code: number
  ts: number
  start_ts: number
  traceid: string
  req: MusicSearchSearchCGIService
}

export interface MusicSearchSearchCGIService {
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
  album: MvClass
  gedantip: Gedantip
  mv: MvClass
  qc: any[]
  singer: MvClass
  song: MvClass
  songlist: MvClass
  user: MvClass
  zhida: MvClass
}

export interface MvClass {
  list: List[]
}

export interface List {
  act?: number
  action?: Action
  album?: ListAlbum
  bpm?: number
  content?: string
  desc?: string
  desc_hilight?: string
  docid: string
  eq?: number
  es?: string
  file?: File
  fnote?: number
  genre?: number
  grp?: Grp[]
  hotness?: Hotness
  href3?: string
  id: number | string
  index_album?: number
  index_cd?: number
  interval?: number
  isonly?: number
  ksong?: Ksong
  label?: string
  language?: number
  lyric?: string
  lyric_hilight?: string
  mid: string
  mv?: Mv
  name?: string
  newStatus?: number
  ov?: number
  pay?: Pay
  protect?: number
  sa?: number
  singer?: Singer[]
  status?: number
  subtitle?: string
  tag?: number
  tid?: number
  time_public?: string
  title: string
  title_hilight?: string
  type: number
  url?: string
  version?: number
  vf?: number[]
  vi?: number[]
  volume?: Volume
  vs?: string[]
  album_list?: TrackListClass
  custom_info?: CustomInfo
  desciption?: string
  jumpurl?: string
  pic?: string
  publish_date?: string
  track_list?: TrackListClass
  vid?: string
  video_type?: number
}

export interface Action {
  alert: number
  icon2: number
  icons: number
  msgdown: number
  msgfav: number
  msgid: number
  msgpay: number
  msgshare: number
  switch: number
  switch2: number
  vb: number[]
}

export interface ListAlbum {
  id: number
  mid: string
  name: string
  pmid: string
  subtitle: string
  time_public: string
  title: string
}

export interface TrackListClass {
  items: Item[]
}

export interface Item {
  id: number
  mid: string
  name: string
}

export interface CustomInfo {
  album_num: string
  begin_time: string
  bold_description: string
  bold_extra_desc: string
  cutout_singer_pic: string
  end_time: string
  extra_desc: string
  from: string
  grade: string
  icon_type: string
  icon_type2: string
  icon_type2_schema: string
  is_follow: string
  low_ctr_query: string
  mid: string
  mv_num: string
  need_blur_bg: string
  one_line_desc: string
  parent_ids: string
  play_list: string
  pos: string
  search_history: string
  singer_identity: string
  song_num: string
  source_d: string
  tab_id: string
}

export interface File {
  b_30s: number
  df: any[]
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
  vm: any[]
}

export interface Grp {
  act: number
  action: Action
  album: ListAlbum
  bpm: number
  content: string
  desc: string
  desc_hilight: string
  docid: string
  eq: number
  es: string
  file: File
  fnote: number
  genre: number
  grp: Grp[]
  hotness: Hotness
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
  lyric_hilight: string
  mid: string
  mv: Mv
  name: string
  newStatus: number
  ov: number
  pay: Pay
  protect: number
  sa: number
  singer: Singer[]
  status: number
  subtitle: string
  tag: number
  tid: number
  time_public: string
  title: string
  title_hilight: string
  type: number
  url: string
  version: number
  vf: number[]
  vi: number[]
  volume: Volume
  vs: string[]
}

export interface Hotness {
  desc: string
  icon_url: string
  jump_type: number
  jump_url: string
  tag_id: string
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

export interface Gedantip {
  tab: number
  tip: string
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
  report_info: ReportInfo
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

export interface ReportInfo {
  items: any
}
