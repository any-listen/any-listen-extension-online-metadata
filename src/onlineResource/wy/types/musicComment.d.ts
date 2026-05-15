export interface Comment {
  code: number
  data: Data
  message: string
}

export interface Data {
  commentsTitle: string
  comments: CommentElement[]
  currentCommentTitle: string
  currentComment: null
  totalCount: number
  hasMore: boolean
  cursor: string
  sortType: number
  sortTypeList: SortTypeList[]
  style: string
  bottomAction: null
  likeAnimation: null
  newReplyExpGroupName: null
  expandCount: number
  orderType: null
  hotComments: HotComment[]
}

export interface CommentElement {
  user: User
  beReplied: BeReplied[] | null
  commentId: number
  threadId: ThreadID
  content: string
  richContent: null | string
  status: number
  time: number
  timeStr: string
  needDisplayTime: boolean
  likedCount: number
  replyCount: number
  liked: boolean
  favorited: boolean
  expressionUrl: null
  parentCommentId: number
  repliedMark: boolean
  pendantData: PendantData | null
  pickInfo: null
  showFloorComment: ShowFloorComment
  decoration: Decoration
  commentLocationType: number
  musicianSayAirborne: null
  args: null
  tag: Tag
  source: null
  resourceSpecialType: null
  extInfo: CommentEXTInfo
  commentVideoVO: null
  contentResource: ContentResource | null
  contentPicNosKey: null
  contentPicExt: null
  contentPicUrl: null
  voiceNosKey: null
  voiceWhaleId: null
  voiceDurationMillSecond: number
  grade: null
  userBizLevels: null
  userNameplates: null
  ipLocation: IPLocation
  aiCommentLabel: null
  owner: boolean
  tail: null
  hideSerialComments: null
  hideSerialTips: null
  topicList: null
  privacy: number
  medal: null
  outShowComments: any[]
  likeAnimationMap: null
  bottomTags: any[]
  airborneAction: null
  reward: null
  userTop: boolean
  highlight: boolean
  wordMatchList: null
  track: null
}

export interface BeReplied {
  user: User
  beRepliedCommentId: number
  commentId: number
  content: string
  richContent: null | string
  status: number
  expressionUrl: null
  contentResource: ContentResource | null
  contentPicNosKey: null
  contentPicUrl: null
  voiceNosKey: null
  voiceWhaleId: null
  voiceDurationMillSecond: number
  ipLocation: IPLocation
  owner: boolean
}

export interface ContentResource {
  userId: null
  userNickName: null
  resourceId: string
  resourceName: null
  resourceType: number
  threadId: null
  artists: any[]
  title: string
  subTitle: string
  tag: string
  coverUrl: string
  url: null
  shareUrl: null
  contentUrl: null
  duration: null
}

export interface IPLocation {
  ip: null
  location: string
  userId: number | null
}

export interface User {
  avatarDetail: AvatarDetail | null
  commonIdentity: null
  locationInfo: null
  liveInfo: null
  followed: boolean
  vipRights: VipRights | null
  relationTag: null
  anonym: number
  encryptUserId: string
  userId: number
  userType: number
  nickname: string
  avatarUrl: string
  authStatus: number
  expertTags: null
  experts: Record<string, string> | null
  vipType: number
  remarkName: null
  isHug: boolean
  socialUserId: null
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

export interface Decoration {
  repliedByAuthorCount: number
}

export interface CommentEXTInfo {
  forwardEvent: number
}

export interface PendantData {
  id: number
  imageUrl: string
}

export interface ShowFloorComment {
  replyCount: number
  comments: null
  showReplyCount: boolean
  topCommentIds: null
  target: null
}

export interface Tag {
  datas: any[] | null
  extDatas: EXTData[]
  contentDatas: any[] | null
  contentPicDatas: any[] | null
  relatedCommentIds: null
}

export interface EXTData {
  text: string
  iconUrl: null
  type: number
  targetUrl: string
  recommendType: null
  commentType: null
}

export enum ThreadID {
  RSo4_1973665667 = 'R_SO_4_1973665667',
}

export interface HotComment {
  user: User
  beReplied: null
  commentId: number
  threadId: ThreadID
  content: string
  richContent: null | string
  status: number
  time: number
  timeStr: string
  needDisplayTime: boolean
  likedCount: number
  replyCount: number
  liked: boolean
  favorited: boolean
  expressionUrl: null
  parentCommentId: number
  repliedMark: boolean
  pendantData: PendantData | null
  pickInfo: null
  showFloorComment: ShowFloorComment
  decoration: Decoration
  commentLocationType: number
  musicianSayAirborne: null
  args: null
  tag: Tag
  source: null
  resourceSpecialType: null
  extInfo: HotCommentEXTInfo
  commentVideoVO: CommentVideoVO
  contentResource: null
  contentPicNosKey: null
  contentPicExt: null
  contentPicUrl: null
  voiceNosKey: null
  voiceWhaleId: null
  voiceDurationMillSecond: number
  grade: null
  userBizLevels: null
  userNameplates: null
  ipLocation: IPLocation
  aiCommentLabel: null
  owner: boolean
  tail: null
  hideSerialComments: null
  hideSerialTips: null
  topicList: null
  privacy: number
  medal: null
  outShowComments: any[]
  likeAnimationMap: unknown
  bottomTags: any[]
  airborneAction: null
  reward: null
  userTop: boolean
  highlight: boolean
  wordMatchList: null
  track: null
}

export interface CommentVideoVO {
  showCreationEntrance: boolean
  allowCreation: boolean
  creationOrpheusUrl: null
  playOrpheusUrl: null
  videoCount: number
  forbidCreationText: string
}

export interface HotCommentEXTInfo {
  forwardEvent?: number
  statistics: Statistics
}

export interface Statistics {
  ext_dislike: number
  status_60?: number
  status_80?: number
  status_59?: number
  status_58?: number
}

export interface SortTypeList {
  sortType: number
  sortTypeName: string
  target: string
}
