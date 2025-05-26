import fs from 'node:fs'
import path from 'node:path'
import pkg from '../package.json' with { type: 'json' }
import { getSourceDir } from './utils.js'
import { EXTENSION } from './constants.js'

export const createMainifest = async () => {
  const mainifest = {
    id: pkg.name,
    name: pkg.displayName,
    description: '{description}',
    icon: pkg.icon,
    version: pkg.version,
    targetEngine: pkg.targetEngine,
    author: pkg.author,
    homepage: pkg.homepage,
    license: pkg.license,
    categories: pkg.categories,
    tags: pkg.tags,
    grant: pkg.grant,
    contributes: pkg.contributes,
    main: EXTENSION.enterFileName,
  }

  await fs.promises.writeFile(path.join(getSourceDir(), EXTENSION.mainifestName), JSON.stringify(mainifest, null, 2), 'utf8')
}
