export interface SonglistDetailDigest8 {
  abstime: number
  ctime: number
  id: number
  info: string
  ispub: boolean
  musiclist: Musiclist[]
  pic: string
  playnum: number
  pn: number
  result: string
  rn: number
  sharenum: number
  songtime: number
  state: number
  tag: string
  tagid: string
  title: string
  total: number
  type: string
  uid: number
  uname: string
  validtotal: number
}

export interface Musiclist {
  AARTIST: string
  FALBUM: string
  FARTIST: string
  FSONGNAME: string
  MINFO: string
  N_MINFO: string
  ad_subtype: string
  ad_type: string
  album: string
  albumid: string
  albumpic: string
  artist: string
  artistPic: string
  artistid: string
  audiobookpayinfo: Audiobookpayinfo
  barrage: string
  bitSwitch: number
  cache_status: string
  collect_num: string
  content_type: string
  copyright: string
  displayalbumname: string
  displayartistname: string
  displaysongname: string
  duration: string
  firstrecordtime: Date
  formats: string
  hasmv: string
  id: string
  isRedSong: number
  is_point: string
  isbatch: string
  isdownload: string
  isshow: string
  isshowtype: string
  isstar: string
  mp3sig1: string
  mp3sig2: string
  musicPic: string
  musicattachinfoid: string
  muti_ver: string
  mvpayinfo: Mvpayinfo
  name: string
  nationid: string
  nsig1: string
  nsig2: string
  online: string
  opay: string
  overseas_copyright: string
  overseas_pay: string
  params: string
  pay: string
  payInfo: PayInfo
  score100: string
  spPrivilege: string
  subsStrategy: string
  subsText: string
  terminalOnline: string
  tme_musician_adtype: string
  tpay: string
}

export interface Audiobookpayinfo {
  download: string
  play: string
}

export interface Mvpayinfo {
  download: string
  play: string
  vid: string
}

export interface PayInfo {
  cannotDownload: string
  cannotOnlinePlay: string
  download: string
  extendAttr: number
  feeType: FeeType
  limitfree: string
  listen_fragment: string
  local_encrypt: string
  ndown: string
  nplay: string
  overseas_ndown: string
  overseas_nplay: string
  paytagindex: Record<string, number>
  paytype: number
  play: string
  refrain_end: string
  refrain_start: string
  tips_intercept: string
}

export interface FeeType {
  album: string
  bookvip: string
  song: string
  vip: string
}
