export interface Songlist {
  playlists: Playlist[]
  total: number
  code: number
  more: boolean
  cat: string
}

export interface Playlist {
  name: string
  id: number
  trackNumberUpdateTime: number
  status: number
  userId: number
  createTime: number
  updateTime: number
  subscribedCount: number
  trackCount: number
  cloudTrackCount: number
  coverImgUrl: string
  iconImgUrl: null
  coverImgId: number
  description: string
  tags: string[]
  playCount: number
  trackUpdateTime: number
  specialType: number
  totalDuration: number
  creator: Creator
  tracks: null
  subscribers: Creator[]
  subscribed: null
  commentThreadId: string
  newImported: boolean
  adType: number
  highQuality: boolean
  privacy: number
  ordered: boolean
  anonimous: boolean
  coverStatus: number
  recommendInfo: null
  socialPlaylistCover: null
  recommendText: null
  coverText: null
  relateResType: null
  relateResId: null
  tsSongCount: number
  algType: null
  playlistType: string
  uiPlaylistType: string
  originalCoverId: number
  backgroundImageId: number
  backgroundImageUrl: null
  topTrackIds: null
  promptedMgcInfo: null
  title: null
  subTitle: null
  backgroundText: null
  shareCount: number
  coverImgId_str?: string
  alg: string
  commentCount: number
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
