import type { Comment as CommentResp, CommentElement } from './types/musicComment'
import type { CommentHot, HotComment } from './types/musicCommentHot'
import { weapiRequest } from './utils'

const emojis: Array<[string, string]> = [
  ['大笑', '😃'],
  ['可爱', '😊'],
  ['憨笑', '☺️'],
  ['色', '😍'],
  ['亲亲', '😙'],
  ['惊恐', '😱'],
  ['流泪', '😭'],
  ['亲', '😚'],
  ['呆', '😳'],
  ['哀伤', '😔'],
  ['呲牙', '😁'],
  ['吐舌', '😝'],
  ['撇嘴', '😒'],
  ['怒', '😡'],
  ['奸笑', '😏'],
  ['汗', '😓'],
  ['痛苦', '😖'],
  ['惶恐', '😰'],
  ['生病', '😨'],
  ['口罩', '😷'],
  ['大哭', '😂'],
  ['晕', '😵'],
  ['发怒', '👿'],
  ['开心', '😄'],
  ['鬼脸', '😜'],
  ['皱眉', '😞'],
  ['流感', '😢'],
  ['爱心', '❤️'],
  ['心碎', '💔'],
  ['钟情', '💘'],
  ['星星', '⭐️'],
  ['生气', '💢'],
  ['便便', '💩'],
  ['强', '👍'],
  ['弱', '👎'],
  ['拜', '🙏'],
  ['牵手', '👫'],
  ['跳舞', '👯‍♀️'],
  ['禁止', '🙅‍♀️'],
  ['这边', '💁‍♀️'],
  ['爱意', '💏'],
  ['示爱', '👩‍❤️‍👨'],
  ['嘴唇', '👄'],
  ['狗', '🐶'],
  ['猫', '🐱'],
  ['猪', '🐷'],
  ['兔子', '🐰'],
  ['小鸡', '🐤'],
  ['公鸡', '🐔'],
  ['幽灵', '👻'],
  ['圣诞', '🎅'],
  ['外星', '👽'],
  ['钻石', '💎'],
  ['礼物', '🎁'],
  ['男孩', '👦'],
  ['女孩', '👧'],
  ['蛋糕', '🎂'],
  ['18', '🔞'],
  ['圈', '⭕'],
  ['叉', '❌'],
]

const applyEmoji = (text: string) => {
  for (const e of emojis) text = text.replaceAll(`[${e[0]}]`, e[1])
  return text
}

interface CursorCache {
  page?: number
  cursor?: number | string
  prevCursor?: number | string
  orderType?: number
  offset?: number
}

const cursorCache: Record<string, CursorCache> = {}

const cursorTools = {
  getCursor(id: string, page: number, limit: number) {
    let cacheData = cursorCache[id]
    cacheData ||= {}
    cursorCache[id] = cacheData
    let orderType: number | undefined
    let cursor: number | string | undefined
    let offset: number | undefined
    if (page === 1) {
      const now = Date.now()
      cacheData.page = 1
      cacheData.cursor = now
      cacheData.prevCursor = now
      cursor = now
      orderType = 1
      offset = 0
    } else if (cacheData.page) {
      cursor = cacheData.cursor
      if (page > cacheData.page) {
        orderType = 1
        offset = (page - cacheData.page - 1) * limit
      } else if (page < cacheData.page) {
        orderType = 0
        offset = (cacheData.page - page - 1) * limit
      } else {
        cacheData.cursor = cacheData.prevCursor
        cursor = cacheData.prevCursor
        offset = cacheData.offset
        orderType = cacheData.orderType
      }
    }
    return {
      orderType,
      cursor,
      offset,
    }
  },
  setCursor(id: string, cursor: string, orderType: number | undefined, offset: number | undefined, page: number) {
    let cacheData = cursorCache[id]
    cacheData ||= {}
    cursorCache[id] = cacheData
    cacheData.prevCursor = cacheData.cursor
    cacheData.cursor = cursor
    cacheData.orderType = orderType
    cacheData.offset = offset
    cacheData.page = page
  },
}

const getSongId = (musicInfo: AnyListen_API.MusicInfoOnline): string => {
  const { meta } = musicInfo
  if (typeof meta.musicId === 'string' || typeof meta.musicId === 'number') return String(meta.musicId)
  return musicInfo.id
}

const formatReplyComment = (item: CommentElement): AnyListen_API.MusicCommentItem => {
  const data: AnyListen_API.MusicCommentItem = {
    id: String(item.commentId),
    text: item.content ? applyEmoji(item.content) : '',
    time: item.time || undefined,
    location: item.ipLocation?.location,
    userName: item.user.nickname,
    avatar: item.user.avatarUrl,
    userId: String(item.user.userId),
    likedCount: item.likedCount,
    reply: [],
  }

  const replyData = item.beReplied?.[0]
  return replyData
    ? {
        id: String(item.commentId),
        text: replyData.content ? applyEmoji(replyData.content) : '',
        time: item.time || undefined,
        location: replyData.ipLocation?.location,
        userName: replyData.user.nickname,
        avatar: replyData.user.avatarUrl,
        userId: String(replyData.user.userId),
        likedCount: undefined,
        reply: [data],
      }
    : data
}

const filterComment = (rawList: CommentElement[]): AnyListen_API.MusicCommentItem[] => {
  return rawList.map((item) => formatReplyComment(item))
}

const filterHotComment = (rawList: HotComment[]): AnyListen_API.MusicCommentItem[] => {
  return rawList.map((item) => ({
    id: String(item.commentId),
    text: item.content ? applyEmoji(item.content) : '',
    time: item.time || undefined,
    location: item.ipLocation?.location,
    userName: item.user.nickname,
    avatar: item.user.avatarUrl,
    userId: String(item.user.userId),
    likedCount: item.likedCount,
    reply: [],
  }))
}

export const getComment = async (
  musicInfo: AnyListen_API.MusicInfoOnline,
  page = 1,
  limit = 20
): Promise<{
  list: AnyListen_API.MusicCommentItem[]
  total: number
  page: number
  limit: number
}> => {
  const songId = getSongId(musicInfo)
  const id = `R_SO_4_${songId}`
  const cursorInfo = cursorTools.getCursor(songId, page, limit)

  const { body, statusCode } = await weapiRequest<CommentResp>('https://music.163.com/weapi/comment/resource/comments/get', {
    cursor: cursorInfo.cursor,
    offset: cursorInfo.offset,
    orderType: cursorInfo.orderType,
    pageNo: page,
    pageSize: limit,
    rid: id,
    threadId: id,
  })

  if (statusCode !== 200 || body.code !== 200) throw new Error('wy getComment failed')
  cursorTools.setCursor(songId, body.data.cursor, cursorInfo.orderType, cursorInfo.offset, page)

  return {
    list: filterComment(body.data.comments),
    total: body.data.totalCount,
    page,
    limit,
  }
}

export const getHotComment = async (
  musicInfo: AnyListen_API.MusicInfoOnline,
  page = 1,
  limit = 100
): Promise<{
  list: AnyListen_API.MusicCommentItem[]
  total: number
  page: number
  limit: number
}> => {
  const songId = getSongId(musicInfo)
  const id = `R_SO_4_${songId}`
  const hotPage = page - 1

  const { body, statusCode } = await weapiRequest<CommentHot>(`https://music.163.com/weapi/v1/resource/hotcomments/${id}`, {
    rid: id,
    limit,
    offset: limit * hotPage,
    beforeTime: Date.now().toString(),
  })

  if (statusCode !== 200 || body.code !== 200) throw new Error('wy getHotComment failed')

  return {
    list: filterHotComment(body.hotComments),
    total: body.total ?? 0,
    page,
    limit,
  }
}

export const musicComment = async (options: {
  musicInfo: AnyListen_API.MusicInfoOnline
  type: 'hot' | 'new' | 'reply'
  page: number
  limit?: number
  id?: string
}) => {
  const { musicInfo, type, page, limit } = options
  switch (type) {
    case 'new':
      return getComment(musicInfo, page, limit)
    case 'hot':
      return getHotComment(musicInfo, page, limit)
    case 'reply':
      if (!options.id) throw new Error('id is required for reply type')
      throw new Error('reply comment is not supported yet')
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    default:
      break
  }
  throw new Error('Invalid comment type')
}
