export interface HotSearch {
  code: string
  resultNum: number
  info: string
  data: Data
}

export interface Data {
  hotwords: Hotword[]
  discovery: Discovery[]
  songs: Song[]
}

export interface Discovery {
  type: string
  word: string
}

export interface Hotword {
  programDisplayType: string
  type: string
  mode: number
  hotwordList: HotwordList[]
  playAll: number
  displayType: number
  maxNum: number
}

export interface HotwordList {
  word: string
  rank: number
  note: string
  videoType: number
  resourceType: string
  id?: string
  url?: string
  icon?: string
}

export interface Song {
  id: string
  resourceType: string
  contentId: string
  copyrightId: string
  topQuality: TopQuality
  name: string
  lyricUrl: string
  trcUrl: string
  imgItems: AlbumImg[]
  relatedSongs: RelatedSong[]
  toneControl: string
  rateFormats: RateFormat[]
  newRateFormats: RateFormat[]
  songType: string
  isInDAlbum: string
  copyright: string
  digitalColumnId: string
  mrcurl: string
  songDescs: string
  invalidateDate: Date
  isInSalesPeriod: string
  opNumItem: OpNumItem
  dalbumId: string
  isInSideDalbum: string
  vipType: string
  chargeAuditions: string
  scopeOfcopyright: string
  songDescription: string
  songId: string
  songName: string
  singerId: string
  singer: string
  albumId: string
  album: string
  albumImgs: AlbumImg[]
  lrcUrl: string
  mrcUrl: string
  singerImg: Record<string, SingerImg>
  songNamePinyin: string
  albumNamePinyin: string
  artists: Artist[]
  collect: number
  showTag: string[]
  isCprWhite: string
  songAliasName?: string
  translateName?: string
  listenFlag?: string
  z3dCode?: Z3DCode
}

export interface AlbumImg {
  img: string
  imgSizeType: string
}

export interface Artist {
  name: string
  id: string
  nameSpelling: string
}

export interface RateFormat {
  resourceType: string
  formatType: TopQuality
  format?: string
  size?: string
  fileType?: string
  price: string
  showTag?: string[]
  iosSize?: string
  androidSize?: string
  iosFormat?: string
  androidFormat?: string
  iosAccuracyLevel?: AccuracyLevel
  androidAccuracyLevel?: AccuracyLevel
  iosBit?: number
  androidBit?: number
  androidNewFormat?: string
}

export type AccuracyLevel = '16bit'

export type TopQuality = 'HQ' | 'LQ' | 'PQ' | 'SQ' | 'ZQ'

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
}

export interface RelatedSong {
  resourceType: string
  resourceTypeName: ResourceTypeName
  copyrightId: string
  productId: string
}

export type ResourceTypeName = '彩铃' | '振铃' | '无损' | '视频' | '随身听'

export interface SingerImg {
  singerName: string
  miguImgItems: MiguImgItem[]
}

export interface MiguImgItem {
  img: string
  imgSizeType: string
  imgOri: string
  webpImg: string
}

export interface Z3DCode {
  resourceType: string
  formatType: string
  format: string
  size: string
  fileType: string
  price: string
  iosSize: string
  androidSize: string
  iosFormat: string
  androidFormat: string
  h5Format: string
  h5Size: string
  androidFileKey: string
  iosFileKey: string
}
