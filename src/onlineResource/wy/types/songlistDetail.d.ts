export interface SonglistDetail {
  code: number
  relatedVideos: null
  playlist: Playlist
  urls: null
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
  tags: string[]
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
  subscribers: Creator[]
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
  bizExtInfo: string
  promptedMgcInfo: null
  mixPodcastPlaylist: boolean
  podcastTrackCount: number
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
  avatarDetail: AvatarDetail | null
  backgroundImgIdStr: string
  avatarImgIdStr: string
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
  alg: null | string
  uid: number
  rcmdReason: string
  rcmdReasonTitle: string
  sc: null
  f: null
  sr: null
  dpr: null
  tr: number
}

export interface Track {
  name: string
  mainTitle: null
  additionalTitle: null
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
  h: H
  m: H
  l: H
  sq: H
  hr: H | null
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
  alg: null | string
  displayReason: null
  pubDJProgramData: null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
  publishTime: number
}

export interface Al {
  id: number
  name: string
  picUrl: string
  tns: any[]
  pic_str: string
  pic: number
}

export interface Ar {
  id: number
  name: string
  tns: any[]
  alias: any[]
}

export interface H {
  br: number
  fid: number
  size: number
  vd: number
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
  None = 'none',
}

export type MaxBrLevel = 'hires' | 'lossless'

export interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  listenType: null
  cannotListenReason: null
  playReason: null
  freeLimitTagType: null
}
