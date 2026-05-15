export interface HotSearch {
  code: number
  ts: number
  start_ts: number
  traceid: string
  hotkey: Hotkey
}

export interface Hotkey {
  code: number
  data: Data
}

export interface Data {
  expid: string
  ret_code: number
  track_info: any[]
  track_list_id: string
  vec_hotkey: VecHotkey[]
  vec_reckey: any[]
}

export interface VecHotkey {
  associate_item: any[]
  avatar: string
  cover_pic_url: string
  custom_param: CustomParam
  debug_info: string
  desc_icon_text: string
  desc_icon_url: string
  description: string
  description_param: DescriptionParam
  direct_id: number
  gif_url: string
  hotkey_id: string
  jump_tab: string
  jump_url: string
  kind: number
  need_top: number
  order_info: OrderInfo
  pic_url: string
  query: string
  score: string
  search_ext: string
  search_result_intervene: string
  seqence: Seqence
  song_type: number
  source: number
  source_sub_type: string
  subpos: number
  title: string
  topic: string
  type: number
}

export interface CustomParam {
  track_id: string
}

export interface DescriptionParam {
  ai_info: boolean
  description: string
  description_color: string
  description_type: number
  emoji_icon: string
}

export interface OrderInfo {
  order_num: number
  order_type: number
}

export interface Seqence {
  seqence_kind: number
  seqence_value: number
  seqence_value_show: number
}
