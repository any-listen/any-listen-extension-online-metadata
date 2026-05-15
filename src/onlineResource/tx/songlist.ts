import { request } from '@/shared/hostApi'
// import { dateFormat, decodeName, formatPlayCount, formatPlayTime, sizeFormate } from '@/shared/utils'
import { dateFormat, decodeName, formatPlayCount } from '@/shared/utils'

import type { Data, Songlist } from './types/songlist'
import type { SonglistByTag } from './types/songlistByTag'
import type { SonglistDetail } from './types/songlistDetail'
// import { formatSingerName } from '../shared'
// import type { Songlist, SonglistDetail } from './types/songlistDetail'
import type { SonglistSearch } from './types/songlistSearch'
import type { SonglistTag, VGroup } from './types/songlistTag'
import { buildMusicList } from './utils'

const pageInfo = {
  limit_list: 36,
  limit_song: 100000,
  successCode: 0,
  sortList: [
    {
      label: 'hot',
      name: '最热',
      id: 5,
    },
    {
      label: 'new',
      name: '最新',
      id: 2,
    },
  ],
}
const regExps = {
  hotTagHtml: /class="c_bg_link js_tag_item" data-id="\w+">.+?<\/a>/g,
  hotTag: /data-id="(\w+)">(.+?)<\/a>/,

  // https://y.qq.com/n/yqq/playlist/7217720898.html
  // https://i.y.qq.com/n2/m/share/details/taoge.html?platform=11&appshare=android_qq&appversion=9050006&id=7217720898&ADTAG=qfshare
  listDetailLink: /\/playlist\/(\d+)/,
  listDetailLink2: /id=(\d+)/,
}

export const getSorts = async (): Promise<AnyListen_API.TagItem[]> => {
  return pageInfo.sortList.map((item) => ({
    id: String(item.id),
    name: `{songlist.sort.${item.label}}`,
  }))
}

const filterTagInfo = (rawList: VGroup[]): AnyListen_API.TagGroupItem[] => {
  return rawList.map((type) => ({
    name: type.group_name,
    list: type.v_item.map((item) => ({
      id: String(item.id),
      name: item.name,
    })),
  }))
}
const getTag = async (): Promise<AnyListen_API.TagGroupItem[]> => {
  const { body, statusCode } = await request<SonglistTag>(
    'https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=wk_v15.json&needNewCode=0&data=%7B%22tags%22%3A%7B%22method%22%3A%22get_all_categories%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22playlist.PlaylistAllCategoriesServer%22%7D%7D'
  )
  if (statusCode !== 200) throw new Error('tx getHotTag failed')
  return filterTagInfo(body.tags.data.v_group)
}
const filterInfoHotTag = (html: string): AnyListen_API.TagItem[] => {
  let hotTag = html.match(regExps.hotTagHtml)
  const hotTags: AnyListen_API.TagItem[] = []
  if (!hotTag) return hotTags

  hotTag.forEach((tagHtml) => {
    let result = regExps.hotTag.exec(tagHtml)
    if (!result) return
    hotTags.push({
      id: result[1],
      name: result[2],
    })
  })
  return hotTags
}
const getHotTag = async (): Promise<AnyListen_API.TagItem[]> => {
  const { body, statusCode } = await request<string>('https://c.y.qq.com/node/pc/wk_v15/category_playlist.html')
  if (statusCode !== 200) throw new Error('tx getHotTag failed')
  return filterInfoHotTag(body)
}
export const getTags = async (): Promise<{ tags: AnyListen_API.TagGroupItem[]; hotTags: AnyListen_API.TagItem[] }> => {
  const [tags, hotTags] = await Promise.all([getTag(), getHotTag()])
  return { tags, hotTags }
}

const getListUrl = (sortId: string | number, id: string | number, page: number, limit: number) => {
  if (id) {
    if (typeof id === 'string') id = parseInt(id)
    return `https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=wk_v15.json&needNewCode=0&data=${encodeURIComponent(
      JSON.stringify({
        comm: { cv: 1602, ct: 20 },
        playlist: {
          method: 'get_category_content',
          param: {
            titleid: id,
            caller: '0',
            category_id: id,
            size: limit,
            page: page - 1,
            use_page: 1,
          },
          module: 'playlist.PlayListCategoryServer',
        },
      })
    )}`
  }
  return `https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=wk_v15.json&needNewCode=0&data=${encodeURIComponent(
    JSON.stringify({
      comm: { cv: 1602, ct: 20 },
      playlist: {
        method: 'get_playlist_by_tag',
        param: { id: 10000000, sin: limit * (page - 1), size: limit, order: sortId, cur_page: page },
        module: 'playlist.PlayListPlazaServer',
      },
    })
  )}`
}
const filterList = (data: Data): { list: AnyListen_API.SongListItem[]; total: number } => {
  return {
    list: data.v_playlist.map((item) => ({
      play_count: formatPlayCount(item.access_num),
      id: String(item.tid),
      author: decodeName(item.creator_info.nick),
      name: decodeName(item.title),
      time: item.modify_time ? dateFormat(item.modify_time * 1000, 'Y-M-D') : '',
      img: item.cover_url_medium,
      // grade: item.favorcnt / 10,
      total: item.song_ids?.length,
      desc: decodeName(item.desc).replace(/<br>/g, '\n'),
    })),
    total: data.total,
  }
}
const filterList2 = ({ content }: SonglistByTag['playlist']['data']): { list: AnyListen_API.SongListItem[]; total: number } => {
  // console.log(content.v_item)
  return {
    list: content.v_item.map(({ basic }) => ({
      play_count: formatPlayCount(basic.play_cnt),
      id: String(basic.tid),
      author: decodeName(basic.creator.nick),
      name: decodeName(basic.title),
      // time: basic.publish_time,
      img: basic.cover.medium_url || basic.cover.default_url,
      // grade: basic.favorcnt / 10,
      desc: decodeName(basic.desc).replace(/<br>/g, '\n'),
    })),
    total: content.total_cnt,
  }
}
export const getList = async (sortId: string, tagId: string, page: number, limit = pageInfo.limit_list) => {
  const { body } = await request<Songlist | SonglistByTag>(getListUrl(sortId, tagId, page, limit))
  if (body.code !== pageInfo.successCode) throw new Error('tx getList failed')
  return {
    ...(tagId ? filterList2((body as SonglistByTag).playlist.data) : filterList((body as Songlist).playlist.data)),
    limit,
    page,
  }
}

const handleParseId = async (link: string) => {
  const {
    headers: { location },
    statusCode,
  } = await request(link, { maxRedirect: 0 })
  // console.log(headers)
  if (statusCode && statusCode > 400) throw new Error('link request failed')
  return location == null ? link : Array.isArray(location) ? location[0] : location
}
const getListId = async (id: string) => {
  if (/[?&:/]/.test(id)) {
    if (!regExps.listDetailLink.test(id)) {
      id = await handleParseId(id)
    }
    let result = regExps.listDetailLink.exec(id)
    if (!result) {
      result = regExps.listDetailLink2.exec(id)
      if (!result) throw new Error('failed')
    }
    id = result[1]
    // console.log(id)
  }
  return id
}

export const getListDetail = async (
  id: string,
  page: number,
  limit = pageInfo.limit_song
): Promise<{
  list: AnyListen_API.MusicInfoOnline[]
  total: number
  limit: number
  page: number
  info: AnyListen_API.SongListDetailInfo
}> => {
  id = await getListId(id)

  const { body } = await request<SonglistDetail>(
    `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&new_format=1&disstid=${id}&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`,
    {
      headers: {
        Origin: 'https://y.qq.com',
        Referer: `https://y.qq.com/n/yqq/playsquare/${id}.html`,
      },
    }
  )

  if (body.code !== pageInfo.successCode) throw new Error('tx getListDetail failed')
  const cdlist = body.cdlist[0]
  return {
    list: buildMusicList(cdlist.songlist),
    total: cdlist.songlist.length,
    limit: cdlist.songlist.length + 1,
    page,
    info: {
      name: decodeName(cdlist.dissname),
      img: cdlist.logo,
      desc: decodeName(cdlist.desc).replace(/<br>/g, '\n'),
      author: decodeName(cdlist.nickname),
      play_count: formatPlayCount(cdlist.visitnum),
    },
  }
}

// export const getDetailPageUrl = async (id: string) => {
//   id = await getListId(id)
//   return `https://y.qq.com/n/ryqq/playlist/${id}`
// }

export const search = async (
  text: string,
  page: number,
  limit = 20
): Promise<{ list: AnyListen_API.SongListItem[]; total: number; limit: number; page: number }> => {
  const { body } = await request<SonglistSearch>(
    `http://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist?page_no=${page - 1}&num_per_page=${limit}&format=json&query=${encodeURIComponent(text)}&remoteplace=txt.yqq.playlist&inCharset=utf8&outCharset=utf-8`,
    {
      headers: {
        Referer: 'http://y.qq.com/portal/search.html',
      },
    }
  )
  if (body.code != 0) throw new Error('tx search failed')
  return {
    list: body.data.list.map((item) => {
      return {
        play_count: formatPlayCount(item.listennum),
        id: String(item.dissid),
        author: decodeName(item.creator.name),
        name: decodeName(item.dissname),
        time: dateFormat(item.createtime, 'Y-M-D'),
        img: item.imgurl,
        // grade: item.favorcnt / 10,
        total: item.song_count,
        desc: decodeName(decodeName(item.introduction)).replace(/<br>/g, '\n'),
      }
    }),
    total: body.data.sum,
    limit,
    page,
  }
}
