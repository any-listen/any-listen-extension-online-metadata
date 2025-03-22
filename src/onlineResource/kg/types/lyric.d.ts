export interface LyricSearch {
  status: number
  info: string
  errcode: number
  errmsg: string
  keyword: string
  proposal: string
  has_complete_right: number
  companys: string
  ugc: number
  ugccount: number
  expire: number
  candidates: Candidate[]
  ugccandidates: any[]
  artists: Artist[]
  ai_candidates: any[]
}

export interface Artist {
  identity: number
  base: Base
}

export interface Base {
  author_id: number
  author_name: string
  is_publish: number
  avatar: string
  identity: number
  type: number
  country: string
  language: string
  birthday?: Date
}

export interface Candidate {
  id: string
  product_from: string
  accesskey: string
  can_score: boolean
  singer: string
  song: string
  duration: number
  uid: string
  nickname: string
  origiuid: string
  transuid: string
  sounduid: string
  originame: string
  transname: string
  soundname: string
  parinfo: Array<Array<number | string>>
  parinfoExt: ParinfoEXT[]
  language: string
  krctype: number
  hitlayer: number
  hitcasemask: number
  adjust: number
  score: number
  contenttype: number
  content_format: number
  download_id: string
}

export interface ParinfoEXT {
  entry: string
}

export interface Lyric {
  status: number
  info: string
  error_code: number
  fmt: string
  contenttype: number
  _source: string
  charset: string
  content: string
  id: string
}

export interface LyricLangs {
  content: Array<{
    lyricContent: Array<string[]>
    type: number
    language: number
  }>
  version: number
}
