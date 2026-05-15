export interface HotSearch {
  code: number
  data: Data
  message: string
  trp: Trp
}

export interface Data {
  itemList: ItemList[]
}

export interface ItemList {
  itemType: string
  searchWord: string
  toUserWord: string
  score: number
  scoreText: null
  content: string
  iconType: number
  iconUrl: null | string
  url: null | string
  profilePicUrl: null
  state: null
  alg: null | string
  leftUrl: null
  leftIconType: null
  animation: Animation | null
  logInfo: LogInfo
  rank: number
  tabId: string
  leftSkinType: null
  bizQueryInfo: null | string
  leftIconUrl: null
  adMonitor: null
  resourceType: null
  searchType: null
  resourceIds: null
}

export interface Animation {
  icon: Background
  background: Background
  backgroundV8: Background
}

export interface Background {
  skinningDisplay: boolean
  nightDisplay: boolean
  hideKeyword: boolean
  hideDescription: boolean
  androidUrl: null | string
  iosUrl: null | string
}

export interface LogInfo {
  module: string
  position: string
  type: string
  keyword: string
  toUserWord: string
  alg: null | string
}

export interface Trp {
  rules: string[]
}
