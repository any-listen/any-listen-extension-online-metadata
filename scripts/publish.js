import fs from 'node:fs'
import path from 'node:path'
import { buildPakageName } from './utils.js'
import pkg from '../package.json' with { type: 'json' }

export const run = async () => {
  const filePath = path.join(import.meta.dirname, '../publish/version.json')
  let versionInfo = await fs.promises
    .readFile(filePath)
    .then((d) => JSON.parse(d.toString()))
    .catch(() => ({}))
  if (versionInfo.version) {
    if (versionInfo.version === pkg.version) {
      console.warn(`Version (v${pkg.version}) already published`)
      process.exit(1)
    }
    versionInfo.history ||= []
    versionInfo.history.push({
      version: versionInfo.version,
      download_url: versionInfo.download_url,
      log: versionInfo.log,
      date: versionInfo.date,
    })
  }
  versionInfo.version = pkg.version
  versionInfo.download_url = `${pkg.download_url_template.replaceAll('{version}', pkg.version)}/${buildPakageName()}`
  versionInfo.log = await fs.promises
    .readFile(path.join(import.meta.dirname, '../publish/changeLog.md'), 'utf-8')
    .then((d) => d.toString().trim())
    .catch(() => '')
  versionInfo.date = new Date().toISOString()

  await fs.promises.rm(filePath, { recursive: true, force: true })
  await fs.promises.writeFile(filePath, JSON.stringify(versionInfo))
}

run()
