export interface ModuleOptions {
  /** 是否开启 windicss */
  windicss: boolean
}

export type ResolveRuntime = (path: string) => string
