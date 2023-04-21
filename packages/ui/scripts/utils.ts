import { fileURLToPath } from 'node:url'
import { existsSync, rmSync } from 'node:fs'
import { moveSync } from 'fs-extra'

const getPath = (filePath: string) => fileURLToPath(new URL(filePath, import.meta.url))

const removeFile = (filePath: string) => existsSync(filePath) && rmSync(filePath)

export const entry = fileURLToPath(new URL('../src/index.ts', import.meta.url))

/** 打包前的工作 */
export const buildStart = () => {
  const distPath = fileURLToPath(new URL('../dist', import.meta.url))

  if (existsSync(distPath)) {
    rmSync(distPath, { recursive: true })
  }
}

/** 打包后的工作 */
export const buildEnd = () => {
  // 删除多余的 style.css 文件
  removeFile(getPath('../dist/cjs/style.css'))
  removeFile(getPath('../dist/iife/style.css'))

  // 移动 es 包中 style.css 到 styles/index.css
  const stylePath = getPath('../dist/es/style.css')

  existsSync(stylePath) &&
    moveSync(getPath('../dist/es/style.css'), getPath('../dist/styles/index.css'))
}
