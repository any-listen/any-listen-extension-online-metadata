export interface SonglistDetail {
  code: string
  info: string
  data: Data
}

export interface Data {
  totalCount: number
  publishTime: Date
  songList: SongList[]
}

export interface SongList {
  resourceType: string
  contentId: string
  songId: string
  songName: string
  mvCopyrightType: number
  ringToneId?: string
  ringCopyrightId?: string
  haveShockRing: number
  showTags: string[]
  songPinyin: string
  audioFormats: AudioFormat[]
  duration: number
  playNumDesc: string
  copyrightId: string
  copyrightType: number
  restrictType: number
  albumId: string
  album: string
  albumPinyin: string
  img1: string
  img2: string
  img3: string
  singerList: SingerList[]
  ext?: EXT
  foreverListenFlag?: string
  foreverListen: boolean
  shockRingId?: string
  hasAssociatedRing: boolean
  chorusStartTime?: string
  productAuthorizeUsage?: string
  audioBook: string
  ugcAuthorList?: any[]
  lrcUrl: string
  mrcUrl: string
  trcUrl: string
}

export interface AudioFormat {
  resourceType: string
  formatType: string
  isize: string
  asize: string
  iformat: string
  aformat: string
}

export interface EXT {
  disc: string
}

export interface SingerList {
  id: string
  name: string
  img: string
  nameSpelling?: string
}
