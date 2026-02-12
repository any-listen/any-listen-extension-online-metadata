import path from 'node:path'
import { build as viteBuild, mergeConfig } from 'vite'
import config from '../config.ts'
import { EXTENSION } from './constants.js'

export const getSourceDir = () => {
  return path.join(import.meta.dirname, '../dist')
}
export const getOutDir = () => {
  return path.join(import.meta.dirname, '../build')
}
export const buildPackageName = () => {
  return `${config.id}_v${config.version}.${EXTENSION.pkgExtName}`
}

/**
 * build code
 * @param {import('vite').UserConfig} config vite config
 * @param {() => void} onUpdated new build event
 * @returns {Promise<{ status: boolean, reload: () => void }>} is success
 */
export const build = async (config, onUpdated) => {
  if (process.env.NODE_ENV === 'production') {
    if (config.build) config.build.watch = null
    return viteBuild({ ...config, configFile: false })
      .then(() => {
        // output
        // console.log(output)
        return { status: true, reload: () => {} }
      })
      .catch((error) => {
        console.log(error)
        return { status: false, reload: () => {} }
      })
  }

  return buildDev(config, onUpdated)
}

/**
 * build code in dev
 * @param {import('vite').UserConfig} config vite config
 * @param {() => void} onUpdated new build event
 * @returns {Promise<{ status: boolean, reload: () => void }>} is success
 */
const buildDev = async (config, onUpdated) => {
  return new Promise((resolve) => {
    let firstBundle = true
    let isError = false
    config = mergeConfig(config, {
      plugins: [
        {
          name: 'vite:file-watcher',
          buildEnd(err) {
            // console.log('buildEnd', err !== undefined, err)
            isError = err !== undefined
          },
          closeBundle() {
            // console.log('closeBundle')
            if (firstBundle) {
              firstBundle = false
              resolve({ status: !isError, reload: () => {} })
            } else {
              if (isError) return
              onUpdated()
            }
          },
        },
      ],
    })

    viteBuild({ ...config, configFile: false })
  })
}

/**
 * build code in dev
 * @param {import('vite').UserConfig} config vite config
 * @param {() => void} onUpdated new build event
 * @returns {Promise<boolean>} is success
 */
export const buildSuatus = async (config, onUpdated) => {
  return build(config, onUpdated).then(({ status }) => status)
}
