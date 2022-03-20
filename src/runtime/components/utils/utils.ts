import { VNode, Comment, Fragment, Text } from 'vue'

/**
 * 是否为空节点
 * @param node vue node
 */
function isEmpty(node: VNode) {
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
  return children.filter((child) => !isEmpty(child))
}
