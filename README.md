# @roshan-labs/ui

[![npm](https://img.shields.io/npm/v/@roshan-labs/ui?color=%2342b883)](https://www.npmjs.com/package/@roshan-labs/ui)
[![CD](https://github.com/roshan-labs/ui/actions/workflows/cd.yml/badge.svg)](https://github.com/roshan-labs/ui/actions/workflows/cd.yml)

在 `element-plus` 之上扩展的高级组件库

## 安装

```bash
pnpm add @roshan-labs/ui
```

## 使用

```typescript
export default defineNuxtConfig({
  modules: ['@roshan-labs/ui'],
  ui: {
    // 选项
  },
})
```

## 选项

### `windicss`

- type: `boolean`
- default: `false`

是否开启 [windicss](https://windicss.org/) 模式

## License

MIT
