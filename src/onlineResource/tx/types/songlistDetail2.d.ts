export interface SonglistDetail2 {
  code: number
  ts: number
  start_ts: number
  traceid: string
  req_1: Req1
}

export interface Req1 {
  code: number
  data: Data
}

export interface Data {
  code: number
  subcode: number
  msg: string
  from_gedan_plaza: number
  accessed_plaza_cache: number
  accessed_byfav: number
  optype: number
  filter_song_num: number
  dirinfo: Dirinfo
  songlist: Songlist[]
  login_uin: number
  invalid_song: any[]
  filtered_song: any[]
  ad_list: any[]
  total_song_num: number
  encrypt_login: string
  ct: number
  cv: number
  ip: string
  orderlist: any[]
  cmtURL_bykey: CmtURLBykey
  srf_ip: string
  referer: string
  namedflag: number
  isAd: number
  adTitle: string
  adUrl: string
  isForbidComment: number
  songtag: any[]
  toplist_song: any[]
  toplist_nolimit: boolean
  sac_forbid: any[]
  birthday: any[]
  aiExt: AIEXT
  vec_songid_newtime: any[]
  vec_songid_type: any[]
  vec_ai_extern: any[]
  recomUgcValid: number
  quickListenVid: any[]
  bitflag: number
  hasmore: number
}

export interface AIEXT {
  couple: any[]
  recommdays: number
  nextLink: string
  aiSongExt: any[]
  allListening: number
  strAllListening: string
  listeningIcon: string
  static_msg: string
  dynamic_msg: string
  feedbackURL: string
  CountdownTime: number
  ISJoinExp: boolean
  blkCntDnlist: any[]
  limitVipSongNum: number
  aiHelperCard: AIHelperCard
}

export interface AIHelperCard {
  title: string
  desc_icon: string
  desc_text: string
  bubble: string
  scheme: string
  aiTag: any[]
  reason: string
}

export interface CmtURLBykey {
  url_key: string
  url_params: string
}

export interface Dirinfo {
  id: number
  host_uin: number
  dirid: number
  title: string
  picurl: string
  picid: number
  desc: string
  vec_tagid: any[]
  vec_tagname: any[]
  ctime: number
  mtime: number
  listennum: number
  ordernum: number
  picmid: string
  dirtype: number
  host_nick: string
  songnum: number
  ordertime: number
  show: number
  picurl2: string
  song_update_time: number
  song_update_num: number
  disstype: number
  ai_uin: number
  dv2: number
  dir_show: number
  encrypt_uin: string
  encrypt_ai_uin: string
  owndir: number
  headurl: string
  tag: any[]
  creator: Creator
  status: number
  edge_mark: string
  layer_url: string
  ext1: string
  ext2: string
  origin_title: string
  ad_tag: boolean
  aiToast: string
  role: number
  rl2: number
}

export interface Creator {
  musicid: number
  type: number
  singerid: number
  nick: string
  headurl: string
  ifpicurl: string
  encrypt_uin: string
  isVip: number
  ai_uin: number
  encrypt_ai_uin: string
  ext: null
}

export interface Songlist {
  id: number
  type: number
  songtype: number
  version: number
  trace: string
  mid: string
  name: string
  label: string
  title: string
  subtitle: string
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  status: number
  fnote: number
  url: string
  time_public: Date
  singer: Album[]
  album: Album
  mv: Mv
  ksong: Ksong
  file: File
  volume: Volume
  pay: Pay
  action: Record<string, number>
  uiAction: number
  new_icon: number
  tid: number
  ov: number
  tf: string
  sa: number
  es: string
  abt: string
  pingpong: string
  data_type: number
  ppurl: string
  vs: string[]
  bpm: number
  ktag: string
  team: string
  vf: number[]
  bf: number
}

export interface Album {
  id: number
  mid: string
  name: string
  title: string
  pmid?: string
}

export interface File {
  media_mid: string
  size_try: number
  try_begin: number
  try_end: number
  size_24aac: number
  size_48aac: number
  size_96aac: number
  size_128mp3: number
  size_192ogg: number
  size_192aac: number
  size_320mp3: number
  size_flac: number
  size_ape: number
  size_dts: number
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
