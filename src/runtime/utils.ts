import type { VNode } from 'vue'

type Slot = (...args: any[]) => VNode
export type SlotProp = string | Slot
export type Slots<T extends string> = Partial<Record<T, SlotProp>>

export type SetPrefixEvent<T> = {
  [K in keyof T as K extends string ? `on-${K}` : never]?: T[K]
}

export type Writable<T> = { -readonly [K in keyof T]: T[K] }

export const isUndefined = (value: any): value is undefined => typeof value === 'undefined'

export const isBoolean = (value: any): value is boolean => typeof value === 'boolean'

export const isObject = (value: any): value is object =>
  Object.prototype.toString.call(value) === '[object Object]'

export const isString = <T>(value: T): value is string => typeof value === 'string'
