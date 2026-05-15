export interface TopSongs {
  code: string
  info: string
  data: Data
}

export interface Data {
  header: Header
  contents: DataContent[]
}

export interface DataContent {
  view: string
  style: string
  contents: PurpleContent[]
  desc?: string
}

export interface PurpleContent {
  view?: string
  rankId: string
  rankName: string
  imageUrl: string
  desc?: string
  contents?: FluffyContent[]
}

export interface FluffyContent {
  resType: string
  resId: string
  img: string
  txt: string
  txt2: string
  txt3: string
  txt5: string
  vip: string
  qualities: string[]
  showTag: string[]
  copyright: string
  copyrightId: string
  songId: string
  mvId: string
  copyrightType: string
  mvCopyright?: string
  songData: string
  score?: string
  ugcAuthorList?: any[]
}

export interface Header {
  title: string
  dataVersion: string
  nextPageNo: number
  nextPageNo2: number
  update: boolean
}
