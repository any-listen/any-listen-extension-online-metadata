import { request } from '@/shared/hostApi'

import type { Comment as CommentResp, CommentElement } from './types/musicComment'
import type { CommentHot, HotComment } from './types/musicCommentHot'

const headers = {
  'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9;)',
}

const getSongId = (musicInfo: AnyListen_API.MusicInfoOnline): string => {
  const { meta } = musicInfo
  if (typeof meta.musicId === 'string' || typeof meta.musicId === 'number') return String(meta.musicId)
  return String(musicInfo.id)
}

const formatReplyComment = (item: HotComment): AnyListen_API.MusicCommentItem => {
  const reply = item.reply
  const replyList = reply
    ? [
        {
          id: String(reply.id),
          text: reply.msg,
          time: Number(reply.time) * 1000,
          userName: reply.u_name,
          avatar: reply.u_pic,
          userId: reply.u_id,
          likedCount: Number(reply.like_num),
          images: reply.mpic ? [decodeURIComponent(reply.mpic)] : [],
        },
      ]
    : []

  return {
    id: String(item.id),
    text: item.msg,
    time: Number(item.time) * 1000,
    userName: item.u_name,
    avatar: item.u_pic,
    userId: item.u_id,
    likedCount: Number(item.like_num),
    images: item.mpic ? [decodeURIComponent(item.mpic)] : [],
    reply: replyList,
  }
}

const filterComment = (rawList?: CommentElement[] | HotComment[]): AnyListen_API.MusicCommentItem[] => {
  if (!rawList) return []
  return rawList.map((item) => {
    const replyData = 'child_comments' in item ? item.child_comments : undefined
    return {
      id: String(item.id),
      text: item.msg,
      time: Number(item.time) * 1000,
      userName: item.u_name,
      avatar: item.u_pic,
      userId: item.u_id,
      likedCount: Number(item.like_num),
      images: item.mpic ? [decodeURIComponent(item.mpic)] : [],
      reply: replyData?.map((reply) => formatReplyComment(reply)) ?? [],
    }
  })
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
  const { body, statusCode } = await request<CommentResp>(
    `http://ncomment.kuwo.cn/com.s?f=web&type=get_comment&aapiver=1&prod=kwplayer_ar_10.5.2.0&digest=15&sid=${songId}&start=${limit * (page - 1)}&msgflag=1&count=${limit}&newver=3&uid=0`,
    {
      headers,
    }
  )
  if (statusCode !== 200 || body.code !== '200') throw new Error('kw getComment failed')

  return {
    list: filterComment(body.comments),
    total: body.comments_counts,
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
  const { body, statusCode } = await request<CommentHot>(
    `http://ncomment.kuwo.cn/com.s?f=web&type=get_rec_comment&aapiver=1&prod=kwplayer_ar_10.5.2.0&digest=15&sid=${songId}&start=${limit * (page - 1)}&msgflag=1&count=${limit}&newver=3&uid=0`,
    {
      headers,
    }
  )
  if (statusCode !== 200 || body.code !== '200') throw new Error('kw getHotComment failed')

  return {
    list: filterComment(body.hot_comments),
    total: body.hot_comments_counts,
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
