import { request } from '@/shared/hostApi'
import { dateFormat, decodeName, formatPlayCount, formatPlayTime, sizeFormate } from '@/shared/utils'
import { formatSingerName } from '../shared'

const pageInfo = {
  limit_list: 36,
  limit_song: 100000,
  successCode: 0,
  sortList: [
    {
      name: '最热',
      id: 5,
    },
    {
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

const filterTagInfo = (rawList) => {
  return rawList.map((type) => ({
    name: type.group_name,
    list: type.v_item.map((item) => ({
      parent_id: type.group_id,
      parent_name: type.group_name,
      id: item.id,
      name: item.name,
      source: 'tx',
    })),
  }))
}
const getTag = async () => {
  const { body, statusCode } = await request(
    'https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=wk_v15.json&needNewCode=0&data=%7B%22tags%22%3A%7B%22method%22%3A%22get_all_categories%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22playlist.PlaylistAllCategoriesServer%22%7D%7D'
  )
  if (statusCode !== 200) throw new Error('tx getHotTag failed')
  return filterTagInfo(body.tags.data.v_group)
}
const filterInfoHotTag = (html: string) => {
  let hotTag = html.match(regExps.hotTagHtml)
  const hotTags = []
  if (!hotTag) return hotTags

  hotTag.forEach((tagHtml) => {
    let result = tagHtml.match(regExps.hotTag)
    if (!result) return
    hotTags.push({
      id: parseInt(result[1]),
      name: result[2],
      source: 'tx',
    })
  })
  return hotTags
}
const getHotTag = async () => {
  const { body, statusCode } = await request<string>('https://c.y.qq.com/node/pc/wk_v15/category_playlist.html')
  if (statusCode !== 200) throw new Error('tx getHotTag failed')
  return filterInfoHotTag(body)
}
export const getTags = async () => {
  const [tags, hotTag] = await Promise.all([getTag(), getHotTag()])
  return { tags, hotTag, source: 'tx' }
}

const getListUrl = (sortId: number, id: number | string, page: number) => {
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
            size: pageInfo.limit_list,
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
        param: { id: 10000000, sin: pageInfo.limit_list * (page - 1), size: pageInfo.limit_list, order: sortId, cur_page: page },
        module: 'playlist.PlayListPlazaServer',
      },
    })
  )}`
}
const filterList = (data, page) => {
  return {
    list: data.v_playlist.map((item) => ({
      play_count: formatPlayCount(item.access_num),
      id: String(item.tid),
      author: item.creator_info.nick,
      name: item.title,
      time: item.modify_time ? dateFormat(item.modify_time * 1000, 'Y-M-D') : '',
      img: item.cover_url_medium,
      // grade: item.favorcnt / 10,
      total: item.song_ids?.length,
      desc: decodeName(item.desc).replace(/<br>/g, '\n'),
      source: 'tx',
    })),
    total: data.total,
    page,
    limit: pageInfo.limit_list,
    source: 'tx',
  }
}
const filterList2 = ({ content }, page) => {
  // console.log(content.v_item)
  return {
    list: content.v_item.map(({ basic }) => ({
      play_count: formatPlayCount(basic.play_cnt),
      id: String(basic.tid),
      author: basic.creator.nick,
      name: basic.title,
      // time: basic.publish_time,
      img: basic.cover.medium_url || basic.cover.default_url,
      // grade: basic.favorcnt / 10,
      desc: decodeName(basic.desc).replace(/<br>/g, '\n'),
      source: 'tx',
    })),
    total: content.total_cnt,
    page,
    limit: pageInfo.limit_list,
    source: 'tx',
  }
}
export const getList = async (sortId: number, tagId: number, page: number) => {
  const { body } = await request(getListUrl(sortId, tagId, page))
  if (body.code !== pageInfo.successCode) throw new Error('tx getList failed')
  return tagId ? filterList2(body.playlist.data, page) : filterList(body.playlist.data, page)
}

const handleParseId = async (link) => {
  const {
    headers: { location },
    statusCode,
  } = await request(link, { maxRedirect: 0 })
  // console.log(headers)
  if (statusCode && statusCode > 400) throw new Error('link request failed')
  return location == null ? link : location
}
const getListId = async (id) => {
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
const filterListDetail = (rawList) => {
  // console.log(rawList)
  return rawList.map((item) => {
    let types = []
    let _types = {}
    if (item.file.size_128mp3 !== 0) {
      let size = sizeFormate(item.file.size_128mp3)
      types.push({ type: '128k', size })
      _types['128k'] = {
        size,
      }
    }
    if (item.file.size_320mp3 !== 0) {
      let size = sizeFormate(item.file.size_320mp3)
      types.push({ type: '320k', size })
      _types['320k'] = {
        size,
      }
    }
    if (item.file.size_flac !== 0) {
      let size = sizeFormate(item.file.size_flac)
      types.push({ type: 'flac', size })
      _types.flac = {
        size,
      }
    }
    if (item.file.size_hires !== 0) {
      let size = sizeFormate(item.file.size_hires)
      types.push({ type: 'flac24bit', size })
      _types.flac24bit = {
        size,
      }
    }
    // types.reverse()
    return {
      singer: formatSingerName(item.singer, 'name'),
      name: item.title,
      albumName: item.album.name,
      albumId: item.album.mid,
      source: 'tx',
      interval: formatPlayTime(item.interval),
      songId: item.id,
      albumMid: item.album.mid,
      strMediaMid: item.file.media_mid,
      songmid: item.mid,
      img:
        item.album.name === '' || item.album.name === '空'
          ? item.singer?.length
            ? `https://y.gtimg.cn/music/photo_new/T001R500x500M000${item.singer[0].mid}.jpg`
            : ''
          : `https://y.gtimg.cn/music/photo_new/T002R500x500M000${item.album.mid}.jpg`,
      lrc: null,
      otherSource: null,
      types,
      _types,
      typeUrl: {},
    }
  })
}
export const getListDetail = async (id) => {
  id = await getListId(id)

  const { body } = await request(
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
    list: filterListDetail(cdlist.songlist),
    page: 1,
    limit: cdlist.songlist.length + 1,
    total: cdlist.songlist.length,
    source: 'tx',
    info: {
      name: cdlist.dissname,
      img: cdlist.logo,
      desc: decodeName(cdlist.desc).replace(/<br>/g, '\n'),
      author: cdlist.nickname,
      play_count: formatPlayCount(cdlist.visitnum),
    },
  }
}

export const getDetailPageUrl = async (id) => {
  id = await getListId(id)
  return `https://y.qq.com/n/ryqq/playlist/${id}`
}

export const search = async (text, page, limit = 20) => {
  const { body } = await request(
    `http://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist?page_no=${page - 1}&num_per_page=${limit}&format=json&query=${encodeURIComponent(text)}&remoteplace=txt.yqq.playlist&inCharset=utf8&outCharset=utf-8`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
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
        source: 'tx',
      }
    }),
    limit,
    total: body.data.sum,
    source: 'tx',
  }
}
