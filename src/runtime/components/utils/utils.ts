import { VNode, Comment, Fragment, Text, Component } from 'vue'

export function isComponent(type: VNode['type']): type is Component {
  return typeof type === 'object' && Object.hasOwn(type, 'render')
}

function isEmptyNode(node: VNode) {
  return (
    node &&
    (node.type === Comment ||
      (node.type === Fragment && node.children?.length === 0) ||
      (node.type === Text && (node.children as string).trim() === ''))
  )
}

export function filterChildren(children: VNode[] = []) {
  return children
    .filter((child) => !isEmptyNode(child))
    .map((child) => (child.type === Fragment ? child.children : child))
    .flat()
}

export function addUnit(value: string | number, unit: string = 'px') {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number') return `${value}${unit}`
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isPlainObject(value: unknown): value is { [key: string]: unknown } {
  return Object.prototype.toString.call(value) === '[object Object]'
}
