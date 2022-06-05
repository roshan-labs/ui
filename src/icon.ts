import type { Options } from 'unplugin-icons'
import { defu } from 'defu'

export function extendIconConfig(userConfig: Options = {}): Options {
  return defu<Options, Options>(userConfig, {
    autoInstall: true,
    iconCustomizer(_collection, _icon, props) {
      props.width = '1em'
      props.height = '1em'
    },
  })
}
