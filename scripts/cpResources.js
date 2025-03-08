import fs from 'node:fs'
import path from 'node:path'
import { getSourceDir } from './utils.js'

export const cpResources = async () => {
  const sourcePath = path.join(import.meta.dirname, '../resources')
  const targetPath = path.join(getSourceDir(), 'resources')
  const sourceI18nPath = path.join(import.meta.dirname, '../i18n')
  const targetI18nPath = path.join(getSourceDir(), 'i18n')

  await Promise.all([
    fs.promises.cp(sourcePath, targetPath, { recursive: true }),
    fs.promises.cp(sourceI18nPath, targetI18nPath, { recursive: true }),
  ])
}
