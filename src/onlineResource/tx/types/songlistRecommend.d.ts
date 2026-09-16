export interface SonglistRecommend {
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
  HeadRsp: DRsp
  FeedRsp: DRsp
  Msg: string
}

export interface DRsp {
  Msg: string
  List: List[] | null
  HasMore: boolean
  FromLimit: number
}

export interface List {
  Playlist: PlaylistClass
  WhereFrom: string
  ext: ListEXT
}

export interface PlaylistClass {
  basic: Basic
  content: Content
  bHit: boolean
  diy: Diy
}

export interface Basic {
  creator: Creator
  tid: number
  dirid: number
  title: string
  desc: string
  cover: Cover
  v_tag: VTag[]
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
  ext: BasicEXT
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
  v_type: any[]
  follow: number
}

export interface BasicEXT {
  bHitDiyAbt: string
}

export interface VTag {
  id: number
  name: string
}

export interface Content {
  v_item: any[]
}

export interface Diy {
  tid: number
  diyInfo: string
}

export interface ListEXT {
  tjreport: string
}
