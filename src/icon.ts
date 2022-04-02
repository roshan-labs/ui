import type { Options } from 'unplugin-icons'
import { defu } from 'defu'

export function extendIconConfig(userConfig: Options = {}): Options {
  return defu<Options, Options>(userConfig, {
    autoInstall: true,
    iconCustomizer(_collection, _icon, props) {
      // 所有图标与同标签内文本字号相同
      props.width = '1em'
      props.height = '1em'
    },
  })
}
