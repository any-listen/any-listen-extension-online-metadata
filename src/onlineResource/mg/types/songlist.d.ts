export interface Songlist {
  code: string
  info: string
  data: Data
}

export interface Data {
  contents: DataContent[]
  header: Header
}

export interface DataContent {
  columnId: string
  contents: PurpleContent[]
  title: string
  view: string
  viewId: string
}

export interface PurpleContent {
  columnId?: string
  contents?: FluffyContent[]
  title?: string
  view: View
  viewId: string
  defaultNumber?: number
  logEvent?: LogEvent
  refreshTips?: string
  txt?: string
  txt4?: string
  action?: string
  carouselType?: string
  img?: string
  resId?: string
  resType?: string
  style?: string
  track?: Track
  txt2?: string
}

export interface FluffyContent {
  img: string
  img2?: string
  logEvent: LogEvent
  refreshTips?: string
  txt: string
  txt4?: string
  txt5?: string
  view: string
  viewId: string
  action?: string
  resId?: string
  resType?: string
  style?: string
  track?: Track
  txt2?: string
}

export interface LogEvent {
  resourceId: string
  resourceType: string
  trackId: string
  boxName?: BoxName
  contentId?: string
  contentName?: string
  contentType?: string
  index?: Index
  subContentId?: string
  subContentType?: string
}

export enum BoxName {
  The5月百变歌者歌单内容 = '5月百变歌者-歌单内容',
  一号轮播放最上面 = '一号轮播（放最上面）',
  功能歌单歌单内容 = '『功能歌单』-歌单内容',
  场景歌单 = '场景歌单',
  歌单上新歌单 = '『歌单上新』-歌单',
  编辑推荐歌单 = '『编辑推荐』-歌单',
}

export enum Index {
  VarIndex = 'var:index',
}

export enum Track {
  PlaylistCh1 = '#playlistCh=1',
  PlaylistCh3 = '#playlistCh=3',
}

export enum View {
  ZJSongListItem = 'ZJ-SongList-Item',
  ZJSongListScroll = 'ZJ-SongList-Scroll',
  ZJTitle = 'ZJ-Title',
}

export interface Header {
  dataVersion: string
  nextPageNo: number
  nextPageNo2: number
  title: string
  update: boolean
}
