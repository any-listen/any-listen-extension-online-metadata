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
  target_engine: '1.1.1',
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
        resource: ['musicSearch', 'musicPic', 'musicLyric'],
      },
      {
        id: 'kw',
        name: '{kwName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric'],
      },
      {
        id: 'wy',
        name: '{wyName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric'],
      },
      {
        id: 'tx',
        name: '{txName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric'],
      },
    ],
  },
}

export default config
