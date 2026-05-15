export interface TopSongsDetail {
  data: Data
  errcode: number
  status: number
  error: string
}

export interface Data {
  timestamp: number
  total: number
  info: Info[]
}

export interface Info {
  last_sort: number
  authors: Author[]
  rank_count: number
  rank_id_publish_date: string
  songname: string
  topic_url_320: string
  sqhash: string
  fail_process: number
  pay_type: number
  recommend_reason: string
  rp_type: string
  album_id: string
  privilege_high: number
  topic_url_sq: string
  rank_cid: number
  inlist: number
  '320filesize': number
  pkg_price_320: number
  feetype: number
  price_320: number
  duration_high: number
  fail_process_320: number
  zone: string
  topic_url: string
  rp_publish: number
  trans_obj: TransObj
  hash: string
  sqfilesize: number
  sqprivilege: number
  pay_type_sq: number
  bitrate: number
  pkg_price_sq: number
  has_accompany: number
  musical: Musical | null
  pay_type_320: number
  issue: number
  extname_super: string
  duration_super: number
  bitrate_super: number
  hash_high: string
  duration: number
  '320hash': string
  price_sq: number
  old_cpy: number
  album_audio_id: number
  m4afilesize: number
  pkg_price: number
  first: number
  audio_id: number
  hash_super: string
  addtime: Date
  filesize_high: number
  price: number
  privilege: number
  album_sizable_cover: string
  mvdata?: Mvdatum[]
  sort: number
  trans_param: TransParam
  filesize_super: number
  filename: string
  bitrate_high: number
  remark: string
  extname: string
  filesize: number
  isfirst: number
  mvhash: string
  '320privilege': number
  privilege_super: number
  fail_process_sq: number
}

export interface Author {
  sizable_avatar: string
  is_publish: number
  author_name: string
  author_id: number
}

export interface Musical {
  publish_time: Date
  publish_type: number
  uploader_content: string
  uploader: string
}

export interface Mvdatum {
  typ: number
  trk: string
  hash: string
  id: string
}

export interface TransObj {
  rank_show_sort: number
}

export interface TransParam {
  ogg_128_hash: string
  classmap: Map
  language: string
  cpy_attr0: number
  musicpack_advance: number
  ogg_128_filesize: number
  display_rate: number
  cpy_level: number
  cpy_grade: number
  pay_block_tpl: number
  qualitymap: Qualitymap
  ogg_320_hash?: string
  songname_suffix?: string
  cid: number
  display: number
  provider?: number
  hash_multitrack?: string
  hash_offset?: HashOffset
  ipmap: Map
  union_cover: string
  ogg_320_filesize?: number
  is_original?: number
  appid_block?: string
  free_limited?: number
  free_for_ad?: number
}

export interface Map {
  attr0: number
}

export interface HashOffset {
  clip_hash: string
  start_byte: number
  end_ms: number
  end_byte: number
  file_type: number
  start_ms: number
  offset_hash: string
}

export interface Qualitymap {
  bits: string
  attr0: number
  attr1: number
}
