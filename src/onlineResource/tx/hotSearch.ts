import { request } from '@/shared/hostApi'

import type { HotSearch } from './types/hotSearch'

export const search = async () => {
  const { body, statusCode } = await request<HotSearch>('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    method: 'POST',
    headers: {
      Referer: 'https://y.qq.com/portal/player.html',
    },
    json: {
      comm: {
        ct: '19',
        cv: '1803',
        guid: '0',
        patch: '118',
        psrf_access_token_expiresAt: 0,
        psrf_qqaccess_token: '',
        psrf_qqopenid: '',
        psrf_qqunionid: '',
        tmeAppID: 'qqmusic',
        tmeLoginType: 0,
        uin: '0',
        wid: '0',
      },
      hotkey: {
        method: 'GetHotkeyForQQMusicPC',
        module: 'tencent_musicsoso_hotkey.HotkeyService',
        param: {
          search_id: '',
          uin: 0,
        },
      },
    },
  })

  if (statusCode !== 200 || body.code !== 0) throw new Error('tx hotSearch failed')

  return (body.hotkey?.data?.vec_hotkey ?? []).map((item) => item.query ?? '').filter(Boolean)
}
