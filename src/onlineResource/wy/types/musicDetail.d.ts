export interface MusicDetail {
  songs: Song[]
  privileges: Privilege[]
  code: number
}

export interface Privilege {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  maxBrLevel: Level
  playMaxBrLevel: Level
  downloadMaxBrLevel: Level
  plLevel: Level
  dlLevel: Level
  flLevel: Level
  rscl: null
  freeTrialPrivilege: FreeTrialPrivilege
  rightSource: number
  chargeInfoList: ChargeInfoList[]
  code: number
  message: null
  plLevels: null
  dlLevels: null
  ignoreCache: null
  bd: null
}

export interface ChargeInfoList {
  rate: number
  chargeUrl: null
  chargeMessage: null
  chargeType: number
}

export type Level = 'exhigh' | 'hires' | 'lossless' | 'none' | 'standard'

export interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  listenType: null
  cannotListenReason: null
  playReason: null
  freeLimitTagType: null
}

export interface Song {
  name: string
  mainTitle: null | string
  additionalTitle: null | string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia: string[]
  pop: number
  st: number
  rt: null | string
  fee: number
  v: number
  crbt: null
  cf: string
  al: Al
  dt: number
  h: L | null
  m: L | null
  l: L
  sq: L | null
  hr: L | null
  a: null
  cd: string
  no: number
  rtUrl: null
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: OriginSongSimpleData | null
  tagPicList: null
  resourceState: boolean
  version: number
  songJumpInfo: null
  entertainmentTags: null
  awardTags: null
  displayTags: string[]
  artistClassics: boolean
  markTags: any[]
  songFeature: null
  single: number
  noCopyrightRcmd: null
  mv: number
  rtype: number
  rurl: null
  mst: number
  cp: number
  publishTime: number
  tns?: string[]
}

export interface Al {
  id: number
  name: string
  picUrl: string
  tns: string[]
  pic_str?: string
  pic: number
}

export interface Ar {
  id: number
  name: string
  tns: any[]
  alias: any[]
}

export interface L {
  br: number
  fid: number
  size: number
  vd: number
  sr: number
}

export interface OriginSongSimpleData {
  songId: number
  name: string
  artists: AlbumMeta[]
  albumMeta: AlbumMeta
}

export interface AlbumMeta {
  id: number
  name: string
}
