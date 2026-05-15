export interface TopSongs {
  data: Data
  errcode: number
  status: number
  error: string
}

export interface Data {
  timestamp: number
  total: number
  show_line: number
  theme: Theme
  info: Info[]
}

export interface Info {
  children: any[]
  base_img: string
  rankname: string
  new_cycle: number
  banner_9: string
  album_img_9: string
  table_plaque: string
  update_frequency_type: number
  play_times: number
  img_9: string
  is_city_rank: number
  classify: number
  haschildren: number
  songinfo: Songinfo[]
  rank_cid: number
  share_bg: string
  id: number
  jump_url: string
  album_cover_color?: string
  share_logo: string
  bannerurl: string
  zone: string
  show_play_count: number
  isvol: number
  rank_id_publish_date: string
  issue: number
  img_cover: string
  custom_type: number
  intro: string
  rankid: number
  update_frequency: string
  banner7url: string
  show_play_button: number
  video_ending: string
  jump_title: string
  is_timing: number
  count_down: number
  extra?: Extra
  ranktype: number
  imgurl: string
}

export interface Extra {
  resp: Resp
}

export interface Resp {
  scheduled_release_conf: ScheduledReleaseConf
  five_year_total: number
  new_total: number
  enjoy_total: number
  recent_year_total: number
  follow_total: number
  all_total: number
  vip_total: number
  rank_tag?: RankTag[]
}

export interface RankTag {
  desc: string
  type: number
}

export interface ScheduledReleaseConf {
  scheduled_release_time: string
  latest_rank_cid: number
  latest_rank_cid_publish_date: Date
}

export interface Songinfo {
  album_audio_id: number
  trans_param: TransParam
  name: string
  author: string
  songname: string
}

export interface TransParam {
  ogg_128_hash?: string
  classmap: Map
  provider?: number
  cpy_attr0: number
  musicpack_advance: number
  display: number
  display_rate: number
  ogg_320_filesize?: number
  union_cover: string
  ipmap?: Map
  qualitymap: Qualitymap
  ogg_320_hash?: string
  hash_multitrack?: string
  cid: number
  cpy_grade?: number
  ogg_128_filesize?: number
  songname_suffix?: string
  hash_offset?: HashOffset
  pay_block_tpl: number
  language: string
  cpy_level?: number
  is_original?: number
  appid_block?: string
  free_limited?: number
  free_for_ad?: number
  audio_privilege?: number
  cpy_map?: string
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

export interface Theme {
  classify_list: any[]
  bg_image: string
  font: Font
}

export interface Font {
  nt: string
  st: string
  line: string
  bold_line: string
}
