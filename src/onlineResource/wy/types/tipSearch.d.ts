export interface TipSearch {
  result: Result
  code: number
}

export interface Result {
  albums: Album[]
  songs: Song[]
  order: string[]
}

export interface Album {
  id: number
  name: string
  artist: Artist
  publishTime: number
  size: number
  copyrightId: number
  status: number
  picId: number
  mark: number
}

export interface Artist {
  id: number
  name: string
  picUrl: null | string
  alias: any[]
  albumSize: number
  musicSize: number
  picId: number
  fansGroup: null
  recommendText: null
  appendRecText: null
  fansSize: null
  img1v1Url: string
  img1v1: number
  transNames?: string[]
  trans: null | string
}

export interface Song {
  id: number
  name: string
  artists: Artist[]
  album: Album
  duration: number
  copyrightId: number
  status: number
  alias: string[]
  rtype: number
  ftype: number
  mvid: number
  fee: number
  rUrl: null
  mark: number
}
