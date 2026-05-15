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
  error_code?: number
  errcode?: number
  err_code?: number
  info: SonglistDetailCodeInfo
  list?: HashItem[]
}

export interface SonglistDetailShareInfoV2 {
  error_code?: number
  errcode?: number
  err_code?: number
  songcount: number
  specialname: string
  imgurl: string
  intro: string
  nickname: string
  playcount: number
}

export interface SonglistDetailShareSongV2 {
  error_code?: number
  errcode?: number
  err_code?: number
  info: HashItem[]
}

export interface SonglistDetailDecodeGcidResponse {
  error_code?: number
  errcode?: number
  err_code?: number
  list: Array<{
    global_collection_id: string
  }>
}

export interface SonglistDetailChainTransferResponse {
  error_code?: number
  errcode?: number
  err_code?: number
  id?: string | number
  global_collection_id?: string
  list?: HashItem[]
  info?: {
    name?: string
    img?: string
    username?: string
  }
}

export interface SonglistDetailByIdResponse {
  error_code?: number
  errcode?: number
  err_code?: number
  info: HashItem[]
}
