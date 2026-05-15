export interface SonglistTag {
  code: number
  ts: number
  start_ts: number
  traceid: string
  tags: Tags
}

export interface Tags {
  code: number
  data: Data
}

export interface Data {
  v_group: VGroup[]
}

export interface VGroup {
  group_color: string
  group_icon: string
  group_id: number
  group_name: string
  group_pos: number
  v_item: VItem[]
}

export interface VItem {
  cover: string
  id: number
  name: string
  status: number
  tjreport: string
  type: number
}
