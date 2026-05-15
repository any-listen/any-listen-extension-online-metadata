export interface SonglistSearch {
  result: Result
  code: number
}

export interface Result {
  searchQcReminder: null
  playlists: Playlist[]
  playlistCount: number
}

export interface Playlist {
  id: number
  name: string
  coverImgUrl: string
  creator: Creator
  subscribed: boolean
  trackCount: number
  userId: number
  playCount: number
  bookCount: number
  specialType: number
  officialTags: null
  action: null
  actionType: null
  recommendText: null
  score: null
  officialPlaylistTitle: null
  playlistType: string
  description: null | string
  highQuality: boolean
}

export interface Creator {
  nickname: string
  userId: number
  userType: number
  avatarUrl: null
  authStatus: number
  expertTags: null
  experts: null
}
