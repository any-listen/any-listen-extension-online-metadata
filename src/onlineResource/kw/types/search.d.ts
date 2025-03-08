export interface SearchResult {
  ARTISTPIC: string
  HIT: string
  HITMODE: string
  HIT_BUT_OFFLINE: string
  MSHOW: string
  NEW: string
  PN: string
  RN: string
  SHOW: string
  TOTAL: string
  UK: string
  abslist: Abslist[]
  searchgroup: string
}

export interface Abslist {
  AARTIST: string
  ALBUM: string
  ALBUMID: string
  ALIAS: string
  ARTIST: string
  ARTISTID: string
  CanSetRing: string
  CanSetRingback: string
  DC_TARGETID: string
  DC_TARGETTYPE: string
  DURATION: string
  FARTIST: string
  FORMAT: string
  FSONGNAME: string
  KMARK: string
  MINFO: string
  MUSICRID: string
  MVFLAG: string
  MVPIC: string
  MVQUALITY: string
  NAME: string
  NEW: string
  N_MINFO: string
  ONLINE: string
  PAY: string
  PROVIDER: string
  SONGNAME: string
  SUBLIST: string[]
  SUBTITLE: string
  TAG: string
  ad_subtype: string
  ad_type: string
  allartistid: string
  audiobookpayinfo: Audiobookpayinfo
  barrage: string
  cache_status: string
  content_type: string
  fpay: string
  info: string
  iot_info: string
  isRedSong: number
  isdownload: string
  isshowtype: string
  isstar: string
  mvpayinfo: Mvpayinfo
  nationid: string
  opay: string
  originalsongtype: string
  overseas_copyright: string
  overseas_pay: string
  payInfo: PayInfo
  react_type: string
  spPrivilege: string
  subsStrategy: string
  subsText: string
  svip_preview: string
  terminal: Terminal
  terminalOnline: string
  tme_musician_adtype: string
  tpay: string
  web_albumpic_short: string
  web_artistpic_short: string
  web_timingonline: string
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
  feeType: FeeType
  limitfree: string
  listen_fragment: string
  local_encrypt: string
  ndown: string
  nplay: string
  overseas_ndown: string
  overseas_nplay: string
  paytagindex: { [key: string]: number }
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

export enum Terminal {
  Empty = '',
  The1234567810119 = '1,2,3,4,5,6,7,8,10,11,9',
  The123456789101112131415161718 = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18',
  The1234567891011121415161718192021 = '1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21',
}
