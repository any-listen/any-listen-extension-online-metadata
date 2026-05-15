export interface Tag {
  status: number
  data: Data
}

export interface Data {
  JS_CSS_DATE: number
  kg_domain: string
  hotTag: HotTag
  tagids: Tagids
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

export interface Tagids {
  主题: 主题
  语种: 主题
  风格: 主题
  年代: 主题
  心情: 主题
  场景: 主题
}

export interface 主题 {
  id: number
  data: DatumElement[]
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
