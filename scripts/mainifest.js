import fs from 'node:fs'
import path from 'node:path'
import config from '../config.ts'
import { getSourceDir } from './utils.js'
import { EXTENSION } from './constants.js'

export const createMainifest = async () => {
  const mainifest = {
    id: config.id,
    name: config.name,
    description: '{description}',
    icon: config.icon,
    version: config.version,
    target_engine: config.target_engine,
    author: config.author,
    homepage: config.homepage,
    license: config.license,
    categories: config.categories,
    tags: config.tags,
    grant: config.grant,
    contributes: config.contributes,
    main: EXTENSION.entryFileName,
  }

  await fs.promises.writeFile(path.join(getSourceDir(), EXTENSION.mainifestName), JSON.stringify(mainifest, null, 2), 'utf8')
}
