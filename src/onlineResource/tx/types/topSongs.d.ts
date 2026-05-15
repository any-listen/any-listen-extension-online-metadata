export interface TopSongs {
  code: number
  subcode: number
  message: string
  default: number
  data: Data
}

export interface Data {
  topList: TopList[]
}

export interface TopList {
  id: number
  listenCount: number
  picUrl: string
  songList: SongList[]
  topTitle: string
  type: number
}

export interface SongList {
  singername: string
  songname: string
}
