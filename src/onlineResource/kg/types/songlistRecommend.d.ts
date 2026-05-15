export interface SonglistRecommend {
  data: Data
  status: number
  error_code: number
}

export interface Data {
  has_next: number
  bi_biz: string
  session: string
  alg_id: number
  special_list: SpecialList[]
  OlexpIds: string
  show_time: number
  all_client_playlist_flag: number
  refresh_time: number
}

export interface SpecialList {
  abtags?: Abtag[]
  sync: number
  specialid: number
  flexible_cover: string
  list_info_trans_param: ListInfoTransParam
  bz_status: number
  singername: string
  percount: number
  alg_path: string
  from: number
  tags: Tag[]
  ugc_talent_review: number
  slid: number
  type: number
  nickname: string
  show: string
  collectType: number
  collectcount: number
  trans_param: TransParam
  report_info: string
  specialname: string
  imgurl: string
  play_count: number
  pic: string
  from_hash: string
  from_tag: number
  publishtime: Date
  global_collection_id: string
  intro: string
  suid: number
}

export interface Abtag {
  name: string
}

export interface ListInfoTransParam {
  special_tag: number
  iden: number
  trans_flag: number
  skin?: Skin
}

export interface Skin {
  display_version_userids: DisplayVersionUserids
  font_color: string
  module_type: string
  id: string
  background_info_type: string
  used_count: number
  module_theme_info: ModuleThemeInfo
  free_start: string
  vip_type: number
  resource_type: number
  free_end: string
  background_info: BackgroundInfo
  title: string
  status_bar_height: number
  preview: Preview
  thumbnail: string
}

export interface BackgroundInfo {
  color_info: ColorInfo
  gradient_info: GradientInfo
  blur_info: BlurInfo
  image_info: ImageInfo
}

export interface BlurInfo {
  mask_color: string
  radiu: null
}

export interface ColorInfo {
  color: string
}

export interface GradientInfo {
  mask_color: string
  orientation: string
  to_color: string
  from_color: string
}

export interface ImageInfo {
  image_url: string
}

export interface DisplayVersionUserids {
  userids: string
  version: Version
}

export interface Version {
  android: Android[]
  ios: Android[]
}

export interface Android {
  b: number
  e: number
}

export interface ModuleThemeInfo {
  size: Size
  md5: string
  max_height_rate: string
  url: string
  images: string
  layout: string
  num: number
}

export interface Size {
  width: number
  height: number
}

export interface Preview {
  dynamic_url: string
  static_url: string
}

export interface Tag {
  tag_name: string
  tag_id: number
}

export interface TransParam {
  special_tag: number
}
