export interface SonglistSearch {
  code: string
  resultNum: number
  dynamicEffect: number
  mod: number
  end: boolean
  songListResultData: SongListResultData
  concertResultData: ConcertResultData
}

export interface ConcertResultData {
  result: any[]
  totalCount: string
}

export interface SongListResultData {
  totalCount: string
  correct: string[][]
  result: Result[]
}

export interface Result {
  id: string
  resourceType: string
  name: string
  intro?: string
  userId: string
  userName: string
  musicNum: string
  keepNum: string
  playNum: string
  shareNum: string
  priority: string
  ts: string[]
  musicListPicUrl: string
  highlightStr: string[]
}
