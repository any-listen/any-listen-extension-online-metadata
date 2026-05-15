export interface HotSearch {
  status: string
  tagvalue: Tagvalue[]
  playlistid: string
  taglist: List[]
}

export interface List {
  FARTIST: string
  DC_TARGETID: string
  MVPIC: string
  FORMAT: string
  PAY: string
  ad_type: string
  isstar: string
  bitSwitch: number
  ALBUMID: string
  react_type: string
  AARTIST: string
  MINFO: string
  N_MINFO: string
  tpay: string
  FSONGNAME: string
  DURATION: string
  NEW: string
  web_albumpic_short: string
  SONGNAME: string
  MVQUALITY: string
  svip_preview: string
  ARTIST: string
  isdownload: string
  web_timingonline: string
  CanSetRingback: string
  terminal: string
  MUSICRID: string
  TAG: string
  subsStrategy: string
  ONLINE: string
  subsText: string
  nationid: string
  iot_info: string
  payInfo: PayInfo
  ALBUM: string
  overseas_copyright: string
  SUBTITLE: string
  fpay: string
  MVFLAG: string
  terminalOnline: string
  isRedSong: number
  allartistid: string
  ALIAS: string
  barrage: string
  content_type: string
  isshowtype: string
  KMARK: string
  mvpayinfo: Mvpayinfo
  originalsongtype: string
  spPrivilege: string
  cache_status: string
  info: string
  CanSetRing: string
  hts_MVPIC: string
  NAME: string
  signal: string
  audiobookpayinfo: Audiobookpayinfo
  SUBLIST?: List[]
  web_artistpic_short: string
  tme_musician_adtype: string
  ARTISTID: string
  overseas_pay: string
  ad_subtype: string
  PROVIDER: string
  DC_TARGETTYPE: string
  opay: string
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
  refrain_end: string
  play: string
  listen_fragment: string
  overseas_ndown: string
  nplay: string
  limitfree: string
  extendAttr: number
  tips_intercept: string
  paytype: number
  refrain_start: string
  down: string
  overseas_nplay: string
  ndown: string
  cannotDownload: string
  download: string
  local_encrypt: string
  paytagindex: Record<string, number>
  cannotOnlinePlay: string
  feeType: FeeType
}

export interface FeeType {
  album: string
  vip: string
  song: string
  bookvip: string
}

export interface Tagvalue {
  key: string
  describe: string
  type: string
  skiptype: string
  skipurl: string
  popularity: string
}
