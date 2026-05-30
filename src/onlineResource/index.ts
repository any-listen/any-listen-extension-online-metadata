import { console, registerResourceAction, t } from '@/shared/hostApi'
import { deduplicationList } from '@/shared/utils'

import { type Sources, sources } from './sources'

export const initOnlineResource = () => {
  registerResourceAction({
    // async musicPicSearch(params) {
    //   const musics = await sources[params.source as Sources].musicSearch(
    //     `${params.name} ${params.artist || ''}`.trim(),
    //     params.page,
    //     params.limit
    //   )
    //   return {
    //     limit: params.limit,
    //     list: musics.list,
    //     page: params.page,
    //     total: musics.total,
    //   }
    // },
    async musicSearch(params) {
      const musics = await sources[params.source as Sources].musicSearch(
        `${params.name} ${params.artist || ''} ${params.albumName || ''}`.trim(),
        params.page,
        params.limit
      )
      return {
        limit: musics.limit,
        list: deduplicationList(musics.list),
        page: musics.page,
        total: musics.total,
      }
    },
    async musicPic(params) {
      const pic = await sources[params.source as Sources].getPic(params.musicInfo)
      if (!pic) throw new Error(t('onlineResource.picNotFound'))
      return pic
    },
    // async lyricSearch(params) {},
    async musicLyric(params) {
      const lyric = await sources[params.source as Sources].getLyric(params.musicInfo).catch((e) => {
        console.error(e)
        throw e
      })
      return {
        name: params.musicInfo.name,
        singer: params.musicInfo.singer,
        interval: params.musicInfo.interval,
        lyric: lyric.lyric,
        tlyric: lyric.tlyric,
        awlyric: lyric.awlyric,
        rlyric: lyric.rlyric,
      }
    },
    async songlistSearch(params) {
      const s = sources[params.source as Sources]
      if ('songlistSearch' in s) {
        const songlist = await s.songlistSearch(params.keyword, params.page, params.limit)
        return {
          limit: songlist.limit,
          list: songlist.list,
          page: songlist.page,
          total: songlist.total,
        }
      }
      throw new Error(`songlistSearch not implemented for source ${params.source}`)
    },
    async songlistDetail(params) {
      const s = sources[params.source as Sources]
      if ('songlistDetail' in s) {
        const songlist = await s.songlistDetail(params.id, params.page, params.limit)
        return {
          limit: songlist.limit,
          list: songlist.list,
          page: songlist.page,
          total: songlist.total,
          info: songlist.info,
        }
      }
      throw new Error(`songlistDetail not implemented for source ${params.source}`)
    },
    async songlistTags(params) {
      const s = sources[params.source as Sources]
      if ('songlistTags' in s) {
        return s.songlistTags()
      }
      throw new Error(`songlistTags not implemented for source ${params.source}`)
    },
    async songlistSorts(params) {
      const s = sources[params.source as Sources]
      if ('songlistSorts' in s) {
        return s.songlistSorts()
      }
      throw new Error(`songlistSorts not implemented for source ${params.source}`)
    },
    async songlist(params) {
      const s = sources[params.source as Sources]
      if ('songlist' in s) {
        const songlist = await s.songlist(params.sort, params.tag, params.page)
        return {
          limit: songlist.limit,
          list: songlist.list,
          page: songlist.page,
          total: songlist.total,
        }
      }
      throw new Error(`songlist not implemented for source ${params.source}`)
    },
    async topSongs(params) {
      const s = sources[params.source as Sources]
      if ('topSongs' in s) {
        return s.topSongs()
      }
      throw new Error(`topSongs not implemented for source ${params.source}`)
    },
    async topSongsDate(params) {
      const s = sources[params.source as Sources]
      if ('topSongsDate' in s) {
        return s.topSongsDate(params.id)
      }
      throw new Error(`topSongsDate not implemented for source ${params.source}`)
    },
    async topSongsDetail(params) {
      const s = sources[params.source as Sources]
      if ('topSongsDetail' in s) {
        const songlist = await s.topSongsDetail(params.id, params.date, params.page, params.limit)
        return {
          limit: songlist.limit,
          list: songlist.list,
          page: songlist.page,
          total: songlist.total,
          info: songlist.info,
        }
      }
      throw new Error(`topSongsDetail not implemented for source ${params.source}`)
    },
    async tipSearch(params) {
      const s = sources[params.source as Sources]
      if ('tipSearch' in s) {
        return s.tipSearch(params.keyword)
      }
      throw new Error(`tipSearch not implemented for source ${params.source}`)
    },
    async hotSearch(params) {
      const s = sources[params.source as Sources]
      if ('hotSearch' in s) {
        return s.hotSearch()
      }
      throw new Error(`hotSearch not implemented for source ${params.source}`)
    },
    async musicComment(params) {
      const s = sources[params.source as Sources]
      if ('musicComment' in s) {
        const comment = await s.musicComment(params)
        return {
          limit: comment.limit,
          list: comment.list,
          page: comment.page,
          total: comment.total,
        }
      }
      throw new Error(`musicComment not implemented for source ${params.source}`)
    },
  })
}
