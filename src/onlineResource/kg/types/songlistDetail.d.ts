export interface HashItem {
  hash: string
}

export interface SonglistDetailCodeInfo {
  type?: number
  id?: string | number
  name?: string
  img?: string
  img_size?: string
  username?: string
  count?: number
  global_collection_id?: string
  userid?: string | number | null
}

export interface SonglistDetailCodeResponse {
  status: number
  err_code: number
  error: string
  data: {
    info: {
      type: number
      username: string
      name: string
      img: string
      img_size: string
      id: string
      count: number
      global_collection_id: string
      src_collection_id: string
      collect_type: null
      userid: number
      copy_gcid: string
      is_edit: number
    }
    list: Array<{ hash: string }>
    updatetime: number
  }
}

export interface SonglistDetailShareInfoV2 {
  data: {
    tags: any[]
    playcount: number
    songcount: number
    publishtime: Date
    suid: number
    user_avatar: string
    slid: number
    verified: number
    nickname: string
    commentcount: number
    singername: string
    collectcount: number
    trans_param: null
    user_type: number
    specialname: string
    global_specialid: string
    percount: number
    imgurl: string
    ugc_talent_review: number
    plist: any[]
    specialid: number
    is_selected: number
    intro: string
    type: number
  }
  errcode: number
  status: number
  error: string
}

export interface SonglistDetailDecodeGcidResponse {
  status: number
  err_code: number
  errmsg: string
  data: {
    list: Array<{
      id: string
      global_collection_id: string
      info: {
        listid: number
        specialid: number
        source: number
        list_create_gid: string
        list_create_userid: number
        list_create_listid: number
        type: number
        is_publish: number
        is_pri: number
        is_drop: number
        deleted: number
        global_collection_id: string
      }
    }>
  }
}

export interface SonglistDetailChainTransferResponse {
  info: {
    h2: string
    id: string
    isnew: string
    name: string
    chl: string
    share_type: string
    global_collection_id: string
    h1: string
    u: string
    action: string
    sharetime: string
    microblog: string
    slid: string
    suid: string
    list?: HashItem[]
    info?: SonglistDetailCodeInfo
  }
  errcode: number
  status: number
  error: string
}

export interface SonglistDetailByIdResponse {
  error_code?: number
  errcode?: number
  err_code?: number
  info: HashItem[]
}
