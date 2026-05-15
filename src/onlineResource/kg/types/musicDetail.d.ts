export interface MusicDetail {
  status: number
  error_code: number
  errcode: number
  errmsg: string
  data: Array<PurpleDatum[] | object>
}

export interface PurpleDatum {
  author_name: string
  ori_audio_name: string
  songname: string
  album_info: AlbumInfo
  audio_info: AudioInfo
}

export interface AlbumInfo {
  album_id?: string
  album_name?: string
  publish_date?: Date
  category?: string
  is_publish?: string
  sizable_cover?: string
}

export interface AudioInfo {
  is_file_head: string
  is_file_head_320: string
  audio_id: string
  hash: string
  filesize: string
  timelength: string
  bitrate: string
  hash_128: string
  filesize_128: string
  timelength_128: string
  hash_320: string
  filesize_320: string
  timelength_320: string
  hash_flac: string
  filesize_flac: string
  timelength_flac: string
  bitrate_flac: string
  hash_high: string
  filesize_high: string
  timelength_high: string
  bitrate_high: string
  hash_super: string
  filesize_super: string
  timelength_super: string
  bitrate_super: string
  hash_vinylrecord: string
  filesize_vinylrecord: string
  timelength_vinylrecord: string
  bitrate_vinylrecord: string
  hash_multichannel: string
  filesize_multichannel: string
  timelength_multichannel: string
  bitrate_multichannel: string
  hash_dolby_448: string
  filesize_dolby_448: string
  timelength_dolby_448: string
  bitrate_dolby_448: string
  hash_dolby_640: string
  filesize_dolby_640: string
  timelength_dolby_640: string
  bitrate_dolby_640: string
  hash_dolby_768: string
  filesize_dolby_768: string
  timelength_dolby_768: string
  bitrate_dolby_768: string
  audio_group_id: string
  extname_super: string
  extname: string
  fail_process: number
  pay_type: number
  type: string
  old_cpy: number
  privilege: string
  privilege_128: string
  privilege_320: string
  privilege_flac: string
  privilege_high: string
  privilege_super: string
  privilege_vinylrecord: string
  privilege_multichannel: string
  privilege_dolby_448: string
  privilege_dolby_640: string
  privilege_dolby_768: string
  tags: Tag[]
  trans_param: TransParam
}

export interface Tag {
  tag_id: string
  parent_id: string
  tag_name: string
}

export interface TransParam {
  hash_offset?: HashOffset
  musicpack_advance: number
  pay_block_tpl: number
  display: number
  display_rate: number
  cpy_grade?: number
  cpy_level?: number
  cid: number
  cpy_attr0: number
  classmap: Map
  hash_multitrack?: string
  qualitymap: Qualitymap
  language: string
  ipmap: Map
  songname_suffix?: string
  ogg_128_hash?: string
  ogg_128_filesize?: number
  ogg_320_hash?: string
  ogg_320_filesize?: number
  union_cover: string
  is_original: number
  appid_block?: string
  cpy_map?: string
}

export interface Map {
  attr0: number
}

export interface HashOffset {
  start_byte: number
  end_byte: number
  start_ms: number
  end_ms: number
  offset_hash: string
  file_type: number
  clip_hash: string
}

export interface Qualitymap {
  attr0: number
  attr1: number
  bits: string
}
