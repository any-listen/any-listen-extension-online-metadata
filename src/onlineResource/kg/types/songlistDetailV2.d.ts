export interface SonglistDetailV2 {
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
  hash: string
  sqfilesize: number
  sqprivilege: number
  pay_type_sq: number
  bitrate: number
  pkg_price_sq: number
  has_accompany: number
  topic_url_320: string
  sqhash: string
  fail_process: number
  pay_type: number
  rp_type: string
  album_id: string
  mvhash: string
  extname: string
  topic_url_sq: string
  '320hash': string
  price_sq: number
  inlist: number
  m4afilesize: number
  pay_type_320: number
  '320filesize': number
  pkg_price_320: number
  privilege: number
  feetype: number
  price: number
  filename: string
  old_cpy: number
  album_audio_id: number
  fail_process_320: number
  trans_param: TransParam
  duration: number
  audio_id: number
  topic_url: string
  brief: string
  rp_publish: number
  filesize: number
  remark: string
  pkg_price: number
  '320privilege': number
  price_320: number
  fail_process_sq: number
}

export interface TransParam {
  language: string
  pay_block_tpl: number
  union_cover: string
  is_original?: number
  classmap: Map
  cid: number
  hash_multitrack: string
  cpy_attr0: number
  ipmap: Map
  qualitymap: Qualitymap
  musicpack_advance: number
  display: number
  display_rate: number
  cpy_grade?: number
  cpy_level?: number
  ogg_128_filesize?: number
  ogg_128_hash?: string
  hash_offset?: HashOffset
  ogg_320_hash?: string
  ogg_320_filesize?: number
  appid_block?: string
  cpy_map?: string
  songname_suffix?: string
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
