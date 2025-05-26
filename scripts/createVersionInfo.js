import fs from 'node:fs'
import path from 'node:path'
import { buildPakageName, getOutDir } from './utils.js'
import pkg from '../package.json' with { type: 'json' }
import { EXTENSION } from './constants.js'

export const createVersionInfo = async () => {
  const outPath = path.join(getOutDir(), EXTENSION.versionInfoName)
  await fs.promises.rm(outPath, { recursive: true, force: true })
  await fs.promises.writeFile(
    outPath,
    JSON.stringify({
      version: pkg.version,
      download_url: `${pkg.download_url_template.replaceAll('{version}', pkg.version)}/${buildPakageName()}`,
    })
  )
}
