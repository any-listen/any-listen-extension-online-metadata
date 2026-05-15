export interface TipSearch {
  STATUS: string
  HITNUM: number
  DIRECTINFO: Directinfo
  WORDITEMS: Worditem[]
}

export interface Directinfo {
  content: Content[]
}

export interface Content {
  interestpage: Interestpage
}

export interface Interestpage {
  HIT: string
  abslist: Abslist[]
}

export interface Abslist {
  AARTIST: string
  ArtistRadioShow: string
  DC_TARGETID: string
  DC_TARGETTYPE: string
  FARTIST: string
  aid: string
  albumnum: string
  artist: string
  artist_loginid: string
  artist_type: string
  color: string
  content_type: string
  digest: string
  entrance: string
  hts_pic: string
  id: string
  intro: string
  isstar: string
  mvnum: string
  name: string
  newtagname: string
  pageurl: string
  pay: string
  pcresid: string
  pcrestype: string
  pic: string
  playcnt: string
  playcnt_t: string
  publish: string
  radioid: string
  radioname: string
  songnum: string
  startype: string
  type: string
}

export interface Worditem {
  RELWORD: string
  TAG_TYPE?: number
  TAG_IMG?: string
  SNUM: number
  RNUM: number
  RESOURCE_TYPE: number
}
