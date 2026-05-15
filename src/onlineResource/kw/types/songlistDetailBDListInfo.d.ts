export interface SonglistDetailBDListInfo {
  code: number
  msg: string
  reqId: string
  data: Data
  profileId: string
  curTime: number
}

export interface Data {
  id: number
  name: string
  pic: string
  creatorId: number
  creatorName: string
  creatorIcon: string
  description: string
  praise: number
  musicCount: number
  isPrivate: number
  playNum: number
  lastPlayTime: string
  sourceType: number
  collectedCnt: number
}
