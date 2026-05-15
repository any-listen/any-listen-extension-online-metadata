export interface TipSearch {
  status: number
  error_code: number
  ErrorCode: number
  data: Datum[]
  SingerShortcut: SingerShortcut
  Shortcuts: any[]
}

export interface SingerShortcut {
  id: number
  name: string
  img: string
  song_count: number
  album_count: number
  fans_count: number
}

export interface Datum {
  RecordDatas: RecordData[]
  RecordCount: number
  LableName: string
}

export interface RecordData {
  HintInfo: string
  MatchCount: number
  Hot: number
  IsRadio: number
  IsKlist?: number
  Use?: string
  scores?: number
  la: number
  icon: number
  subtitle: string
  busi: string
  complex_ai_action: number
}
