import 'element-plus/dist/index.css'
// import '../src/runtime/assets/style.css'
import 'virtual:windi.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
