import './env.dev.js'
import appConfig from './vite.config.js'
import { build } from './utils.js'
import { createMainifest } from './mainifest.js'
import { cpResources } from './cpResources.js'

const run = async () => {
  Promise.all([build(appConfig, () => {}), cpResources(), createMainifest()])
}

run()
