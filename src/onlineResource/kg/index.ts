import { search as hotSearch } from './hotSearch'
import { getLyric } from './lyric'
import { musicComment } from './msuicComment'
import { search as musicSearch } from './musicSearch'
import { getPic } from './pic'
import {
  search as songlistSearch,
  getList as songlist,
  getListDetail as songlistDetail,
  getTags as songlistTags,
  getSorts as songlistSorts,
} from './songlist'
import { search as tipSearch } from './tipSearch'
import { getBoards as topSongs, getDates as topSongsDate, getList as topSongsDetail } from './topSongs'

const kg = {
  musicSearch,
  getLyric,
  getPic,
  musicComment,
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
}

export default kg
