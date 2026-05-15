export interface MusicComment {
  list: List[]
  count: number
  message: string
  childrenid: string
  artCmtConfig: ArtCmtConfig
  err_code: number
  combine_count: number
  msg: string
  default_content: string
  tag: Tag[]
  config: Config
  current_page: number
  status: number
  has_filter_risk_user: number
}

export interface ArtCmtConfig {
  tipOfNoUseArtCmt: string
  wayToEdit: number
  canUseArtCmt: number
  urlOfNoUseArtCmt: string
  h5EditorUrl: string
  canUploadImg: number
}

export interface Config {
  tipOfNoUploadImg: string
  emptyTip: string
  urlOfNoUploadImg: string
  oppose_types: any[]
  input_hint: string
  opposebutton: number
  canUploadImg: number
  toastBgOpus: string
  closeCmt: number
  numOpusUserMaxSVIP: number
  can_upload_video: number
  tip_noupload_video: string
  numOpusUserMaxYVIP: number
  url_noupload_video: string
  numOpusUserMax: number
}

export interface List {
  status: string
  vip_type: number
  puser: string
  like: Like
  udetail: PurpleUdetail
  comments_num: number
  cmt_id?: number
  addtime: Date
  zhan?: number
  jump: number
  special_child_id: string
  is_reply: number
  score: number
  report_status?: string
  story: string
  user_pic: string
  is_show_encyclopedic: number
  loadoffset: number
  user_name: string
  vipinfo: Vipinfo
  nameplate_dynamic_v1?: string
  uinfo: Uinfo[]
  report_content?: string
  show_follow_button: number
  toast_text: string
  user_id: number
  encyclopedic_flag: number
  updatetime: string
  user_sex: number
  gid?: number
  vip_user_type: number
  m_type: number
  reply_num: number
  special_id: string
  author_name: string
  delPid: number
  pid: number
  replys: string
  vinfo9: Vinfo9
  nameplate_url_v1?: string
  tid?: number
  hash: string
  svip_level?: number
  album_id: number
  is_publish: number
  extdata: string
  udetails?: UdetailElement[]
  lovers_pic?: string
  code: string
  edit_status: number
  nameplate_type?: number
  svip_score?: number
  report_num: number
  action: string
  has_encyclopedic: number
  location: string
  unfold: number
  puser_id: number
  cmtdreturnserver: string
  id: number
  risk: number
  addtimestamp: number
  song_show_text: string
  images: Image[] | string
  admin?: number
  y_type: number
  special_child_name: string
  keyword?: string
  special_userId: string
  loadone: number
  mid?: string
  clientver?: string
  content: string
  platform?: number
  content_type?: number
  album_audio_id: number | string
  weight?: number
  bi: string
  type?: number
  cover: string
  special_singer: string
  rcmd: string
  pcontent: string
  machine_tail?: string
  nameplate_dynamic?: string
  nameplate_id?: number
  nameplate_url?: string
  tail?: Tail
}

export interface Image {
  label: string
  id: string
  faceGroupId: string
  faceName: string
  faceId: string
  mark: number
  height: number
  url: string
  width: number
}

export interface Like {
  hasoppose: boolean
  count: number
  haslike: boolean
  opposenum: number
  likenum: number
}

export interface Tail {
  icon: string
  name: string
  id: string
  type: number
}

export interface PurpleUdetail {
  medal_h5_url?: string
  medal_def_small_pic?: string
  show_type_v3?: number
  singer_avatar?: string
  user_id: number
  medal_roll_word?: string
  word_v3?: string
  medal_classify_id?: number
  small_pic_v3?: string
  medal_2nd_classify_name?: string
  medal_is_show_2nd_classify_name?: number
  medal_show_type?: number
  medal_type?: string
  pendant_id?: number
  pendant_name?: string
  pendant_dynamic?: string
  pendant_url?: string
}

export interface UdetailElement {
  medal_h5_url: string
  medal_def_small_pic: string
  def_exp_pic_new?: string
  word_v3: string
  medal_show_type: number
  medal_roll_word: string
  small_pic_v3: string
  show_type_v3: number
  medal_classify_id: number
  def_small_pic_new: string
  medal_2nd_classify_name: string
  medal_is_show_2nd_classify_name: number
  def_big_pic_new?: string
  medal_type: string
}

export interface Uinfo {
  icolor: string
  v: string
  ostr: number
  acolor: string
}

export interface Vinfo9 {
  singer_status: number
  user_label: string
  justiceLeague: number
  star_v_status: number
  auth_info: string
  user_iden: number
  tme_star_status: number
  cmt_talent_status: number
  biz_status: number
  pic: string
  actor_status: number
  student_status: number
}

export interface Vipinfo {
  vip_type: number
  y_type: number
  user_y_type: number
  user_type: number
  m_type: number
}

export interface Tag {
  url: string
  name: string
  type: string
}
