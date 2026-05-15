export interface Tag {
  code: number
  curTime: number
  data: TagDatum[]
  msg: string
  profileId: string
  reqId: string
  tId: string
}

export interface TagDatum {
  img: string
  mdigest: string
  data: DatumDatum[]
  name: string
  id: string
  type: string
  img1: string
}

export interface DatumDatum {
  extend: string
  img: string
  digest: string
  name: string
  isnew: string
  id: string
}
