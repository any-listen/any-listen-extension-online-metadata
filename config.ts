import type { ExtensionConfig } from '@any-listen/extension-kit/config'

import pkg from './package.json' with { type: 'json' }

const config: ExtensionConfig = {
  id: 'online-metadata',
  name: 'Online Metadata',
  description: '{description}',
  version: pkg.version,
  homepage: pkg.homepage,
  license: pkg.license,
  author: pkg.author,
  target_engine: '1.2.0',
  categories: [],
  tags: [],
  download_url_template: 'https://github.com/any-listen/any-listen-extension-online-metadata/releases/download/v{version}',
  icon: './resources/icon.png',
  grant: ['internet'],
  contributes: {
    resource: [
      {
        id: 'kg',
        name: '{kgName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric', 'songlistSearch', 'songlist', 'topSongs', 'tipSearch', 'hotSearch'],
      },
      {
        id: 'kw',
        name: '{kwName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric', 'songlistSearch', 'songlist', 'topSongs', 'tipSearch', 'hotSearch'],
      },
      {
        id: 'wy',
        name: '{wyName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric', 'songlistSearch', 'songlist', 'topSongs', 'tipSearch', 'hotSearch'],
      },
      {
        id: 'tx',
        name: '{txName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric', 'songlistSearch', 'songlist', 'topSongs', 'tipSearch', 'hotSearch'],
      },
      {
        id: 'mg',
        name: '{mgName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric', 'songlistSearch', 'songlist', 'topSongs', 'tipSearch', 'hotSearch'],
      },
    ],
  },
}

export default config
