export type Size = 'small' | 'default' | 'large'

export type EmitFn<T extends string> = (event: T, ...args: unknown[]) => void
