import { registerResourceAction, t } from '@/shared/hostApi'
import kw from './kw'

const sources = {
  kw,
  tx: null,
  wy: null,
  kg: null,
  mg: null,
} as const

// type Sources = 'kw' | 'tx' | 'wy' | 'kg' | 'mg'
type Sources = 'kw' | 'tx' | 'wy' | 'kg' | 'mg'

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
        awlyric: lyric.lxlyric,
        rlyric: lyric.rlyric,
      }
    },
  })
}
