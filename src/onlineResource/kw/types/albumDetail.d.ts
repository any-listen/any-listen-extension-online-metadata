export interface AlbumDetail {
  aartist: string
  ad_subtype: string
  ad_type: string
  albumid: string
  artist: string
  artistid: string
  artistpic: string
  company: string
  content_type: string
  falbum: string
  fartist: string
  finished: string
  hts_img: string
  id: string
  img: string
  info: string
  lang: string
  musiclist: Musiclist[]
  name: string
  pay: string
  pic: string
  pub: string
  skipEnd: string
  skipStart: string
  songnum: string
  sort_policy: string
  spPrivilege: string
  svip_preview: string
  tag: any[]
  title: string
  vip: string
}

export interface Musiclist {
  CanSetRing: string
  CanSetRingback: string
  FLAG: string
  KMARK: string
  MINFO: string
  MVFLAG: string
  MVQUALITY: string
  N_MINFO: string
  aartist: string
  ad_subtype: string
  ad_type: string
  album: string
  albumId: number
  allartistid: string
  artist: string
  artistid: string
  audio_id: string
  audiobookpayinfo: Audiobookpayinfo
  barrage: string
  bitSwitch: number
  cache_status: string
  cartype: string
  content_type: string
  copyright: string
  duration: string
  falbum: string
  fartist: string
  float_adid: string
  format: string
  formats: string
  fpay: string
  fsongname: string
  hot: string
  id: string
  img: string
  iot_info: string
  isRedSong: number
  is_point: string
  isbatch: string
  isdownload: string
  isshowtype: string
  mp4sig1: string
  mp4sig2: string
  musicrid: string
  muti_ver: string
  mvpayinfo: Mvpayinfo
  name: string
  nationid: string
  online: string
  opay: string
  originalsongtype: string
  overseas_copyright: string
  overseas_pay: string
  param: string
  pay: string
  payInfo: PayInfo
  pic120: string
  pic_label: string
  playcnt: string
  rdts: string
  releasedate: Date
  res: string
  score: string
  score100: string
  songname: string
  spPrivilege: string
  subsStrategy: string
  subsText: string
  subtitle: string
  svip_preview: string
  terminal: string
  terminalOnline: string
  tme_musician_adtype: string
  tpay: string
  track: string
  uploader: string
  uptime: string
  web_albumpic_short: string
  web_artistpic_short: string
  web_timingonline: string
}

export interface Audiobookpayinfo {
  download: string
  play: string
}

export interface Mvpayinfo {
  down: string
  download: string
  play: string
  vid: string
}

export interface PayInfo {
  cannotDownload: string
  cannotOnlinePlay: string
  down: string
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
