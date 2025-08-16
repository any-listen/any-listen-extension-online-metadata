export interface MusicSearch {
  error_msg: string
  data: Data
  status: number
  error_code: number
}

export interface Data {
  correctiontip: string
  pagesize: number
  page: number
  correctiontype: number
  correctionrelate: string
  total: number
  lists: List[]
  sec_aggre: any
  aggregation: any
  size: number
  chinesecount: number
  searchfull: number
  allowerr: number
  correctionsubject: string
  AlgPath: string
  sec_aggre_v2: any[]
  correctionforce: number
  istag: number
  from: number
  istagresult: number
  subjecttype: number
  sectag_info: SectagInfo
  isshareresult: number
}

export interface List {
  SQFileHash: string
  PublishTime: string
  Audioid: number
  SuperDuration: number
  OldCpy: number
  PublishAge: number
  bitflag: number
  HQBitrate: number
  PayType: number
  TagContent: string
  Accompany: number
  SingerName: string
  HQPrivilege: number
  TopicRemark: string
  OriOtherName: string
  ShowingFlag: number
  Source: string
  SQFileSize: number
  AlbumAux: string
  HQDuration: number
  Image: string
  HQPayType: number
  mvdata: Mvdatum[]
  M4aSize: number
  HeatLevel: number
  SQPkgPrice: number
  trans_param: TransParam
  UploaderContent: UploaderContent
  FileSize: number
  IsOriginal: number
  FileHash: string
  FoldType: number
  Grp?: Grp[]
  ID: string
  MvTrac: number
  isPrepublish: number
  Type: Type
  Bitrate: number
  SQPrice: number
  Auxiliary: string
  ExtName: string
  ASQPrivilege: number
  PkgPrice: number
  AlbumPrivilege: number
  AlbumID: string
  Category: number
  SuperExtName: string
  AlbumName: string
  OtherName: string
  SongName: string
  Res?: Res
  AudioCdn: number
  SourceID: number
  SQDuration: number
  HQFileSize: number
  vvid: string
  MixSongID: string
  SQPayType: number
  ResBitrate: number
  SuperBitrate: number
  HQPrice: number
  Suffix: Suffix
  HQFailProcess: number
  mvTotal: number
  SongLabel: string
  ResDuration: number
  HiFiQuality: number
  Singers: Singer[]
  SingerId: number[]
  HQExtName: string
  ResFileHash: string
  MatchFlag: number
  Scid: number
  SuperFileHash: string
  QualityLevel: number
  OriSongName: string
  HasAlbum: number
  MvType: number
  SuperFileSize: number
  MvHash: string
  FailProcess: number
  SQBitrate: number
  SQExtName: SQEXTName
  PublishDate: string
  HQFileHash: string
  TopicUrl: string
  RankId: number
  TagDetails: any[]
  Privilege: number
  PrepublishInfo: PrepublishInfo
  HQPkgPrice: number
  OwnerCount: number
  Uploader: Uploader
  Duration: number
  SQFailProcess: number
  TopID: number
  A320Privilege: number
  FileName: string
  ResFileSize: number
  SQPrivilege: number
  Price: number
  recommend_type: number
  Publish: number
}

export interface Grp {
  SQFileHash: string
  PublishTime: string
  Audioid: number
  SuperDuration: number
  OldCpy: number
  PublishAge: number
  bitflag: number
  HQBitrate: number
  PayType: number
  TagContent: string
  Accompany: number
  SingerName: string
  HQPrivilege: number
  TopicRemark: string
  OriOtherName: string
  ShowingFlag: number
  Source: string
  SQFileSize: number
  AlbumAux: string
  HQDuration: number
  Image: string
  HQPayType: number
  M4aSize: number
  mvdata: Mvdatum[]
  SQPkgPrice: number
  HeatLevel: number
  UploaderContent: string
  FileSize: number
  IsOriginal: number
  FileHash: string
  trans_param: TransParam
  ID: string
  MvTrac: number
  isPrepublish: number
  Type: Type
  Bitrate: number
  SQPrice: number
  Auxiliary: string
  ExtName: string
  ASQPrivilege: number
  PkgPrice: number
  AlbumPrivilege: number
  AlbumID: string
  Category: number
  SuperExtName: string
  AlbumName: string
  OtherName: string
  SongName: string
  Res?: Res
  AudioCdn: number
  SourceID: number
  SQDuration: number
  HQFileSize: number
  vvid: string
  MixSongID: string
  SQPayType: number
  ResBitrate: number
  SuperBitrate: number
  HQPrice: number
  Suffix: Suffix
  HQFailProcess: number
  mvTotal: number
  SongLabel: string
  ResDuration: number
  HiFiQuality: number
  Singers: Singer[]
  SingerId: number[]
  HQExtName: string
  ResFileHash: string
  MatchFlag: number
  Scid: number
  SuperFileHash: string
  QualityLevel: number
  OriSongName: string
  HasAlbum: number
  MvType: number
  SuperFileSize: number
  MvHash: string
  FailProcess: number
  SQBitrate: number
  SQExtName: SQEXTName
  PublishDate: Date
  HQFileHash: string
  TopicUrl: string
  RankId: number
  TagDetails: any[]
  Privilege: number
  PrepublishInfo: PrepublishInfo
  HQPkgPrice: number
  OwnerCount: number
  Uploader: string
  Duration: number
  SQFailProcess: number
  TopID: number
  A320Privilege: number
  FileName: string
  ResFileSize: number
  SQPrivilege: number
  Price: number
  recommend_type: number
  Publish: number
}

export enum OriOtherName {
  DJ何鹏版 = 'DJ何鹏版',
  DJ版 = 'DJ版',
  Empty = '',
  童声版 = '童声版',
}

export interface PrepublishInfo {
  ReserveCount: number
  DisplayTime: string
  Id: number
  PublishTime: string
}

export interface Res {
  PkgPrice: number
  Privilege: number
  PayType: number
  Price: number
  FailProcess: number
}

export enum SQEXTName {
  Empty = '',
  FLAC = 'flac',
}

export interface Singer {
  name: string
  ip_id: number
  id: number
}

export enum Suffix {
  DJ何鹏版 = '(DJ何鹏版)',
  DJ版 = '(DJ版)',
  Empty = '',
  童声版 = '(童声版)',
}

export enum Type {
  Audio = 'audio',
}

export interface Mvdatum {
  typ: number
  trk: string
  hash: string
  id: string
}

export interface TransParam {
  ogg_128_hash?: string
  classmap: Map
  language: Language
  cpy_attr0: number
  musicpack_advance: number
  ogg_128_filesize?: number
  display_rate: number
  qualitymap: Qualitymap
  union_cover?: string
  cid: number
  display: number
  hash_multitrack?: string
  ogg_320_hash?: string
  ipmap: Map
  songname_suffix?: Suffix
  pay_block_tpl: number
  ogg_320_filesize?: number
  cpy_grade?: number
  hash_offset?: HashOffset
  cpy_level?: number
  appid_block?: string
  free_for_ad?: number
}

export interface Map {
  attr0: number
}

export interface HashOffset {
  clip_hash: string
  start_byte: number
  end_ms: number
  end_byte: number
  file_type: number
  start_ms: number
  offset_hash: string
}

export enum Language {
  国语 = '国语',
}

export interface Qualitymap {
  attr0: number
  attr1: number
}

export enum Uploader {
  Empty = '',
  何深彰 = '何深彰',
}

export enum UploaderContent {
  Empty = '',
  发布者何深彰 = '发布者：何深彰',
}

export interface SectagInfo {
  is_sectag: number
}
