import { search as hotSearch } from './hotSearch'
import { getLyric } from './lyric'
import { musicComment } from './musicComment'
import { search as musicSearch } from './musicSearch'
import { getPic } from './pic'
import {
  search as songlistSearch,
  getListDetail as songlistDetail,
  getList as songlist,
  getTags as songlistTags,
  getSorts as songlistSorts,
} from './songlist'
import { search as tipSearch } from './tipSearch'
import { getBoards as topSongs, getDates as topSongsDate, getList as topSongsDetail } from './topSongs'

const tx = {
  musicSearch,
  getLyric,
  getPic,
  songlistSearch,
  songlistDetail,
  songlistTags,
  songlistSorts,
  songlist,
  topSongs,
  topSongsDate,
  topSongsDetail,
  tipSearch,
  hotSearch,
  musicComment,
}

export default tx
