import type { VNode } from 'vue'

type Slot = (...args: any[]) => VNode
type SlotProp = string | Slot
export type Slots<T extends string> = Partial<Record<T, SlotProp>>

export type SetPrefixEvent<T> = {
  [K in keyof T as K extends string ? `on-${K}` : never]?: T[K]
}
