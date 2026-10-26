export interface SonglistDetail2 {
  error_code: number
  errmsg: string
  data: Data
  status: number
}

export interface Data {
  listid: number
  list_ver: number
  page: number
  pagesize: number
  count: number
  userid: number
  info: Info[]
}

export interface Info {
  hash: string
  brief: string
  audio_id: number
  mvtype: number
  size: number
  publish_date: string
  name: string
  mvtrack: number
  bpm_type: string
  add_mixsongid: number
  album_id: string
  bpm: number
  mvhash: string
  extname: string
  language: string
  collecttime: number
  csong: number
  remark: string
  level: number
  media_old_cpy: number
  relate_goods: RelateGood[]
  download: Download[]
  rcflag: number
  feetype: number
  has_obbligato: number
  timelen: number
  sort: number
  trans_param: TransParam
  medistype: string
  user_id: number
  albuminfo: Albuminfo
  bitrate: number
  audio_group_id: string
  privilege: number
  cover: string
  mixsongid: number
  fileid: number
  heat: number
  singerinfo: Singerinfo[]
  tagmap: Tagmap
  mvdata?: Mvdatum[]
  recommend_type?: number
}

export interface Albuminfo {
  name: string
  id: number
  publish: number
}

export interface Download {
  hash: string
  status: number
  pay_type: number
  fail_process: number
}

export interface Mvdatum {
  typ: number
}

export interface RelateGood {
  hash: string
  size: number
  bitrate: number
  privilege: number
  level: number
}

export interface Singerinfo {
  name: string
  publish: number
  id: number
  avatar: string
  type: number
}

export interface Tagmap {
  genre0: number
}

export interface TransParam {
  appid_block?: string
  cid: number
  classmap: Classmap
  cpy_attr0: number
  cpy_grade?: number
  cpy_level?: number
  cpy_map: string
  display: number
  display_rate: number
  hash_multitrack?: string
  hash_offset?: HashOffset
  ipmap: Ipmap
  language: string
  musicpack_advance: number
  ogg_128_filesize?: number
  ogg_128_hash?: string
  ogg_320_filesize?: number
  ogg_320_hash?: string
  pay_block_tpl: number
  provider?: number
  qualitymap: Qualitymap
  union_cover: string
  songname_suffix?: string
  is_original?: number
  free_for_ad?: number
}

export interface Classmap {
  attr0: number
}

export interface HashOffset {
  clip_hash: string
  end_byte: number
  end_ms: number
  file_type: number
  offset_hash: string
  start_byte: number
  start_ms: number
}

export interface Ipmap {
  attr0: number
  bits: string
}

export interface Qualitymap {
  attr0: number
  attr1: number
  bits: string
}
