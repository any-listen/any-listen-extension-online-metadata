import fs from 'node:fs'
import path from 'node:path'
import { buildPackageName } from './utils.js'
import config from '../config.ts'

export const run = async () => {
  const filePath = path.join(import.meta.dirname, '../publish/version.json')
  let versionInfo = await fs.promises
    .readFile(filePath)
    .then((d) => JSON.parse(d.toString()))
    .catch(() => ({}))
  if (versionInfo.version) {
    if (versionInfo.version === config.version) {
      console.warn(`Version (v${config.version}) already published`)
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
  versionInfo.version = config.version
  versionInfo.download_url = `${config.download_url_template.replaceAll('{version}', config.version)}/${buildPackageName()}`
  versionInfo.log = await fs.promises
    .readFile(path.join(import.meta.dirname, '../publish/changeLog.md'), 'utf-8')
    .then((d) => d.toString().trim())
    .catch(() => '')
  versionInfo.date = new Date().toISOString()

  await fs.promises.rm(filePath, { recursive: true, force: true })
  await fs.promises.writeFile(filePath, JSON.stringify(versionInfo))
}

run()
