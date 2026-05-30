import { request } from '@/shared/hostApi'

import type { List as CommentList, MusicComment } from './types/musicComment'
import type { List as HotCommentList, MusicCommentHot } from './types/musicCommentHot'
import { signatureParams } from './utils'

interface AtItem {
  id: string | number
  name: string
}

type AnyCommentList = (CommentList | HotCommentList) & { atlist?: AtItem[] }

const replaceAt = (raw: string, atList: AtItem[]): string => {
  let result = raw
  for (const atObj of atList) {
    result = result.replaceAll(`[at=${String(atObj.id)}]`, `@${atObj.name} `)
  }
  return result
}

const formatImages = (images: CommentList['images'] | HotCommentList['images']): string[] => {
  if (!images || !Array.isArray(images)) return []
  return images.map((i) => (typeof i === 'string' ? i : i.url))
}

const buildCommentItem = (item: AnyCommentList): AnyListen_API.MusicCommentItem => {
  const text = (item.atlist ? replaceAt(item.content, item.atlist) : item.content) || ''
  const time = item.addtimestamp ? item.addtimestamp * 1000 : undefined
  return {
    id: String(item.id),
    text,
    time,
    userName: item.user_name,
    avatar: item.user_pic,
    userId: String(item.user_id),
    likedCount: item.like.likenum,
    images: formatImages(item.images),
    reply: [],
  }
}

const filterComment = (rawList?: AnyCommentList[]): AnyListen_API.MusicCommentItem[] => {
  if (!rawList) return []
  return rawList.map((item) => {
    const data = buildCommentItem(item)
    if (item.pcontent) {
      return {
        id: String(item.id),
        text: item.pcontent,
        time: undefined,
        userName: item.puser,
        avatar: undefined,
        userId: String(item.puser_id),
        likedCount: undefined,
        images: [],
        reply: [data],
      }
    }
    return data
  })
}

const buildParams = (hash: string, page: number, limit: number) => {
  const timestamp = Date.now()
  return `dfid=0&mid=16249512204336365674023395779019&clienttime=${timestamp}&uuid=0&extdata=${hash}&appid=1005&code=fc4be23b4e972707f36b8a828a93ba8a&schash=${hash}&clientver=11409&p=${page}&clienttoken=&pagesize=${limit}&ver=10&kugouid=0`
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
  const hash = (musicInfo.meta.hash as string | undefined) ?? ''
  const params = buildParams(hash, page, limit)
  const signature = await signatureParams(params)
  const { body, statusCode } = await request<MusicComment>(
    `http://m.comment.service.kugou.com/r/v1/rank/newest?${params}&signature=${signature}`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.24',
      },
    }
  )
  if (statusCode !== 200 || body.err_code !== 0) throw new Error('kg getComment failed')
  const total = body.count ?? 0
  return {
    list: filterComment(body.list as AnyCommentList[]),
    total,
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
  const hash = (musicInfo.meta.hash as string | undefined) ?? ''
  const params = buildParams(hash, page, limit)
  const signature = await signatureParams(params)
  const { body, statusCode } = await request<MusicCommentHot>(
    `http://m.comment.service.kugou.com/r/v1/rank/topliked?${params}&signature=${signature}`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.24',
      },
    }
  )
  if (statusCode !== 200 || body.err_code !== 0) throw new Error('kg getHotComment failed')
  const total = body.count ?? 0
  return {
    list: filterComment(body.list as AnyCommentList[]),
    total,
    page,
    limit,
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
  const childrenid = String(musicInfo.meta.musicId)
  const { body, statusCode } = await request<MusicComment>(
    `http://comment.service.kugou.com/index.php?r=commentsv2/getReplyWithLike&code=fc4be23b4e972707f36b8a828a93ba8a&p=${page}&pagesize=${limit}&ver=1.01&clientver=8373&kugouid=687373022&need_show_image=1&appid=1001&childrenid=${childrenid}&tid=${replyId}`,
    {
      headers: {
        'User-Agent': 'Android712-AndroidPhone-8983-18-0-COMMENT-wifi',
      },
    }
  )
  if (statusCode !== 200 || body.err_code !== 0) throw new Error('kg getReplyComment failed')
  const total = body.count ?? 0
  return {
    list: filterComment(body.list as AnyCommentList[]),
    total,
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
