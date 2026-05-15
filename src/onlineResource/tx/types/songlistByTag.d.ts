export interface SonglistByTag {
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
  content: Content
  msg: string
  retcode: number
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
  bExpose: boolean
  censor_time: number
  comment_cnt: number
  cover: Cover
  create_time: number
  creator: Creator
  desc: string
  dirid: number
  dirshow: number
  edge_mark: string
  expose: number
  ext: EXT
  fav: number
  fav_cnt: number
  is_official: boolean
  level: number
  modify_time: number
  play_cnt: number
  read_time: number
  reddot_show: boolean
  reddot_time: number
  song_cnt: number
  status: number
  subtype: number
  tid: number
  title: string
  tjreport: string
  type: number
  v_tag: VTag[]
}

export interface Cover {
  bHitDiyAbt: boolean
  big_url: string
  default_url: string
  ext1: string
  ext2: string
  id: number
  layerUrl: string
  medium_url: string
  mid: string
  pic_url2: string
  small_url: string
}

export interface Creator {
  avatar: string
  encrypt_uin: string
  follow: number
  icon: string
  identity: number
  nick: string
  uin: string
  v_type: any[]
}

export interface EXT {
  bHitDiyAbt: string
}

export interface VTag {
  id: number
  name: string
}
