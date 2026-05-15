export interface SonglistDetailBDUserPub {
  code: number
  msg: string
  reqId: string
  data: Data
  profileId: string
  curTime: number
}

export interface Data {
  id: number
  userInfo: UserInfo
  isPrivateFriend: number
  isSendInvite: number
  isBind: number
  hasName: number
  payInfo: PayInfo
  payRights: unknown
  bid: number
  ipCity: string
}

export interface PayInfo {
  isVip: number
  isVipBoolean: boolean
  isSigned: number
  isSignedBoolean: boolean
  signType: number
  signPayType: number
  vipType: number
  isPayVipBoolean: boolean
  isBigVipBoolean: boolean
  isBigPayVipBoolean: boolean
  isCtVipBoolean: boolean
  isCtPayVipBoolean: boolean
  isActVipBoolean: boolean
  payVipType: number
  actVipType: number
  expireDate: number
  payExpireDate: number
  bigExpireDate: number
  bigPayExpireDate: number
  ctExpireDate: number
  ctPayExpireDate: number
  actExpireDate: number
  signedCount: number
  isFreeCtVip: boolean
}

export interface UserInfo {
  id: number
  nickname: string
  headImg: string
  bgImg: string
  authType: number
  email: string
  prov: string
  city: string
  address: string
  description: string
  status: number
  createTime: Date
  updateTime: Date
  isVip: number
  vipType: number
  payVipType: number
  ipCity: string
  gender: number
}
