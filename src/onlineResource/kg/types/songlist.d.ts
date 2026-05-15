export interface Songlist {
  special_db: SpecialDB[]
  status: number
}

export interface SpecialDB {
  trans_param: TransParam
  play_count: number
  specialname: string
  nickname: string
  total_play_count: string
  grade_int: string
  grade_float: number
  intro: string
  suid: number
  srid: number
  quality: number
  grade: number
  img: string
  song_count: number
  specialid: number
  publish_time: Date
  collect_count: number | string
  recommend_sort: number
  recommend_first: number
  recommend: number
  sync: number
  global_collection_id: string
  author: string
}

export interface TransParam {
  special_tag: number
}
