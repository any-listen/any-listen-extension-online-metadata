import './env.prod.js'
import appConfig from './vite.config.js'
import { build } from './utils.js'
import { createMainifest } from './mainifest.js'
import { pack } from './pack.js'
import { cpResources } from './cpResources.js'

const run = async () => {
  await build(appConfig, () => {})
  await Promise.all([cpResources(), createMainifest()])
  await pack()
}

run()
