export interface SonglistDetailInfo {
  code: string
  info: string
  data: Data
}

export interface Data {
  resourceType: string
  title: string
  musicListId: string
  publishTime: string
  summary: string
  imgItem: ImgItem
  originalImgUrl: string
  ownerId: string
  ownerName: string
  musicNum: number
  opNumItem: OpNumItem
  havePrivatePic: string
  tags: Tag[]
  type: string
  ownerPic: string
  status: number
  userIdentityInfoItems: any[]
  channel: string
  officialConfig: OfficialConfig
}

export interface ImgItem {
  img: string
  imgOri: string
  webpImg: string
}

export interface OfficialConfig {
  immersive: boolean
  topConfig: string
  topConfigType: string
  actionUrl: string
  listTextColor: string
  listBgColor: string
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
}

export interface Tag {
  tagId: string
  tagName: string
}
