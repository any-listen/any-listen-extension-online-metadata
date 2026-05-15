export interface SonglistInfo {
  status: number
  data: Data
}

export interface Data {
  JS_CSS_DATE: number
  kg_domain: string
  hotTag: HotTag
  tagids: string
  params: Params
}

export interface HotTag {
  status: number
  data: Record<string, DatumValue>
  info: string
  has_next: number
  class_data: ClassDatum[]
  over_time: number
  cache_time: Date
}

export interface ClassDatum {
  id: string
  Name: string
  adduser: string
  addtime: Date
  c_type: string
  htlistfieldorder: null
  permissions: string
}

export interface DatumValue {
  addtime: Date
  adduser: string
  special_name: string
  special_id: string
  sort: string
  id: number
  img: null
}

export interface Params {
  c: string
  pagesize: number
  p: number
  t: number
  total: number
  subtab: number
}

export interface DatumElement {
  sort: number
  pname: string
  parent_id: number
  id: number
  img: null | string
  name: string
  img_2014: string
  banner_2014: string
}
