export interface HotTag {
  code: number
  curTime: number
  data: HotTagDatum[]
  msg: string
  profileId: string
  reqId: string
  tId: string
}

export interface HotTagDatum {
  img: string
  mdigest: string
  data: DatumDatum[]
  name: string
  id: string
  type: string
}

export interface DatumDatum {
  extend: string
  img: string
  digest: string
  name: string
  isnew: string
  id: string
}
