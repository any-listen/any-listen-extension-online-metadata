export interface SonglistAI {
  code: number
  ts: number
  start_ts: number
  traceid: string
  playlist: Playlist
}

export interface Playlist {
  code: number
  data: Data
}

export interface Data {
  retcode: number
  msg: string
  content: Content
}

export interface Content {
  total_cnt: number
  v_item: VItem[]
}

export interface VItem {
  basic: Basic
  text: string
}

export interface Basic {
  creator: Creator
  tid: number
  dirid: number
  title: string
  desc: string
  cover: Cover
  v_tag: null
  fav_cnt: number
  play_cnt: number
  create_time: number
  censor_time: number
  modify_time: number
  level: number
  status: number
  fav: number
  song_cnt: number
  tjreport: string
  edge_mark: string
  type: number
  subtype: number
  is_official: boolean
  reddot_time: number
  read_time: number
  reddot_show: boolean
  comment_cnt: number
  dirshow: number
  ext: null
  expose: number
  bExpose: boolean
  modemask: number
  ai_trace: string
}

export interface Cover {
  id: number
  mid: string
  small_url: string
  medium_url: string
  big_url: string
  default_url: string
  pic_url2: string
  layerUrl: string
  ext1: string
  ext2: string
  bHitDiyAbt: boolean
}

export interface Creator {
  uin: string
  encrypt_uin: string
  nick: string
  avatar: string
  identity: number
  icon: string
  v_type: null
  follow: number
}
