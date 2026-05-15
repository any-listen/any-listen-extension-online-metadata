export interface TopSongsDetail {
  code: number
  ts: number
  start_ts: number
  traceid: string
  toplist: Toplist
}

export interface Toplist {
  code: number
  data: ToplistData
}

export interface ToplistData {
  data: DataData
  songInfoList: SongInfoList[]
  extInfoList: any[]
  songTagInfoList: null
  indexInfoList: null
}

export interface DataData {
  topId: number
  recType: number
  topType: number
  updateType: number
  title: string
  titleDetail: string
  titleShare: string
  titleSub: string
  intro: string
  cornerMark: number
  period: string
  updateTime: string
  history: History
  listenNum: number
  totalNum: number
  song: Song[]
  headPicUrl: string
  frontPicUrl: string
  mbFrontPicUrl: string
  mbHeadPicUrl: string
  pcSubTopIds: any[]
  pcSubTopTitles: any[]
  subTopIds: any[]
  adJumpUrl: string
  h5JumpUrl: string
  url_key: string
  url_params: string
  tjreport: string
  rt: number
  updateTips: string
  bannerText: string
  AdShareContent: string
  abt: string
  cityId: number
  provId: number
  sinceCV: number
  musichallTitle: string
  musichallSubtitle: string
  musichallPicUrl: string
  specialScheme: string
  mbFrontLogoUrl: string
  mbHeadLogoUrl: string
  cityName: string
  magicColor: MagicColor
  topAlbumURL: string
  groupType: number
  icon: number
  adID: number
  mbIntroWebUrl: string
  mbLogoUrl: string
  mbFrontLogoUrl2: string
  logoImgURL: string
  logoImgURL2: string
}

export interface History {
  year: any[]
  subPeriod: any[]
}

export interface MagicColor {
  r: number
  g: number
  b: number
}

export interface Song {
  rank: number
  rankType: number
  rankValue: string
  recType: number
  songId: number
  vid: string
  albumMid: string
  title: string
  singerName: string
  singerMid: string
  songType: number
  uuidCnt: number
  cover: string
  mvid: number
}

export interface SongInfoList {
  id: number
  type: number
  mid: string
  name: string
  title: string
  subtitle: string
  singer: Singer[]
  album: Album
  mv: Mv
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  time_public: string
  status: number
  fnote: number
  file: File
  pay: Pay
  action: Record<string, number>
  ksong: Ksong
  volume: Volume
  label: string
  url: string
  bpm: number
  version: number
  trace: string
  data_type: number
  modify_stamp: number
  pingpong: string
  aid: number
  ppurl: string
  tid: number
  ov: number
  sa: number
  es: string
  vs: string[]
  vi: number[]
  ktag: string
  vf: number[]
  va: any[]
}

export interface Album {
  id: number
  mid: string
  name: string
  title: string
  subtitle: string
  time_public: string
  pmid: string
}

export interface File {
  media_mid: string
  size_24aac: number
  size_48aac: number
  size_96aac: number
  size_192ogg: number
  size_192aac: number
  size_128mp3: number
  size_320mp3: number
  size_ape: number
  size_flac: number
  size_dts: number
  size_try: number
  try_begin: number
  try_end: number
  url: string
  size_hires: number
  hires_sample: number
  hires_bitdepth: number
  b_30s: number
  e_30s: number
  size_96ogg: number
  size_360ra: any[]
  size_dolby: number
  size_new: number[]
}

export interface Ksong {
  id: number
  mid: string
}

export interface Mv {
  id: number
  vid: string
  name: string
  title: string
  vt: number
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
  type: number
  uin: number
  pmid: string
}

export interface Volume {
  gain: number
  peak: number
  lra: number
}
