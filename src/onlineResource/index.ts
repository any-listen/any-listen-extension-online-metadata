import { registerResourceAction, t } from '@/shared/hostApi'
import { Sources, sources } from './sources'

export const initOnlineResource = () => {
  registerResourceAction({
    async musicSearch(params) {
      const musics = await sources[params.source as Sources]!.musicSearch(
        `${params.name} ${params.artist || ''}`.trim(),
        params.page,
        params.limit
      )
      return {
        limit: params.limit,
        list: musics.list,
        page: params.page,
        total: musics.total,
      }
    },
    async musicPic(params) {
      const pic = await sources[params.source as Sources]!.getPic(params.musicInfo)
      if (!pic) throw new Error(t('onlineResource.picNotFound'))
      return pic
    },
    async lyric(params) {
      const lyric = await sources[params.source as Sources]!.getLyric(params.musicInfo)
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
  })
}
