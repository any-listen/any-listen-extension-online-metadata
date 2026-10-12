export interface SonglistDetail {
  code: number
  subcode: number
  accessed_plaza_cache: number
  accessed_favbase: number
  login: string
  cdnum: number
  cdlist: Cdlist[]
  realcdnum: number
}

export interface Cdlist {
  disstid: string
  dir_show: number
  owndir: number
  dirid: number
  coveradurl: string
  dissid: number
  login: string
  uin: string
  encrypt_uin: string
  dissname: string
  logo: string
  pic_mid: string
  album_pic_mid: string
  pic_dpi: number
  isAd: number
  desc: string
  ctime: number
  mtime: number
  headurl: string
  ifpicurl: string
  nick: string
  nickname: string
  type: number
  singerid: number
  singermid: string
  isvip: number
  isdj: number
  tags: Tag[]
  songnum: number
  songids: string
  songtypes: string
  disstype: number
  dir_pic_url2: string
  song_update_time: number
  song_update_num: number
  total_song_num: number
  song_begin: number
  cur_song_num: number
  songlist: Songlist[]
  visitnum: number
  cmtnum: number
  buynum: number
  scoreavage: string
  scoreusercount: number
}

export interface Songlist {
  id: number
  type: number
  songtype: number
  mid: string
  name: string
  title: string
  subtitle: string
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  status: number
  fnote: number
  url: string
  time_public: Date
  tid: number
  sa: number
  ov: number
  vs: string[]
  singer: Singer[]
  album: Album
  mv: Mv
  ksong: Ksong
  file: File
  volume: Volume
  pay: Pay
  action: Action
}

export interface Action {
  switch: number
  msgid: number
  msgpay: number
  alert: number
  icons: number
}

export interface Album {
  id: number
  mid: string
  pmid: string
  name: string
  title: string
  subtitle: string
}

export interface File {
  media_mid: string
  size_try: number
  b_30s: number
  e_30s: number
  try_begin: number
  try_end: number
  size_24aac: number
  size_48aac: number
  size_96aac: number
  size_192aac: number
  size_192ogg: number
  size_128mp3: number
  size_320mp3: number
  size_aac: number
  size_ogg: number
  size_128: number
  size_320: number
  size_ape: number
  size_flac: number
  size_dts: number
  size_hires: number
}

export interface Ksong {
  id: number
  mid: string
}

export interface Mv {
  id: number
  vid: string
}

export interface Pay {
  pay_month: number
  price_track: number
  price_album: number
  pay_play: number
  pay_down: number
  pay_status: number
  time_free: number
}

export interface Singer {
  id: number
  mid: string
  name: string
  title: string
}

export interface Volume {
  gain: number
  peak: number
  lra: number
}

export interface Tag {
  id: number
  name: string
  pid: number
}
