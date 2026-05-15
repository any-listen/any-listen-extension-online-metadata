export interface Songlist {
  code: number
  curTime: number
  data: Data
  msg: string
  profileId: string
  reqId: string
  tId: string
}

export interface Data {
  total: number
  data: Datum[]
  rn: number
  pn: number
}

export interface Datum {
  img: string
  uname: string
  lossless_mark: string
  favorcnt: string
  isnew: string
  extend: string
  uid: string
  total: string
  commentcnt: string
  imgscript: string
  digest: string
  name: string
  listencnt: string
  id: string
  attribute: string
  radio_id: string
  desc: string
  info: string
}
