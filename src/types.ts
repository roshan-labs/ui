export interface ModuleOptions {
  /** 是否开启 windicss */
  windicss: boolean
  /** element-plus 命名空间 */
  namespace: string
}

export type ResolveRuntime = (path: string) => string

export type PresetImport = string | [name: string, as?: string, from?: string]
