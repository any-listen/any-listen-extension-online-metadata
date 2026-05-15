export interface MusicSearch {
  code: string
  resultNum: number
  dynamicEffect: number
  mod: number
  end: boolean
  songResultData: SongResultData
  tagSongResultData: TagSongResultData
  bestShowResultData: ResultData
  concertResultData: ResultData
}

export interface ResultData {
  totalCount: string
  result: Result[]
}

export interface Result {
  mod: string
  resourceType: string
  songlistShow?: SonglistShow
  videoToneShow?: VideoToneShow
  mvShow?: MvShow
}

export interface MvShow {
  mod: string
  mvDuration: string
  mvInfoList: MvInfoList[]
  mvname: string
  singers: Singer[]
  mvType: string
  imgs: Img[]
  playNum: string
}

export interface Img {
  img: string
  imgSizeType: string
}

export interface MvInfoList {
  id: string
  copyrightId: string
  price: string
  expireDate: Date
}

export interface Singer {
  id: string
  name: string
}

export interface SonglistShow {
  mod: string
  id: string
  name: string
  playNum: string
  playNumDesc: string
  picUrl: string
  musicNum: string
}

export interface VideoToneShow {
  mod: string
  resourceType: string
  id: string
  singer: string
  name: string
  imgItems: ImgItem[]
  aspectRatio: string
  libraryType: string
  mapImg: Record<string, MapImg[]>
}

export interface ImgItem {
  img: string
  imgSizeType: string
  fileId: string
}

export interface MapImg {
  img: string
  imgSizeType: string
  imgOri: string
  fileId: string
  imgRatio: string
  webpImg: string
}

export interface SongResultData {
  totalCount: string
  correct: any[]
  resultType: string
  isFromCache: string
  resultList: SongResultDataResultList[][]
  tipStatus: string
  trackId: string
}

export interface SongResultDataResultList {
  id: string
  resourceType: string
  contentId: string
  copyrightId: string
  name: string
  highlightStr: string[]
  lyricUrl: string
  copyright: string
  clickRatioString?: string
  songId: string
  songName: string
  albumId: string
  album: string
  lrcUrl: string
  mrcUrl?: string
  trcUrl?: string
  collect: number
  mvCopyrightType: number
  ringToneId?: string
  ringCopyrightId?: string
  haveShockRing: number
  singerList: SingerList[]
  albumPinyin: string
  img1: string
  img2: string
  img3: string
  restrictType: number
  showTags: string[]
  songPinyin: string
  audioFormats: AudioFormat[]
  duration: number
  copyrightType: number
  ext: PurpleEXT
  isCprWhite: string
  downloadTags?: string[]
  lyricist?: string[]
  mvId?: string
  translateName?: string
}

export interface AudioFormat {
  resourceType: string
  formatType: string
  isize: string
  asize: string
  iformat: string
  aformat: string
  showTags?: string[]
}

export interface PurpleEXT {
  lrcUrl: string
  disc?: string
  loginListenFlag?: string
  songDesc?: string
  translateName?: string
}

export interface SingerList {
  id: string
  name: string
  img: string
  nameSpelling?: string
}

export interface TagSongResultData {
  totalCount: string
  correct: any[]
  resultType: string
  isFromCache: string
  resultList: TagSongResultDataResultList[][]
}

export interface TagSongResultDataResultList {
  id: string
  resourceType: string
  contentId: string
  copyrightId: string
  name: string
  highlightStr: string[]
  lyricUrl: string
  copyright: string
  songId: string
  songName: string
  albumId: string
  album: string
  lrcUrl?: string
  collect: number
  mvCopyrightType: number
  haveShockRing: number
  singerList: SingerList[]
  albumPinyin: string
  img1: string
  img2: string
  img3: string
  restrictType: number
  showTags: string[]
  songPinyin: string
  audioFormats: AudioFormat[]
  duration: number
  copyrightType: number
  ext: FluffyEXT
  isCprWhite: string
  ringToneId?: string
  ringCopyrightId?: string
  downloadTags?: string[]
}

export interface FluffyEXT {
  lrcUrl?: string
  disc?: string
}
