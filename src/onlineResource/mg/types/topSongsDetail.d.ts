export interface TopSongsDetail {
  code: string
  info: string
  columnInfo: ColumnInfo
}

export interface ColumnInfo {
  columnTitle: string
  columnId: string
  columnPid: string
  columnUpdateTime: Date
  opNumItem: OpNumItem
  contentsCount: number
  columnStatus: number
  columnCooperate: string
  columnCreateTime: Date
  columntype: number
  contents: Content[]
  activeDate: Date
  columnPicUrl: string
  columnSmallpicUrl: string
  styleCode: string
  columnDes: string
  dataVersion: string
  columnSubtitle: string
  defaultContentStyleCode: string
  customizedPicUrls: string[]
  recommendPicUrl: string
  track: string
  recommendReason: string
  platforms: Platform[]
}

export interface Content {
  contentId: string
  relationType: number
  objectInfo: ObjectInfo
  relationStatus: number
  rankingChanges: string
  relationSort: number
}

export interface ObjectInfo {
  resourceType: string
  refId: string
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
  songAliasName: string
  isInDAlbum: string
  isInSideDalbum: string
  isInSalesPeriod: string
  songType: string
  mrcUrl: string
  invalidateDate: Date
  dalbumId: string
  trcUrl: string
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
  mvCopyright?: string
  topQuality: TopQuality
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
  showTag: ShowTag[]
  materialValidStatus: boolean
  needEncrypt: string
  foreverListenFlag: string
  foreverListen: boolean
  hasAssociatedRing: boolean
  chorusStartTime?: string
  videoDiversion: string
  audioBook: string
  ugcAuthorList: any[]
  productAuthorizeUsage?: string
  copyrightSource?: string
  loginListenFlag?: string
  translateName?: string
}

export interface AlbumImg {
  imgSizeType: string
  img: string
  webpImg: string
  fileId?: string
}

export interface Artist {
  id: string
  name: string
  nameSpelling?: string
}

export interface CodeRate {
  PQ: Pq
  ZQ?: Hq
  HQ: Hq
  SQ?: Sq
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
  formatType: TopQuality
  format?: string
  size?: string
  fileType?: FileType
  price: string
  androidFileType?: AndroidFileType
  iosFileType?: IosFileType
  iosSize?: string
  androidSize?: string
  iosFormat?: string
  androidFormat?: string
  iosAccuracyLevel?: AccuracyLevel
  androidAccuracyLevel?: AccuracyLevel
  androidNewFormat?: string
  iosBit?: number
  androidBit?: number
}

export type AccuracyLevel = '16bit'

export type AndroidFileType = 'flac'

export type FileType = 'mp3'

export type TopQuality = 'HQ' | 'LQ' | 'PQ' | 'SQ' | 'ZQ'

export type IosFileType = 'm4a'

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
  resourceTypeName: ResourceTypeName
  copyrightId: string
  productId: string
}

export type ResourceTypeName = '彩铃' | '振铃' | '无损' | '视频' | '随身听'

export type ShowTag = 'a24' | 'asq' | 'hq' | 'i24' | 'isq'

export interface SingerImg {
  singerName: string
  miguImgItems: AlbumImg[]
}

export interface TagList {
  resourceType: string
  tagId: string
  tagName: string
  tagDesc?: string
}

export interface Platform {
  platformName: string
}
