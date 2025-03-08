import fs from 'node:fs'
import path from 'node:path'
import pkg from '../package.json' with { type: 'json' }
import { c } from 'tar'
import { getOutDir, getSourceDir } from './utils.js'
import { EXTENSION } from './constants.js'
import crypto from 'crypto'

let privateKey = process.env.PRI_KEY?.trim()
let publicKey = process.env.PUB_KEY?.trim()
if (!privateKey || !publicKey) throw new Error('Missing private key or public key')
if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
  privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`
}
const buildPublicKey = () => {
  if (!publicKey.includes('-----BEGIN PUBLIC KEY-----')) {
    return `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`
  }
  return publicKey
}

const signData = (data, privateKey) => {
  const sign = crypto.createSign('SHA256')
  sign.update(data)
  sign.end()
  const signature = sign.sign(privateKey, 'hex')
  return signature
}
const verifySignature = (data, publicKey, signature) => {
  const verify = crypto.createVerify('SHA256')
  verify.update(data)
  verify.end()
  const isValid = verify.verify(publicKey, signature, 'hex')
  return isValid
}

const packFile = ({ gzip, cwd, files, dist }) =>
  new Promise((resolve, reject) => {
    c(
      {
        gzip,
        cwd,
      },
      files
    )
      .pipe(fs.createWriteStream(dist))
      .on('finish', resolve)
      .on('error', reject)
  })

export const pack = async () => {
  const sourceDir = getSourceDir()
  const outDir = getOutDir()
  const unpackedDir = path.join(outDir, 'unpacked')
  await fs.promises.rm(unpackedDir, { recursive: true }).catch(() => {})
  await fs.promises.mkdir(unpackedDir, { recursive: true }).catch(() => {})
  const extBundleFilePath = path.join(unpackedDir, EXTENSION.extBundleFileName)
  await packFile({
    gzip: true,
    cwd: sourceDir,
    files: [EXTENSION.enterFileName, EXTENSION.mainifestName, 'resources', 'i18n'],
    dist: extBundleFilePath,
  })
  const buf = await fs.promises.readFile(extBundleFilePath)
  const signature = signData(buf, privateKey)
  if (!verifySignature(buf, buildPublicKey(), signature)) {
    throw new Error('Signature is valid, please check your public key')
  }
  await fs.promises.writeFile(path.join(unpackedDir, EXTENSION.signFileName), `${signature}\n${publicKey}`)
  await packFile({
    gzip: true,
    cwd: unpackedDir,
    files: [EXTENSION.extBundleFileName, EXTENSION.signFileName],
    dist: path.join(getOutDir(), `${pkg.name}-v${pkg.version}.${EXTENSION.pkgExtName}`),
  })
}
