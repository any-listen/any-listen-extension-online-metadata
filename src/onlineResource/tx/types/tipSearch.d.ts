export interface TipSearch {
  code: number
  data: Data
  subcode: number
}

export interface Data {
  album: Album
  mv: Album
  singer: Album
  song: Album
}

export interface Album {
  count: number
  itemlist: Itemlist[]
  name: string
  order: number
  type: number
}

export interface Itemlist {
  docid: string
  id: string
  mid: string
  name: string
  pic?: string
  singer: string
  vid?: string
}
