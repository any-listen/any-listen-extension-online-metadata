export interface Tag {
  code: string
  info: string
  data: Datum[]
}

export interface Datum {
  content: Content[]
  header: Header
}

export interface Content {
  texts: string[]
}

export interface Header {
  actionUrl: string
  title: string
}
