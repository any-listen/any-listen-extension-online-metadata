export interface TopSongs {
  code: number
  list: List[]
  artistToplist: ArtistToplist
}

export interface ArtistToplist {
  coverUrl: string
  name: string
  upateFrequency: string
  position: number
  updateFrequency: string
}

export interface List {
  subscribers: any[]
  subscribed: null
  creator: null
  artists: null
  tracks: null
  updateFrequency: string
  backgroundCoverId: number
  backgroundCoverUrl: null
  titleImage: number
  coverText: null
  titleImageUrl: null
  coverImageUrl: null
  iconImageUrl: null
  englishTitle: null
  opRecommend: boolean
  recommendInfo: null
  socialPlaylistCover: null
  tsSongCount: number
  algType: null
  originalCoverId: number
  topTrackIds: null
  promptedMgcInfo: null
  playlistType: string
  uiPlaylistType: null
  specialType: number
  highQuality: boolean
  coverImgId: number
  newImported: boolean
  anonimous: boolean
  updateTime: number
  coverImgUrl: string
  trackCount: number
  commentThreadId: string
  trackUpdateTime: number
  totalDuration: number
  playCount: number
  privacy: number
  trackNumberUpdateTime: number
  adType: number
  subscribedCount: number
  cloudTrackCount: number
  createTime: number
  ordered: boolean
  description: null | string
  status: number
  tags: string[]
  userId: number
  name: string
  id: number
  coverImgId_str: string
  ToplistType?: string
}
