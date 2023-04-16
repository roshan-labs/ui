import { fileURLToPath } from 'node:url'
import { exec } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { promisify } from 'node:util'
import { consola } from 'consola'

const execPromise = promisify(exec)

export const entry = fileURLToPath(new URL('../src/index.ts', import.meta.url))

/**
 * 运行命令
 *
 * @param script 命令字符串
 */
export const run = async (script: string) => {
  try {
    const { stdout, stderr } = await execPromise(script)

    consola.info(stdout)

    if (stderr) {
      consola.error(stderr)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

/** 打包前的工作 */
export const buildStart = () => {
  const distPath = fileURLToPath(new URL('../dist', import.meta.url))

  if (existsSync(distPath)) {
    rmSync(distPath, { recursive: true })
  }
}

/** 打包后的工作 */
export const buildEnd = () => {}
