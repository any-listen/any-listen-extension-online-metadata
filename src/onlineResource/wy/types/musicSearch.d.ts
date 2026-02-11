export interface MusicSearch {
  code: number
  data: Data
  message: string
  trp: Trp
}

export interface Data {
  resources: Resource[]
  totalCount: number
  hasMore: boolean
  searchQcReminder: null
  hlWords: string[]
  tagSelectSongTagInfoDetails: null
  noResultInfo: null
  sceneTransmissionInfo: SceneTransmissionInfo
}

export interface Resource {
  resourceName: ResourceName
  resourceType: Type
  resourceId: string
  baseInfo: BaseInfo
  extInfo: EXTInfo
  relatedResources: any[]
  action: Action
  actionType: ActionType
  foldId: string
  type: Type
  alg: string
}

export enum Action {
  PlayOneSong = 'play_one_song',
}

export enum ActionType {
  SearchActionPlay = 'search_action_play',
}

export interface BaseInfo {
  simpleSongData: SimpleSongData
  metaData: MetaDatum[]
}

export enum MetaDatum {
  Digital = 'DIGITAL',
  HiRes = 'HiRes',
  Original = 'ORIGINAL',
  Sq = 'SQ',
  Vip = 'VIP',
  VipDownload = 'VIP_DOWNLOAD',
}

export interface SimpleSongData {
  name: string
  mainTitle: any | null
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
  m: L
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
  displayTags: null
  markTags: any[]
  single: number
  noCopyrightRcmd: null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
  publishTime: number
  privilege: Privilege
}

export interface Al {
  id: number
  name: string
  picUrl: string
  tns: any[]
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
  name: any
  artists: AlbumMeta[]
  albumMeta: AlbumMeta
}

export interface AlbumMeta {
  id: number
  name: any
}

export interface Privilege {
  id: number
  fee: number
  payed: number
  realPayed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  pc: null
  toast: boolean
  flag: number
  paidBigBang: boolean
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  maxBrLevel: MaxBrLevel
  playMaxBrLevel: MaxBrLevel
  downloadMaxBrLevel: MaxBrLevel
  plLevel: LLevel
  dlLevel: LLevel
  flLevel: LLevel
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

export enum LLevel {
  Exhigh = 'exhigh',
  Hires = 'hires',
  None = 'none',
}

export enum MaxBrLevel {
  Exhigh = 'exhigh',
  Higher = 'higher',
  Hires = 'hires',
  Lossless = 'lossless',
  None = 'none',
}

export interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  listenType: null
  cannotListenReason: number | null
  playReason: null
  freeLimitTagType: null
}

export interface EXTInfo {
  algClickableTags: AlgClickableTag[]
  songAlias: string
  artistTns: string
  lyrics: Lyrics
  songCreator: null
  memberGuidanceInfo: null
  noCopyRight: boolean
  hasNoCopyrightRcmd: boolean
  noCopyrightRcmdStyle: number
  payType: null
  albumUrl: null
  algAlbumName: null
  resourceHotExplainDTO: null
  showVideoTip: boolean
  tsShowFlag: boolean
  starCount: number
  stared: boolean
  notDirectJumpPlayerPage: boolean
  recommendText: null
  officialTags: null
  specialTags: any[] | null
  overrideTitle: null
  overrideSubTitle: null
  overrideImageType: null
  overrideImageUrl: null
}

export interface AlgClickableTag {
  clickable: boolean
  boardId: null | string
  text: string
  url: null | string
  reasonId: null | string
  reasonType: number | null
  reasonTag: null | string
  sceneTag: null | string
  resourceId: string
}

export interface Lyrics {}

export enum ResourceName {
  单曲 = '单曲',
}

export enum Type {
  Song = 'song',
}

export interface SceneTransmissionInfo {
  moreSongRcmd: string
}

export interface Trp {
  rules: string[]
}
