export interface Songlist {
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
  total: number
  v_playlist: VPlaylist[]
}

export interface VPlaylist {
  access_num: number
  album_pic_mid: string
  censor_remark: any[]
  censor_status: number
  censor_time: number
  commit_time: number
  cover_mid: string
  cover_url_big: string
  cover_url_medium: string
  cover_url_small: string
  create_time: number
  creator_info: CreatorInfo
  creator_uin: number
  desc: string
  dirid: number
  fav_num: number
  modify_time: number
  pic_mid: string
  rcmdcontent: string
  rcmdtemplate: string
  score: number
  song_ids: number[]
  song_types: number[]
  tag_ids: number[]
  tag_names: any[]
  tid: number
  title: string
  tjreport: string
}

export interface CreatorInfo {
  avatar: string
  is_dj: number
  nick: string
  taoge_avatar: string
  taoge_nick: string
  uin: number
  vip_type: number
}
