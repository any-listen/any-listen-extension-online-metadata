export interface SonglistSearch {
  code: number
  subcode: number
  message: string
  default: number
  data: Data
}

export interface Data {
  display_num: number
  list: List[]
  num_per_page: number
  page_no: number
  qc: any[]
  sum: number
  uin: number
}

export interface List {
  copyrightnum: number
  createtime: Date
  creator: Creator
  diss_status: number
  dissid: string
  dissname: string
  docid: number
  imgurl: string
  introduction: string
  listennum: number
  score: number
  song_count: number
}

export interface Creator {
  avatarUrl: string
  creator_uin: string
  encrypt_uin: string
  followflag: number
  isVip: number
  name: string
  qq: number
  singerid: number
  singermid: string
  type: number
}
// {
//   "copyrightnum": 32,
//   "createtime": "2020-04-26",
//   "creator": {
//     "avatarUrl": "",
//     "creator_uin": "1825869086",
//     "encrypt_uin": "oKcA7KcsNKnF7c**",
//     "followflag": 0,
//     "isVip": 0,
//     "name": "麻辣烫不要麻不要辣",
//     "qq": 1825869086,
//     "singerid": 0,
//     "singermid": "",
//     "type": 0
//   },
//   "diss_status": 400,
//   "dissid": "7538845791",
//   "dissname": "甜妹配DJ🎀，油门踩碎一秒起飞",
//   "docid": 3243878495,
//   "imgurl": "http://qpic.y.qq.com/music_cover/9JXP7ZLibzw3jww07efQyODwGcPp7IRh03Lq4SMad1TgJN9RUoQWZZA/300",
//   "introduction": "舔了舔自己的唇，好甜！果然是甜妹&#126;&#10;头戴Hello&#32;kitty机车帽，听的是最拽最野的DJ&#10;谁说�.&#46;&#46;",
//   "listennum": 9962777,
//   "score": 0,
//   "song_count": 35
// }
