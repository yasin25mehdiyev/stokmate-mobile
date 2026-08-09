import { existsSync, copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rootDir = resolve(import.meta.dirname, '..')
const envPath = resolve(rootDir, '.env')
const examplePath = resolve(rootDir, '.env.example')

if (!existsSync(envPath) && existsSync(examplePath)) {
  copyFileSync(examplePath, envPath)
  console.log('.env bulunamadı, .env.example üzerinden oluşturuldu.')
}
