// import tipSearch from './tipSearch'
import { search as musicSearch } from './musicSearch'
// import { formatSinger } from './util'
// import leaderboard from './leaderboard'
import { getLyric } from './lyric'
import { getPic } from './pic'
// import songList from './songList'
// import hotSearch from './hotSearch'
// import comment from './comment'

const kw = {
  // tipSearch,
  musicSearch,
  // leaderboard,
  // songList,
  // hotSearch,
  // comment,
  getLyric,
  getPic,
  // handleMusicInfo(songInfo) {
  //   return this.getMusicInfo(songInfo).then((info) => {
  //     // console.log(JSON.stringify(info))
  //     songInfo.name = info.name
  //     songInfo.singer = formatSinger(info.artist)
  //     songInfo.img = info.pic
  //     songInfo.albumName = info.album
  //     return songInfo
  //     // return Object.assign({}, songInfo, {
  //     //   name: info.name,
  //     //   singer: formatSinger(info.artist),
  //     //   img: info.pic,
  //     //   albumName: info.album,
  //     // })
  //   })
  // },

  // getMusicInfo(songInfo: AnyListen_API.MusicInfo) {
  //   if (this._musicInfoRequestObj) this._musicInfoRequestObj.cancelHttp()
  //   this._musicInfoRequestObj = httpFetch(`http://www.kuwo.cn/api/www/music/musicInfo?mid=${songInfo.songmid}`)
  //   return this._musicInfoRequestObj.promise.then(({ body }) => {
  //     return body.code === 200 ? body.data : Promise.reject(new Error(body.msg))
  //   })
  // },

  getMusicDetailPageUrl(songInfo: AnyListen_API.MusicInfo) {
    return `http://www.kuwo.cn/play_detail/${songInfo.id}`
  },

  // init() {
  //   return getToken()
  // },
}

export default kw
