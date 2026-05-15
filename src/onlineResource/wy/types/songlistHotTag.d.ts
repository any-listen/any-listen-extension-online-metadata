export interface HotTag {
  tags: Tag[]
  code: number
}

export interface Tag {
  playlistTag: PlaylistTag
  activity: boolean
  name: string
  id: number
  type: number
  usedCount: number
  hot: boolean
  position: number
  category: number
  createTime: number
}

export interface PlaylistTag {
  id: number
  name: string
  category: number
  usedCount: number
  type: number
  position: number
  createTime: number
  highQuality: number
  highQualityPos: number
  officialPos: number
}
