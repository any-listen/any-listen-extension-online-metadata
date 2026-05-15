export interface TipSearch {
  code: string
  info: string
  data: Data
}

export interface Data {
  singerList: SingerList[]
  songList: SongList[]
}

export interface SingerList {
  singerName: string
  highlightStr: string[]
  toneIdent: number
}

export interface SongList {
  songName: string
  highlightStr: string[]
  toneIdent: number
}
