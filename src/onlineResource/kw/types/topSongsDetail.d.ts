export interface TopSongsDetail {
  code: number
  curTime: number
  data: Data
  msg: string
  profileId: string
  reqId: string
}

export interface Data {
  info: string
  musiclist: Musiclist[]
  name: string
  pic: string
  releaseDate: string
  total: number
}

export interface Musiclist {
  album: string
  albumId: number
  artist: string
  artistId: number
  bitSwitch: number
  copyright: string
  duration: number
  id: number
  isListener: number
  isRedSong: number
  isShowType: string
  isdownload: number
  isstar: number
  minfo: string
  mvFlag: number
  nMinfo: string
  n_minfo: string
  name: string
  online: number
  opay: string
  overseasCopyright: string
  overseasPay: string
  pay: string
  payInfo: PayInfo
  pic: string
  pic300: string
  releaseDate: Date
  tpay: string
  videoFmtCode: string
}

export interface PayInfo {
  play: string
  download: string
  local_encrypt: string
  cannotDownload: string
  cannotOnlinePlay: string
  feeType: FeeType
  listen_fragment: string
  tips_intercept: string
}

export interface FeeType {
  song: string
  album: string
  vip: string
  bookvip: string
}
