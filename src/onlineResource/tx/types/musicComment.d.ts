export interface Comment {
  allow_comment: number
  allow_song: number
  auth: number
  blackuin: number
  code: number
  comment: CommentClass
  comment_tip: string
  hot_comment: CommentClass
  lastscore: number
  morecomment: number
  msg_comment: CommentClass
  no_copyright: number
  showYuerenTip: number
  subcode: number
  superadmin: number
  taoge_topic: string
  topic_name: string
  topid: string
}

export interface CommentClass {
  commentlist: Commentlist[] | null
  commenttotal: number
}

export interface Commentlist {
  avatarurl: null | string
  commentid: string
  commit_state: number
  enable_delete: number
  encrypt_rootcommentuin: string
  encrypt_uin: string
  identity_pic: string
  identity_type: number
  is_hot: number
  is_hot_cmt: number
  is_medal: number
  is_stick: number
  ispraise: number
  middlecommentcontent: Middlecommentcontent[] | null
  nick: string
  permission: number
  praisenum: number | null
  root_enable_delete: number
  root_identity_pic: string
  root_identity_type: number
  root_is_stick: number
  rootcommentcontent: string
  rootcommentid: string
  rootcommentnick: string
  rootcommentuin: string
  score: number
  taoge_topic: string
  taoge_url: string
  time: number
  uin: string
  user_type: string
  vipicon: string
}

export interface Middlecommentcontent {
  encrypt_replyeduin: string
  encrypt_replyuin: string
  reply_identity_pic: string
  reply_identity_type: number
  replyed_identity_pic: string
  replyed_identity_type: number
  replyednick: string
  replyeduin: string
  replynick: string
  replyuin: string
  subcommentcontent: string
  subcommentid: string
  avatarurl?: string
  praisenum?: number
}
