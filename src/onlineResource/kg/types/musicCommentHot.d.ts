export interface MusicCommentHot {
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
  input_hint: string
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
  comments_num?: number
  cmt_id?: number
  addtime: Date
  zhan?: number
  jump: number
  special_child_id: string
  is_reply?: number
  score: number | string
  report_status?: string
  story: string
  user_pic: string
  is_show_encyclopedic: number
  loadoffset: number
  user_name: string
  vipinfo: Vipinfo
  nameplate_dynamic?: string
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
  vinfo9: Vinfo9
  special_id: string
  author_name: string
  delPid: number
  nameplate_id?: number
  reply_num: number
  pid: number | string
  replys: string
  hash: string
  nameplate_url_v1?: string
  tid?: number
  album_id: number
  svip_level?: number
  lovers_pic?: string
  is_publish: number
  extdata: string
  udetails?: UdetailElement[]
  code: string
  nameplate_dynamic_v1?: string
  edit_status: number
  nameplate_type?: number
  svip_score?: number
  report_num: number | string
  action: string
  has_encyclopedic: number
  location: string
  unfold: number
  puser_id: number
  cmtdreturnserver: string
  id: number | string
  risk: number
  addtimestamp?: number
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
  nameplate_url?: string
  special_singer: string
  rcmd: string
  pcontent: string
  machine_tail?: string
  tail?: Tail
  subject_hash?: SubjectHash[]
}

export interface Image {
  label: string
  id: string
  chked: number
  mark: number
  height: number
  url: string
  scalable?: boolean
  localPath?: string
  width: number
  userUpload?: number
  errorCode?: number
  urlAudit?: string
  urlDynamic?: string
}

export interface Like {
  hasoppose: boolean
  count: number
  haslike: boolean
  opposenum: number
  likenum: number
}

export interface SubjectHash {
  hash: string
  name: string
}

export interface Tail {
  icon: string
  name: string
  id: string
  type: number
}

export interface PurpleUdetail {
  pendant_id?: number
  pendant_name?: string
  singer_avatar?: string
  medal_roll_word?: string
  word_v3?: string
  pendant_dynamic?: string
  small_pic_v3?: string
  medal_def_small_pic?: string
  show_type_v3?: number
  medal_show_type?: number
  medal_h5_url?: string
  medal_classify_id?: number
  user_id: number
  medal_2nd_classify_name?: string
  medal_is_show_2nd_classify_name?: number
  medal_type?: string
  pendant_url?: string
}

export interface UdetailElement {
  medal_h5_url: string
  medal_def_small_pic: string
  show_type_v3: number
  medal_show_type: number
  medal_roll_word: string
  word_v3: string
  small_pic_v3: string
  medal_classify_id: number
  def_small_pic_new: string
  medal_2nd_classify_name: string
  medal_is_show_2nd_classify_name: number
  medal_type: string
  def_exp_pic_new?: string
  def_big_pic_new?: string
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
