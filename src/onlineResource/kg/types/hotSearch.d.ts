export interface HotSearch {
  status: number
  errcode: number
  data: Data
  error: string
}

export interface Data {
  timestamp: number
  list: List[]
}

export interface List {
  name: string
  keywords: Keyword[]
}

export interface Keyword {
  reason: string
  json_url: string
  jumpurl: string
  keyword: string
  is_cover_word: number
  type: number
  icon: number
}
