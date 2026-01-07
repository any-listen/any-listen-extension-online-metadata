import type { Manifest } from './src/types/extensionConfig'
import pkg from './package.json' with { type: 'json' }

const config: Manifest = {
  id: 'online-metadata',
  name: 'Online Metadata',
  version: pkg.version,
  homepage: pkg.homepage,
  license: pkg.license,
  author: pkg.author,
  categories: [],
  tags: [],
  download_url_template: 'https://github.com/any-listen/any-listen-extension-online-metadata/releases/download/v{version}',
  icon: './resources/icon.png',
  grant: ['internet'],
  contributes: {
    resource: [
      {
        id: 'kw',
        name: '{kwName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric'],
      },
      {
        id: 'tx',
        name: '{txName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric'],
      },
      {
        id: 'wy',
        name: '{wyName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric'],
      },
      {
        id: 'kg',
        name: '{kgName}',
        resource: ['musicSearch', 'musicPic', 'musicLyric'],
      },
    ],
  },
}

export default config
