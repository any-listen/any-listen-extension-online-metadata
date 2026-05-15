export interface SonglistSearch {
  ARTISTPIC: string
  HIT: string
  HITMODE: string
  HIT_BUT_OFFLINE: string
  MSHOW: string
  NEW: string
  PN: string
  RN: string
  SHOW: string
  TOTAL: string
  UK: string
  abslist: Abslist[]
}

export interface Abslist {
  DC_TARGETID: string
  DC_TARGETTYPE: string
  hasdeal: string
  hitcontent: string
  hts_pic: string
  intro: string
  isshow: string
  name: string
  nickname: string
  pic: string
  playcnt: string
  playlistid: string
  react_type: string
  signal: string
  sltype: string
  songnum: string
  tags: string
}
