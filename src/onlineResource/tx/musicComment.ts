import { request } from '@/shared/hostApi'
import { dateFormat } from '@/shared/utils'

import { getMusicInfo } from './musicInfo'
import type { Comment as CommentResp, Commentlist, Middlecommentcontent } from './types/musicComment'
import type { Comment as HotCommentItem, CommentHot, SubComment } from './types/musicCommentHot'

const emojis: Record<string, string> = {
  e400846: '😘',
  e400874: '😴',
  e400825: '😃',
  e400847: '😙',
  e400835: '😍',
  e400873: '😳',
  e400836: '😎',
  e400867: '😭',
  e400832: '😊',
  e400837: '😏',
  e400875: '😫',
  e400831: '😉',
  e400855: '😡',
  e400823: '😄',
  e400862: '😨',
  e400844: '😖',
  e400841: '😓',
  e400830: '😈',
  e400828: '😆',
  e400833: '😋',
  e400822: '😀',
  e400843: '😕',
  e400829: '😇',
  e400824: '😂',
  e400834: '😌',
  e400877: '😷',
  e400132: '🍉',
  e400181: '🍺',
  e401067: '☕️',
  e400186: '🥧',
  e400343: '🐷',
  e400116: '🌹',
  e400126: '🍃',
  e400613: '💋',
  e401236: '❤️',
  e400622: '💔',
  e400637: '💣',
  e400643: '💩',
  e400773: '🔪',
  e400102: '🌛',
  e401328: '🌞',
  e400420: '👏',
  e400914: '🙌',
  e400408: '👍',
  e400414: '👎',
  e401121: '✋',
  e400396: '👋',
  e400384: '👉',
  e401115: '✊',
  e400402: '👌',
  e400905: '🙈',
  e400906: '🙉',
  e400907: '🙊',
  e400562: '👻',
  e400932: '🙏',
  e400644: '💪',
  e400611: '💉',
  e400185: '🎁',
  e400655: '💰',
  e400325: '🐥',
  e400612: '💊',
  e400198: '🎉',
  e401685: '⚡️',
  e400631: '💝',
  e400768: '🔥',
  e400432: '👑',
}

const songIdMap = new Map<string, string>()
const promises = new Map<string, Promise<AnyListen_API.MusicInfoOnline | null>>()

const getSongId = async ({ meta }: AnyListen_API.MusicInfoOnline): Promise<string> => {
  const { songId, musicId } = meta
  if (songId) return songId as string
  if (songIdMap.has(musicId)) return songIdMap.get(musicId)!
  let promise = promises.get(musicId)
  if (!promise) {
    promise = getMusicInfo(musicId)
    promises.set(musicId, promise)
  }
  const info = await promise
  const id = info?.meta.songId as string | undefined
  songIdMap.set(musicId, id || '')
  promises.delete(musicId)
  return id || ''
}

const formatTime = (time: string | number) => {
  return String(time).length < 10 ? null : parseInt(`${time}000`)
}

const replaceEmoji = (msg: string) => {
  const result = msg.match(/\[em\]e\d+\[\/em\]/g)
  if (!result) return msg
  const rxp = /^\[em\](e\d+)\[\/em\]$/
  const uniq = Array.from(new Set(result))
  for (const item of uniq) {
    const code = item.replace(rxp, '$1')
    const itemReg = item.replace('[em]', '\\[em\\]').replace('[/em]', '\\[\\/em\\]')
    msg = msg.replace(new RegExp(itemReg, 'g'), emojis[code] || '')
  }
  return msg
}

const formatReplyByNew = (
  rootId: string,
  commentId: string,
  time: number | null,
  timeStr: string | null,
  c: Middlecommentcontent
): AnyListen_API.MusicCommentItem => {
  return {
    id: `sub_${rootId}_${c.subcommentid}`,
    text: replaceEmoji(c.subcommentcontent).replace(/\\n/g, '\n'),
    time: c.subcommentid === commentId ? (time ?? undefined) : undefined,
    userName: c.replynick ? c.replynick.substring(1) : '',
    avatar: c.avatarurl ?? undefined,
    userId: c.encrypt_replyuin,
    likedCount: c.praisenum ?? undefined,
  }
}

const filterNewComment = (rawList: Commentlist[]) => {
  return rawList.map((item) => {
    const time = formatTime(item.time)
    const timeStr = time ? dateFormat(time) : null
    const middlecommentcontent = item.middlecommentcontent ? [...item.middlecommentcontent] : []

    if (middlecommentcontent.length) {
      middlecommentcontent[0].avatarurl = item.avatarurl ?? undefined
      middlecommentcontent[0].praisenum = item.praisenum ?? undefined
      middlecommentcontent.reverse()
    }

    return {
      id: `${item.rootcommentid}_${item.commentid}`,
      text: item.rootcommentcontent ? replaceEmoji(item.rootcommentcontent).replace(/\\n/g, '\n') : '',
      time: item.rootcommentid === item.commentid ? (time ?? undefined) : undefined,
      userName: item.rootcommentnick ? item.rootcommentnick.substring(1) : '',
      avatar: item.avatarurl ?? undefined,
      userId: item.encrypt_rootcommentuin,
      likedCount: item.praisenum ?? undefined,
      reply: middlecommentcontent.map((c) => formatReplyByNew(item.rootcommentid, item.commentid, time, timeStr, c)),
    }
  })
}

const formatReplyByHot = (c: SubComment): AnyListen_API.MusicCommentItem => {
  const time = c.PubTime ? formatTime(c.PubTime) : null
  return {
    id: `sub_${c.SeqNo}_${c.CmId}`,
    text: replaceEmoji(c.Content).replace(/\\n/g, '\n'),
    time: time ?? undefined,
    userName: c.Nick ?? '',
    avatar: c.Avatar,
    images: c.Pic ? [c.Pic] : [],
    userId: c.EncryptUin,
    likedCount: c.PraiseNum,
  }
}

const filterHotComment = (rawList: HotCommentItem[]) => {
  return rawList.map((item) => {
    const time = item.PubTime ? formatTime(item.PubTime) : null
    return {
      id: `${item.SeqNo}_${item.CmId}`,
      text: item.Content ? replaceEmoji(item.Content).replace(/\\n/g, '\n') : '',
      time: time ?? undefined,
      userName: item.Nick ?? '',
      images: item.Pic ? [item.Pic] : [],
      avatar: item.Avatar,
      location: item.Location || '',
      userId: item.EncryptUin,
      likedCount: item.PraiseNum,
      reply: item.SubComments ? item.SubComments.map((c) => formatReplyByHot(c)) : [],
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
  const songId = await getSongId(musicInfo)
  const { body, statusCode } = await request<CommentResp>('http://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg', {
    method: 'POST',
    form: {
      uin: '0',
      format: 'json',
      cid: '205360772',
      reqtype: '2',
      biztype: '1',
      topid: songId,
      cmd: '8',
      needmusiccrit: '1',
      pagenum: page - 1,
      pagesize: limit,
    },
  })

  if (statusCode !== 200 || body.code !== 0) throw new Error('tx getComment failed')
  const total = body.comment?.commenttotal ?? 0
  const rawList = body.comment?.commentlist ?? []

  return {
    list: filterNewComment(rawList),
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
  const songId = await getSongId(musicInfo)

  const { body, statusCode } = await request<CommentHot>('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    method: 'POST',
    json: {
      comm: {
        cv: 4747474,
        ct: 24,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 1,
        uin: 0,
      },
      req: {
        module: 'music.globalComment.CommentRead',
        method: 'GetHotCommentList',
        param: {
          BizType: 1,
          BizId: String(songId),
          LastCommentSeqNo: '',
          PageSize: limit,
          PageNum: page - 1,
          HotType: 1,
          WithAirborne: 0,
          PicEnable: 1,
        },
      },
    },
    headers: {
      referer: 'https://y.qq.com/',
      origin: 'https://y.qq.com',
    },
  })

  if (statusCode !== 200 || body.code !== 0 || body.req?.code !== 0) throw new Error('tx getHotComment failed')

  const listData = body.req?.data?.CommentList
  const total = listData?.Total ?? 0
  return {
    list: filterHotComment(listData?.Comments ?? []),
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
      // return getReplyComment(musicInfo, options.id, page, limit)
      throw new Error('reply comment is not supported yet')
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    default:
      break
  }
  throw new Error('Invalid comment type')
}
