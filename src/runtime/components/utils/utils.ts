import { VNode, Comment, Fragment, Text, Component } from 'vue'

/**
 * 判断 vnode.type 是否为组件
 * @param node vnode.type
 */
export function isComponent(type: VNode['type']): type is Component {
  return typeof type === 'object' && Object.hasOwn(type, 'render')
}

/**
 * 是否为空节点
 * @param node vue node
 */
function isEmptyNode(node: VNode) {
  return (
    node &&
    (node.type === Comment ||
      (node.type === Fragment && node.children?.length === 0) ||
      (node.type === Text && (node.children as string).trim() === ''))
  )
}

/**
 * 筛选出有内容节点
 * @param children vue node 集合
 */
export function filterChildren(children: VNode[] = []) {
  return children.filter((child) => !isEmptyNode(child))
}

/**
 * 为传入的值添加单位
 * @param value 需要加单位的值
 * @param unit 单位符号：默认 px
 */
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
