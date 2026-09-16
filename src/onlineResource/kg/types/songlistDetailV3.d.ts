export interface SonglistDetailV3 {
  list: List
  info: SonglistDetailV3Info[]
  pagesize: number
  errcode: number
  status: number
  error: string
}

export interface SonglistDetailV3Info {
  list_create_listid: number
  radio_id: number
  source: number
  tags: string
  list_create_gid: string
  create_time: number
  list_create_userid: number
  list_create_headimg: string
  count: number
  sort: number
  name: string
  collect_count: number
  pic: string
  list_create_username: string
  pub_type: number
  list_ver: number
  listid: number
  intro: string
  type: number
}

export interface List {
  info: ListInfo[]
  count: number
  listid: number
  userid: number
  list_ver: number
  page: number
  pagesize: number
}

export interface ListInfo {
  size: number
  hash: string
  sort: number
  trans_param: TransParam
  name: string
  bitrate: number
  mvtype: number
  album_id: string
  mvhash: string
  mvtrack: number
  fileid: number
  timelen: number
}

export interface TransParam {
  cpy_grade?: number
  union_cover: string
  language: string
  cpy_attr0: number
  musicpack_advance: number
  display: number
  display_rate: number
  cpy_map: string
  cpy_level?: number
  ipmap: Map
  qualitymap: Qualitymap
  is_original?: number
  ogg_128_hash: string
  cid: number
  ogg_128_filesize: number
  ogg_320_hash?: string
  songname_suffix?: string
  classmap: Map
  hash_multitrack?: string
  pay_block_tpl: number
  ogg_320_filesize?: number
  hash_offset?: HashOffset
  appid_block?: string
  free_for_ad?: number
}

export interface Map {
  attr0: number
}

export interface HashOffset {
  clip_hash: string
  start_byte: number
  file_type: number
  end_byte: number
  end_ms: number
  start_ms: number
  offset_hash: string
}

export interface Qualitymap {
  bits: string
  attr0: number
  attr1: number
}
