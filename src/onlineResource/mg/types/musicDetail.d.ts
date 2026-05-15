export interface MusicDetail {
  code: string
  info: string
  resource: Resource[]
}

export interface Resource {
  resourceType: string
  copyrightId: string
  contentId: string
  songId: string
  songName: string
  singerId: string
  singer: string
  albumId: string
  album: string
  albumImgs: AlbumImg[]
  opNumItem: OpNumItem
  toneControl: string
  relatedSongs: RelatedSong[]
  rateFormats: RateFormat[]
  newRateFormats: RateFormat[]
  lrcUrl: string
  tagList: TagList[]
  digitalColumnId: string
  copyright: string
  validStatus: boolean
  songDescs: string
  isInDAlbum: string
  isInSideDalbum: string
  isInSalesPeriod: string
  songType: string
  mrcUrl: string
  invalidateDate: Date
  dalbumId: string
  trackNumber: string
  trcUrl: string
  disc: string
  vipType: string
  scopeOfcopyright: string
  auditionsType: string
  firstIcon: string
  chargeAuditions: string
  oldChargeAuditions: string
  songIcon: string
  codeRate: CodeRate
  isDownload: string
  copyrightType: string
  hasMv: string
  topQuality: string
  preSale: string
  isShare: string
  isCollection: string
  length: string
  singerImg: Record<string, SingerImg>
  songNamePinyin: string
  albumNamePinyin: string
  artists: Artist[]
  landscapImg: string
  vipLogo: string
  vipDownload: string
  firstPublish: string
  showTag: string[]
  materialValidStatus: boolean
  needEncrypt: string
  foreverListenFlag: string
  foreverListen: boolean
  isRecreate: string
  hasAssociatedRing: boolean
  showTime: Date
  productAuthorizeUsage: string
  audioBook: string
  ugcAuthorList: any[]
  copyrightSource: string
  chorusStartTime?: string
}

export interface AlbumImg {
  imgSizeType: string
  img: string
  imgOri: string
  webpImg: string
}

export interface Artist {
  id: string
  name: string
  nameSpelling?: string
}

export interface CodeRate {
  PQ: Pq
  HQ: Hq
  SQ: Sq
  ZQ: Hq
}

export interface Hq {
  codeRateChargeAuditions: string
  isCodeRateDownload: string
}

export interface Pq {
  codeRateChargeAuditions: string
  isCodeRateDownload: string
  codeRateFileSize: string
}

export interface Sq {
  codeRateChargeAuditions: string
  isCodeRateDownload: string
  contentIdSQ: string
}

export interface RateFormat {
  resourceType: string
  formatType: string
  format?: string
  size?: string
  fileType?: string
  price: string
  androidFileType?: string
  iosFileType?: string
  iosSize?: string
  androidSize?: string
  iosFormat?: string
  androidFormat?: string
  iosAccuracyLevel?: string
  androidAccuracyLevel?: string
  androidNewFormat?: string
  iosBit?: number
  androidBit?: number
}

export interface OpNumItem {
  playNum: number
  playNumDesc: string
  keepNum: number
  keepNumDesc: string
  commentNum: number
  commentNumDesc: string
  shareNum: number
  shareNumDesc: string
  orderNumByWeek: number
  orderNumByWeekDesc: string
  orderNumByTotal: number
  orderNumByTotalDesc: string
  thumbNum: number
  thumbNumDesc: string
  followNum: number
  followNumDesc: string
  subscribeNum: number
  subscribeNumDesc: string
  livePlayNum: number
  livePlayNumDesc: string
  popularNum: number
  popularNumDesc: string
  bookingNum: number
  bookingNumDesc: string
  settingNum: number
  settingNumDesc: string
  callNum: number
  callNumDesc: string
  callingPlayNum: number
  callingPlayNumDesc: string
  callingPlayDuration: number
  callingPlayDurationDesc: string
  calledPlayDuration: number
  calledPlayDurationDesc: string
  ringtoneAppPlayNum: number
  ringtoneAppPlayNumDesc: string
  ringtoneAppSettingNum: number
  ringtoneAppSettingNumDesc: string
  callingPlayDefaultNum: number
  callingPlayDefaultNumDesc: string
  playDefaultNum: number
  playDefaultDesc: string
  rewardUserNum: number
  rewardUserNumDesc: string
  rewardTotalNum: number
  rewardTotalNumDesc: string
  aiSongTotalNum: number
  aiSongTotalNumDesc: string
}

export interface RelatedSong {
  resourceType: string
  resourceTypeName: string
  copyrightId: string
  productId: string
}

export interface SingerImg {
  singerName: string
  miguImgItems: AlbumImg[]
}

export interface TagList {
  resourceType: string
  tagId: string
  tagName: string
}
