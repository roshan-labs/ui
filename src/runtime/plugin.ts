import { ElInfiniteScroll, ElLoading, ID_INJECTION_KEY } from 'element-plus'

import { defineNuxtPlugin } from '#imports'

const plugins = [ElInfiniteScroll, ElLoading]

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  plugins.forEach((plugin) => {
    vueApp.use(plugin)
  })

  // 解决部分组件 SSR 报错
  vueApp.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 1000),
    current: 0,
  })
})
