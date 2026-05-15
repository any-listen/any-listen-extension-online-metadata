export interface SonglistSearch {
  status: number
  errcode: number
  data: Data
  error: string
}

export interface Data {
  timestamp: number
  total: number
  info: Info[]
}

export interface Info {
  specialid: number
  playcount: number
  songcount: number
  isperiodical: number
  singername: string
  slid: number
  verified: number
  nickname: string
  contain: string
  collectcount: number
  trans_param: TransParam
  specialname: string
  imgurl: string
  nper: number
  iscustom: number
  gid: string
  publishtime: Date
  intro: string
  suid: number
}

export interface TransParam {
  special_tag: number
  trans_flag: number
  iden: number
}
