export interface SonglistDetailBDList {
  code: number
  msg: string
  reqId: string
  data: Data
  profileId: string
  curTime: number
}

export interface Data {
  pageNum: number
  pageSize: number
  size: number
  startRow: number
  endRow: number
  total: number
  pages: number
  list: List[]
  prePage: number
  nextPage: number
  isFirstPage: boolean
  isLastPage: boolean
  hasPreviousPage: boolean
  hasNextPage: boolean
  navigatePages: number
  navigateFirstPage: number
  navigateLastPage: number
  firstPage: number
  lastPage: number
}

export interface List {
  id: number
  name: string
  albumId: number
  album: string
  albumPic: string
  albumPic120: string
  artist: string
  artistId: number
  artistPic: string
  artists: ArtistElement[]
  duration: number
  releaseDate: Date
  isMv: number
  allArtistId: string
  mvPic: string
  vid: number
  audios: Audio[]
  payInfo: PayInfo
  mvduration: number
  online: number
  vidIsshow: number
  isShowType: number
  mediaBasicInfo: MediaBasicInfo
  videoType: number
  videoFmtCodes: string
  musicRid: string
  songName: string
  isOriginal: number
  isNew: number
  bodianPayAlbum: number
  bodianPayAlbumOffline: number
  isPay: number
  cpId: number
  terminalOnline: string
  tpay: number
  preOnline: boolean
  kw_cp: number
  data_source: number
  isbatch: number
  hasKnowledge: boolean
  isRedSong: number
  language: string
  bak3: number
  showButton: number
  showAd: number
  haveAudition: boolean
  offline: boolean
  lrc_info: Record<string, number>
}

export interface ArtistElement {
  id: number
  name: string
  pic: string
}

export interface Audio {
  level: Level
  bitrate: string
  format: Format
  size: string
}

export type Format = 'aac' | 'flac' | 'mflac' | 'mgg' | 'mp3' | 'mp4' | 'ogg' | 'zp'

export type Level = 'ac4' | 'bcms' | 'dd4' | 'dd6' | 'dd7' | 'ff' | 'h' | 'hr' | 'p' | 's' | 'zp' | 'zpga201' | 'zpga501' | 'zply'

export interface MediaBasicInfo {
  gain: number
  peak: number
  lra: number
}

export interface PayInfo {
  cannotDownload: number
  listen_fragment: string
  tips_intercept: string
  extendAttr: number
  local_encrypt: string
  play: string
  download: string
  down: string
  overseas_nplay: string
  overseas_ndown: string
  nplay: string
  ndown: string
  paytype: number
  paytagindex: Record<string, number>
  feeType: FeeType
  refrain_start: string
  refrain_end: string
  cannotOnlinePlay: number
  limitfree: string
}

export interface FeeType {
  vip: string
  song: string
  album: string
  bookvip: string
  bodianAlbum: string
}
