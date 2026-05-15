export interface SonglistByTagId {
  code: string
  info: string
  data: Data
}

export interface Data {
  nextPageUrl: string
  enablePullRefresh: boolean
  contentItemList: ContentItemList[]
}

export interface ContentItemList {
  template: string
  style: Style
  itemList?: ItemList[]
  rowCountList?: number[]
}

export interface ItemList {
  template: Template
  barList: BarList[]
  cellType: number
  noBlank: boolean
  actionUrl: string
  title: string
  track: Track
  logEvent: LogEvent
  imageUrl: string
}

export interface BarList {
  title: string
}

export interface LogEvent {
  contentId: string
  contentName: string
  contentType: string
  index: Index
  subContentId: string
  subContentType: string
}

export enum Index {
  VarIndex = 'var:index',
}

export enum Template {
  Zj歌单宫格 = 'ZJ-歌单宫格',
}

export enum Track {
  GdgcgdtjDdgd = 'gdgcgdtj_ddgd',
}

export interface Style {
  height?: number
  backgroundColor?: string
  rowInterval?: number
  colInterval?: number
  marginX?: number
}
