export interface TopSongsDetail {
  code: number
  relatedVideos: null
  playlist: Playlist
  urls: URL[]
  privileges: Privilege[]
  sharedPrivilege: null
  resEntrance: null
  fromUsers: null
  fromUserCount: number
  songFromUsers: null
}

export interface Playlist {
  id: number
  name: string
  coverImgId: number
  coverImgUrl: string
  coverImgId_str: string
  adType: number
  userId: number
  createTime: number
  status: number
  opRecommend: boolean
  highQuality: boolean
  newImported: boolean
  updateTime: number
  trackCount: number
  specialType: number
  privacy: number
  trackUpdateTime: number
  commentThreadId: string
  playCount: number
  trackNumberUpdateTime: number
  subscribedCount: number
  cloudTrackCount: number
  ordered: boolean
  description: string
  tags: any[]
  updateFrequency: null
  backgroundCoverId: number
  backgroundCoverUrl: null
  titleImage: number
  titleImageUrl: null
  detailPageTitle: null
  englishTitle: null
  officialPlaylistType: null
  copied: boolean
  relateResType: null
  coverStatus: number
  subscribers: any[]
  subscribed: null
  creator: Creator
  tracks: Track[]
  videoIds: null
  videos: null
  trackIds: TrackID[]
  bannedTrackIds: null
  mvResourceInfos: null
  shareCount: number
  commentCount: number
  remixVideo: null
  newDetailPageRemixVideo: null
  sharedUsers: null
  historySharedUsers: null
  gradeStatus: string
  score: null
  algTags: null
  distributeTags: any[]
  trialMode: number
  displayTags: null
  displayUserInfoAsTagOnly: boolean
  playlistType: string
  bizExtInfo: any
  promptedMgcInfo: null
  mixPodcastPlaylist: boolean
  podcastTrackCount: number
  ToplistType: string
}

export interface Creator {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags: null
  experts: null
  djStatus: number
  vipType: number
  remarkName: null
  authenticationTypes: number
  avatarDetail: AvatarDetail
  avatarImgIdStr: string
  backgroundImgIdStr: string
  anchor: boolean
  avatarImgId_str: string
}

export interface AvatarDetail {
  userType: number
  identityLevel: number
  identityIconUrl: string
}

export interface TrackID {
  id: number
  v: number
  t: number
  at: number
  alg: Alg | null
  uid: number
  rcmdReason: string
  rcmdReasonTitle: RcmdReasonTitle
  sc: null
  f: null
  sr: null
  dpr: null | string
  tr: number
  ratio: number
  lr?: number
}

export enum Alg {
  OpsMusic1 = 'ops-music-1',
}

export enum RcmdReasonTitle {
  编辑推荐 = '编辑推荐',
}

export interface Track {
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
  displayTags: null
  single: number
  noCopyrightRcmd: null
  alg: Alg | null
  displayReason: null | string
  pubDJProgramData: null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
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

export enum Level {
  Exhigh = 'exhigh',
  Hires = 'hires',
  Lossless = 'lossless',
  None = 'none',
  Standard = 'standard',
}

export interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  listenType: null
  cannotListenReason: null
  playReason: null
  freeLimitTagType: null
}

export interface URL {
  id: number
  url: null
  br: number
  size: number
  md5: null
  code: number
  expi: number
  type: null
  gain: number
  peak: null
  closedGain: number
  closedPeak: number
  fee: number
  uf: null
  payed: number
  flag: number
  canExtend: boolean
  freeTrialInfo: null
  level: null
  encodeType: null
  channelLayout: null
  freeTrialPrivilege: FreeTrialPrivilege
  freeTimeTrialPrivilege: FreeTimeTrialPrivilege
  urlSource: number
  rightSource: number
  podcastCtrp: null
  effectTypes: null
  time: number
  message: null
  levelConfuse: null
  musicId: null
  accompany: null
  sr: number
  auEff: null
}

export interface FreeTimeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  type: number
  remainTime: number
}
