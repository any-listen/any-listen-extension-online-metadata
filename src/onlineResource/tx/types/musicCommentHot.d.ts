export interface CommentHot {
  code: number
  ts: number
  start_ts: number
  traceid: string
  req: Req
}

export interface Req {
  code: number
  data: Data
}

export interface Data {
  AllowComment: number
  AllowInsertSong: number
  IsAuthor: number
  IsBlacked: number
  IsAdmin: number
  NoCopyRight: number
  ShowMusicianTip: number
  CommentTip: string
  SubCode: number
  Msg: string
  TaogeTopicName: string
  CommentList: CommentList
  CanMusicianSay: number
  CommentList2: CommentList2
  CommentList3: CommentList
  FromComment: Comment
  MaxShowPageNum: number
  Airborne: Airborne
  ShareCnt: number
  ExtraInfo: any
  TotalCmNum: number
  InputTip: string
  Abt: string
  Flag: number
  CommentH5Page: string
  Cts: number
  TotalVer: string
  RspVer: string
  HasTsCm: number
}

export interface Airborne {
  StartTime: number
  EndTime: number
  RelatedBizType: number
  RelatedBizId: string
  GuideTitle: string
  GuidePic: string
  MusicianName: string
  SearchTitle: string
  RealStartTime: number
  RealEndTime: number
  ID: number
  ReserveStartTime: number
  MusicianIds: any[]
  ReserveEndTime: number
  MusicianNames: any[]
  BizName: string
  ShareHeadPic: string
  SendSingerMsg: number
  PortraitUinURL: string
  PlayerBannerShowHours: number
  ReviewStartTime: number
  ReviewEndTime: number
  VoiceEng: string
  AirbHashTagEnable: number
}

export interface CommentList {
  Comments: Comment[]
  HasMore: number
  Total: number
  NextOffset: number
  ListType: number
  CommentIds: any[]
}

export interface Comment {
  Avatar: string
  CmId: string
  IdentityPic: string
  IdentityType: number
  State: number
  IsPraised: number
  Nick: string
  PraiseNum: number
  PubTime: number
  EncryptUin: string
  VipIcon: string
  Content: string
  CommitState: number
  UserType: string
  Permission: number
  AlbumMid: string
  AlbumPmid: string
  AlbumId: number
  SingerIds: any[]
  TaogeTopic: string
  TaogeUrl: string
  RepliedComments: any[]
  SeqNo: string
  SongId: number
  SongType: number
  SongName: string
  SingerNames: string
  ReplyCnt: number
  AuthorPraise: number
  SubComments: SubComment[]
  RankScore: string
  PdStaticPic: string
  PdDynamicPic: string
  HotScore: string
  RecScore: string
  GodState: number
  RvLabel: number
  VipFansIcon: string
  VipFansScheme: string
  VipFansIconStyle: string
  IsLiving: number
  Src: number
  IsSelf: number
  IsBlocked: number
  VipUI: VipUI
  LiveSchema: string
  Pic: string
  PicSize: PicSize
  AuInvite: number
  RankInfo: RankInfo
  SoundPower: SoundPower
  Medal: Medal
  SongTsElems: any[]
  LyricLines: any[]
  Location: string
  PhoneType: string
  BgCardPic: string
  BgCardBigPic: string
  EmoPic: string
  BgCardID: number
  BgCardClassID: number
  IconList: FromCommentIconList[]
  AtList: AtList[]
  Audio: Audio
  SchList: SchList[]
  SubCmListV1: any[]
  Tags: any[]
  EmoPkgID: number
  BizRate: number
  HashTagList: any[]
  URL: URL
  LittleTails: LittleTail[]
  TagLinks: any[]
}

export interface AtList {
  T: number
  S: number
  E: number
  ID: string
}

export interface Audio {
  URL: string
  Dur: number
  Txt: string
  Lang: string
}

export interface FromCommentIconList {
  Type: number
  Icon: string
  Jump: string
  W: number
  H: number
  Ext: IconListEXT
}

export interface IconListEXT {
  Desc?: string
}

export interface LittleTail {
  LittleTailType: number
  Name: string
  Icon: string
  Ext: LittleTailEXT
}

export interface LittleTailEXT {
  tmplType: string
}

export interface Medal {
  HasEntry: number
  IconURL: string
  JumpURL: string
  IconHeight: number
  IconWidth: number
  Level: number
  Name: string
  Color: string
  Rank: number
  Area: string
  Title: string
  TitleType: number
}

export enum PicSize {
  Empty = '',
  The906X757 = '906x757',
}

export interface RankInfo {
  ArtistName: string
  Rank: number
  RankImageInfo: RankImageInfo
}

export interface RankImageInfo {
  Img: string
  Width: number
  Height: number
}

export interface SchList {
  S: number
  E: number
}

export interface SoundPower {
  HasEntry: number
  IconURL: string
  JumpURL: string
  IconHeight: number
  IconWidth: number
}

export interface SubComment {
  EncryptUin: string
  Content: string
  Nick: string
  CmId: string
  AuthorPraise: number
  ParentComment: ParentComment
  Avatar: string
  PubTime: number
  IsPraised: number
  PraiseNum: number
  VipIcon: string
  CommitState: number
  UserType: string
  Permission: number
  RankScore: string
  SeqNo: string
  IdentityPic: string
  IdentityType: number
  PdStaticPic: string
  PdDynamicPic: string
  GodState: number
  RvLabel: number
  IsBlocked: number
  Pic: string
  PicSize: string
  AuInvite: number
  SongTsElems: any[]
  EmoPic: string
  EmoPkgID: number
}

export interface ParentComment {
  EncryptUin: string
  Content: string
  Nick: string
  CmId: string
  RplCnt: number
  AuthorPraise: number
  GodState: number
  RvLabel: number
  IsBlocked: number
  Pic: string
  PicSize: string
  AuInvite: number
  SongTsElems: any[]
  EmoPic: string
  EmoPkgID: number
}

export interface URL {
  Tt: string
  Lk: string
  Type: number
}

export interface VipUI {
  nickname: Nickname
  iconlist: Iconlist[]
}

export interface Iconlist {
  width: number
  height: number
  srcUrl: string
  style: Style
  ext: string
  desc: Desc
  Tips: Tips
  Helptxt: Helptxt
  Title: Title
  GifURL: string
  GifTimes: number
  GifWidth: number
  GifHeight: number
  GreyURL: string
  GreyWidth: number
  GreyHeight: number
  GreyLeft: number
  GreyRight: number
  GreyText: string
  Flag: number
  Hash: number
  UIStyle: number
  Segment: Segment
  Animation: string
  AmnInfo: AmnInfo
  GreyTextColor: string
  Price: number
  pagLink: string
  pagConfig: any
  pagWidth: number
  pagHeight: number
  transparent: number
}

export interface AmnInfo {
  GifTimes: number
  TextColor: string
  BackgroundURL: string
  AmnStyle: number
  Text: string
  Font: string
  Ext: any
  FontSize: number
  MaxDisplayLen: number
}

export enum Helptxt {
  年费绿钻 = '年费绿钻',
  年费超级会员 = '年费超级会员',
  豪华绿钻 = '豪华绿钻',
  超级会员 = '超级会员',
}

export interface Segment {
  Width: number
  Height: number
  DarkIconURL: string
  LightIconURL: string
  StretchLeft: number
  StretchRight: number
  Contents: any[]
  MaxDisplayLen: number
  PaddingLeft: number
  PaddingRight: number
  JumpURL: string
  AnimIconURL: string
}

export enum Tips {
  尽显绿钻特权彰显不一样的你 = '尽显绿钻特权，彰显不一样的你',
  超级会员超级特权 = '超级会员，超级特权',
}

export interface Title {
  content: string
  color: string
}

export enum Desc {
  Int103 = '{"int10":3}',
  Int104 = '{"int10":4}',
}

export enum Style {
  Click = 'click',
}

export interface Nickname {
  lightColor: LightColor
  darkColor: DarkColor
}

export enum DarkColor {
  Empty = '',
  The9D6802Ff = '#9D6802FF',
}

export enum LightColor {
  D0A65Cff = '#D0A65CFF',
  Empty = '',
}

export interface CommentList2 {
  Comments: CommentList2Comment[]
  HasMore: number
  Total: number
  NextOffset: number
  ListType: number
  CommentIds: any[]
}

export interface CommentList2Comment {
  Avatar: string
  CmId: string
  IdentityPic: string
  IdentityType: number
  State: number
  IsPraised: number
  Nick: string
  PraiseNum: number
  PubTime: number
  EncryptUin: string
  VipIcon: string
  Content: string
  CommitState: number
  UserType: string
  Permission: number
  AlbumMid: string
  AlbumPmid: string
  AlbumId: number
  SingerIds: any[]
  TaogeTopic: string
  TaogeUrl: string
  RepliedComments: any[]
  SeqNo: string
  SongId: number
  SongType: number
  SongName: string
  SingerNames: string
  ReplyCnt: number
  AuthorPraise: number
  SubComments: SubComment[]
  RankScore: string
  PdStaticPic: string
  PdDynamicPic: string
  HotScore: string
  RecScore: string
  GodState: number
  RvLabel: number
  VipFansIcon: string
  VipFansScheme: string
  VipFansIconStyle: string
  IsLiving: number
  Src: number
  IsSelf: number
  IsBlocked: number
  VipUI: VipUI
  LiveSchema: string
  Pic: string
  PicSize: string
  AuInvite: number
  RankInfo: RankInfo
  SoundPower: SoundPower
  Medal: Medal
  SongTsElems: any[]
  LyricLines: any[]
  Location: string
  PhoneType: string
  BgCardPic: string
  BgCardBigPic: string
  EmoPic: string
  BgCardID: number
  BgCardClassID: number
  IconList: PurpleIconList[]
  AtList: any[]
  Audio: Audio
  SchList: any[]
  SubCmListV1: any[]
  Tags: any[]
  EmoPkgID: number
  BizRate: number
  HashTagList: any[]
  URL: URL
  LittleTails: any[]
  TagLinks: any[]
}

export interface PurpleIconList {
  Type: number
  Icon: string
  Jump: string
  W: number
  H: number
  Ext: any
}
