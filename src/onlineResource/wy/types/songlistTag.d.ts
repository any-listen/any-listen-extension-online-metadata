export interface Tag {
  code: number
  all: All
  sub: All[]
  categories: Record<string, string>
}

export interface All {
  name: string
  resourceCount: number
  imgId: number
  imgUrl: null
  type: number
  category: number
  resourceType: number
  hot: boolean
  activity: boolean
}
