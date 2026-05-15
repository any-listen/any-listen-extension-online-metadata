export interface Comment {
  code: string
  info: string
  data: Data
}

export interface Data {
  commentNums: string
  comments: CommentElement[]
  hotComments: HotComment[]
  cfgHotCount: string
  targetInfo: TargetInfo
}

export interface CommentElement {
  haveThumb: string
  resourceType: string
  approveStatus: string
  user: User
  opNumItem: OpNumItem
  commentType: string
  commentId: string
  commentTime: string
  commentInfo: string
  targetResourceType: string
  targetResourceId: string
  recommended: boolean
  replyComments: any[]
  replyTotalCount: number
}

export interface OpNumItem {
  playNum: number
  playNumDesc: string
  keepNum: number
  keepNumDesc: string
  commentNum: number
  commentNumDesc: string
  shareNum: number
  shareNumDesc: string
  orderNumByWeek: number
  orderNumByWeekDesc: string
  orderNumByTotal: number
  orderNumByTotalDesc: string
  thumbNum: number
  thumbNumDesc: string
  followNum: number
  followNumDesc: string
  subscribeNum: number
  subscribeNumDesc: string
  livePlayNum: number
  livePlayNumDesc: string
  popularNum: number
  popularNumDesc: string
  bookingNum: number
  bookingNumDesc: string
  settingNum: number
  settingNumDesc: string
  callNum: number
  callNumDesc: string
  callingPlayNum: number
  callingPlayNumDesc: string
  callingPlayDuration: number
  callingPlayDurationDesc: string
  calledPlayDuration: number
  calledPlayDurationDesc: string
  ringtoneAppPlayNum: number
  ringtoneAppPlayNumDesc: string
  ringtoneAppSettingNum: number
  ringtoneAppSettingNumDesc: string
  callingPlayDefaultNum: number
  callingPlayDefaultNumDesc: string
  playDefaultNum: number
  playDefaultDesc: string
  rewardUserNum: number
  rewardUserNumDesc: string
  rewardTotalNum: number
  rewardTotalNumDesc: string
  aiSongTotalNum: number
  aiSongTotalNumDesc: string
  dislikeNum: number
  dislikeNumDesc: string
  loveLetterNum: number
  loveLetterNumDesc: string
}

export interface User {
  userType: string
  userId: string
  nickName: string
  bigIcon?: string
  middleIcon?: string
  auditingIcon: boolean
  smallIcon: string
  userIdentityInfoItems?: UserIdentityInfoItem[]
  userMemberInfos?: UserMemberInfo[]
  userTagInfos: UserTagInfo[]
  cancelled: boolean
  userCommentIcons: UserCommentIcon[]
}

export interface UserCommentIcon {
  iconId: string
  iconName: string
  iconPic: string
  iconActionUrl: string
}

export interface UserIdentityInfoItem {
  id: string
  type: number
  name: string
  subType: number
  icon?: string
  actionUrl?: string
}

export interface UserMemberInfo {
  type: number
  name: string
  icon: string
  actionUrl: string
}

export interface UserTagInfo {
  type: string
  name: string
  icon: string
  actionUrl: string
}

export interface HotComment {
  haveThumb: string
  resourceType: string
  approveStatus: string
  user: User
  opNumItem: OpNumItem
  commentType: string
  commentId: string
  commentTime: string
  commentInfo: string
  targetResourceType: string
  targetResourceId: string
  recommended: boolean
  replyComments: ReplyComment[]
  replyTotalCount: number
  topTagInfo?: TopTagInfo
}

export interface ReplyComment {
  haveThumb: string
  resourceType: string
  approveStatus: string
  user: User
  commentType: string
  replyId: string
  replyTime: string
  replyInfo: string
  targetComment: string
  targetUser?: User
}

export interface TopTagInfo {
  id: string
  code: string
  name: string
}

export interface TargetInfo {
  pic: string
  title: string
  subTitle: string
  resourceId: string
  resourceType: string
  routeUrl: string
}
