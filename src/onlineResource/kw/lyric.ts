import { buffer, console, request } from '@/shared/hostApi'
import { lrcTools } from './util'
import decodeLyric from './decodeLyric'
import { decodeName } from '@/shared/utils'

const buf_key = buffer.from('yeelion')
const buf_key_len = buf_key.length
const buildParams = (id: string, isGetLyricx: boolean) => {
  let params = `user=12345,web,web,web&requester=localhost&req=1&rid=MUSIC_${id}`
  if (isGetLyricx) params += '&lrcx=1'
  const buf_str = buffer.from(params)
  const buf_str_len = buf_str.length
  const output = new Uint16Array(buf_str_len)
  let i = 0
  while (i < buf_str_len) {
    let j = 0
    while (j < buf_key_len && i < buf_str_len) {
      output[i] = buf_key[j] ^ buf_str[i]
      i++
      j++
    }
  }
  return buffer.bufToString(new Uint8Array(output), 'base64')
}

// console.log(buildParams('207527604', false))
// console.log(buildParams('207527604', true))

interface LrcLine {
  time: string
  text: string
}
const timeExp = /^\[([\d:.]*)\]{1}/g
const existTimeExp = /\[\d{1,2}:.*\d{1,4}\]/
const lyricxTag = /^<-?\d+,-?\d+>/

const sortLrcArr = (arr: LrcLine[]) => {
  const lrcSet = new Set()
  const lrc: LrcLine[] = []
  const lrcT: LrcLine[] = []

  let isLyricx = false
  for (const item of arr) {
    if (lrcSet.has(item.time)) {
      if (lrc.length < 2) continue
      const tItem = lrc.pop()!
      tItem.time = lrc[lrc.length - 1].time
      lrcT.push(tItem)
      lrc.push(item)
    } else {
      lrc.push(item)
      lrcSet.add(item.time)
    }
    if (!isLyricx && lyricxTag.test(item.text)) isLyricx = true
  }

  if (!isLyricx && lrcT.length > lrc.length * 0.3 && lrc.length - lrcT.length > 6) {
    throw new Error('failed')
    // if (lrc.length * 0.4 < lrcT.length) { // 翻译数量需大于歌词数量的0.4倍，否则认为没有翻译
    //   const tItem = lrc.pop()
    //   tItem.time = lrc[lrc.length - 1].time
    //   lrcT.push(tItem)
    // } else {
    //   lrc = arr
    //   lrcT = []
    // }
  }

  return {
    lrc,
    lrcT,
  }
}
const transformLrc = (tags: string[], lrclist: LrcLine[]) => {
  return `${tags.join('\n')}\n${lrclist ? lrclist.map((l) => `[${l.time}]${l.text}\n`).join('') : '暂无歌词'}`
}
const parseLrc = (lrc: string) => {
  const lines = lrc.split(/\r\n|\r|\n/)
  const tags = []
  const lrcArr = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    const result = timeExp.exec(line)
    if (result) {
      const text = line.replace(timeExp, '').trim()
      let time = RegExp.$1
      if (/\.\d\d$/.test(time)) time += '0'
      lrcArr.push({
        time,
        text,
      })
    } else if (lrcTools.rxps.tagLine.test(line)) {
      tags.push(line)
    }
  }
  const lrcInfo = sortLrcArr(lrcArr)
  return {
    lyric: decodeName(transformLrc(tags, lrcInfo.lrc)),
    tlyric: lrcInfo.lrcT.length ? decodeName(transformLrc(tags, lrcInfo.lrcT)) : '',
  }
}
export const getLyric = async (musicInfo: AnyListen_API.MusicInfo, isGetLyricx = true) => {
  // getLyric2(musicInfo)
  const resp = await request<string>(`http://newlyric.kuwo.cn/newlyric.lrc?${buildParams(musicInfo.id, isGetLyricx)}`, {
    needRaw: true,
  })
  if (resp.statusCode != 200) throw new Error(JSON.stringify(resp.body))
  const rawLrc = await decodeLyric(resp.raw, isGetLyricx)
  // console.log(Buffer.from(base64Data, 'base64').toString())
  let lrcInfo: {
    lyric: string
    tlyric: string
    awlyric?: string
    rlyric?: string
  }
  try {
    lrcInfo = parseLrc(rawLrc)
  } catch {
    throw new Error('Get lyric failed')
  }
  // console.log(lrcInfo)
  if (lrcInfo.tlyric) lrcInfo.tlyric = lrcInfo.tlyric.replace(lrcTools.rxps.wordTimeAll, '')
  try {
    lrcInfo.awlyric = lrcTools.parse(lrcInfo.lyric)
  } catch {
    lrcInfo.awlyric = ''
  }
  lrcInfo.lyric = lrcInfo.lyric.replace(lrcTools.rxps.wordTimeAll, '')
  if (!existTimeExp.test(lrcInfo.lyric)) return Promise.reject(new Error('Get lyric failed'))
  // console.log(lrcInfo)
  console.log('kw lyric:', musicInfo.meta.musicId)
  return lrcInfo
}
