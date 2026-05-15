import { request } from '@/shared/hostApi'

import type { Comment as CommentResp, CommentElement, HotComment, ReplyComment } from './types/musicComment'
import type { CommentHot } from './types/musicCommentHot'

const headers = {
  'User-Agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
}

const successCode = '000000'
const lastCommentIds = new Map<string, Map<number, string>>()

const getSongId = (musicInfo: AnyListen_API.MusicInfoOnline): string => {
  const id = musicInfo.meta.musicId
  if (typeof id === 'string' || typeof id === 'number') return String(id)
  throw new Error('songId not found')
}

const buildReplyItem = (item: ReplyComment): AnyListen_API.MusicCommentItem => ({
  id: String(item.replyId),
  text: item.replyInfo || '',
  time: Number(item.replyTime) || undefined,
  userName: item.user.nickName,
  avatar: item.user.middleIcon || item.user.bigIcon || item.user.smallIcon,
  userId: String(item.user.userId),
  likedCount: undefined,
  reply: [],
})

const buildCommentItem = (item: CommentElement | HotComment): AnyListen_API.MusicCommentItem => ({
  id: String(item.commentId),
  text: item.commentInfo || '',
  time: Number(item.commentTime) || undefined,
  userName: item.user.nickName,
  avatar: item.user.middleIcon || item.user.bigIcon || item.user.smallIcon,
  userId: String(item.user.userId),
  likedCount: item.opNumItem?.thumbNum,
  reply: (item.replyComments ?? []).map((reply) => buildReplyItem(reply as ReplyComment)),
})

const filterComment = (rawList?: Array<CommentElement | HotComment>) => {
  if (!rawList) return []
  return rawList.map((item) => buildCommentItem(item))
}

const getCommentCursorMap = (songId: string) => {
  let map = lastCommentIds.get(songId)
  if (!map) {
    map = new Map<number, string>()
    lastCommentIds.set(songId, map)
  }
  return map
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
  const cursorMap = getCommentCursorMap(songId)

  if (page === 1) cursorMap.clear()

  const commentId = cursorMap.get(page) ?? ''
  if (page > 1 && !commentId) throw new Error('mg getComment failed')

  const { body, statusCode } = await request<CommentResp>(
    `https://app.c.nf.migu.cn/MIGUM3.0/user/comment/stack/v1.0?pageSize=${limit}&queryType=1&resourceId=${songId}&resourceType=2&commentId=${commentId}`,
    { headers }
  )

  if (statusCode !== 200 || body.code !== successCode) throw new Error('mg getComment failed')

  const list = filterComment(body.data.comments)
  cursorMap.set(page + 1, list.length ? String(list[list.length - 1].id) : '')

  return {
    list,
    total: Number(body.data.commentNums) || 0,
    page,
    limit,
  }
}

export const getHotComment = async (
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
  const { body, statusCode } = await request<CommentHot>(
    `https://app.c.nf.migu.cn/MIGUM3.0/user/comment/stack/v1.0?pageSize=${limit}&queryType=2&resourceId=${songId}&resourceType=2&hotCommentStart=${(page - 1) * limit}`,
    { headers }
  )

  if (statusCode !== 200 || body.code !== successCode) throw new Error('mg getHotComment failed')

  return {
    list: filterComment(body.data.hotComments),
    total: Number(body.data.cfgHotCount) || 0,
    page,
    limit,
  }
}

interface ReplyResp {
  code: string
  info: string
  data: {
    replyTotalCount: string | number
    mainCommentItem?: {
      replyComments?: ReplyComment[]
    }
  }
}

export const getReplyComment = async (
  musicInfo: AnyListen_API.MusicInfoOnline,
  replyId: string,
  page = 1,
  limit = 100
): Promise<{
  list: AnyListen_API.MusicCommentItem[]
  total: number
  page: number
  limit: number
}> => {
  const songId = getSongId(musicInfo)
  const { body, statusCode } = await request<ReplyResp>(
    `https://app.c.nf.migu.cn/MIGUM3.0/user/comment/stack/${replyId}/v1.0?pageSize=${limit}&queryType=2&resourceId=${songId}&resourceType=2&start=${(page - 1) * limit}`,
    { headers }
  )

  if (statusCode !== 200 || body.code !== successCode) throw new Error('mg getReplyComment failed')

  return {
    list: (body.data.mainCommentItem?.replyComments ?? []).map((item) => buildReplyItem(item)),
    total: Number(body.data.replyTotalCount) || 0,
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
      return getReplyComment(musicInfo, options.id, page, limit)
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    default:
      break
  }
  throw new Error('Invalid comment type')
}
