export interface SonglistDetailDigest5Info {
  total: string
  node: string
  pn: string
  rn: string
  ninfo: Ninfo
  child: Ninfo[]
}

export interface Ninfo {
  id: string
  name: string
  disname: string
  info: string
  source: string
  sourceid: string
  pic: string
  like: string
  listen: string
  tips: string
  isnew: string
  newcnt: string
  extend: string
  intro: string
  pc_extend: string
  pic5: string
  pic2: string
  child?: any[]
}
