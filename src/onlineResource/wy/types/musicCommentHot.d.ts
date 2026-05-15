export interface CommentHot {
  topComments: any[]
  hasMore: boolean
  hotComments: HotComment[]
  total: number
  code: number
}

export interface HotComment {
  user: User
  beReplied: any[]
  pendantData: PendantData | null
  showFloorComment: null
  status: number
  commentId: number
  content: string
  richContent: string
  contentResource: null
  time: number
  timeStr: string
  needDisplayTime: boolean
  likedCount: number
  expressionUrl: null
  commentLocationType: number
  parentCommentId: number
  decoration: unknown
  repliedMark: null
  grade: null
  userBizLevels: null
  ipLocation: IPLocation
  owner: boolean
  medal: null
  likeAnimationMap: null
  favorited: boolean
  aiCommentLabel: null
  liked: boolean
}

export interface IPLocation {
  ip: null
  location: string
  userId: number | null
}

export interface PendantData {
  id: number
  imageUrl: string
}

export interface User {
  locationInfo: null
  liveInfo: null
  anonym: number
  highlight: boolean
  avatarUrl: string
  avatarDetail: AvatarDetail | null
  userType: number
  followed: boolean
  mutual: boolean
  remarkName: null
  socialUserId: null
  vipRights: VipRights | null
  nickname: string
  authStatus: number
  expertTags: null
  experts: Record<string, string> | null
  vipType: number
  commonIdentity: null
  userId: number
  target: null
}

export interface AvatarDetail {
  userType: number
  identityLevel: number
  identityIconUrl: string
}

export interface VipRights {
  associator: Associator | null
  musicPackage: Associator | null
  redplus: Associator | null
  redVipAnnualCount: number
  redVipLevel: number
  relationType: number
  memberLogo: null
  extInfo: null
}

export interface Associator {
  vipCode: number
  rights: boolean
  iconUrl: string
}
