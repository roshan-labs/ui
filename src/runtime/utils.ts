import type { VNode } from 'vue'

type Slot = (...args: any[]) => VNode
export type SlotProp = string | Slot
export type Slots<T extends string> = Partial<Record<T, SlotProp>>

export type SetPrefixEvent<T> = {
  [K in keyof T as K extends string ? `on-${K}` : never]?: T[K]
}

export type Writable<T> = { -readonly [K in keyof T]: T[K] }

export const isUndefined = (value: unknown) => typeof value === 'undefined'
