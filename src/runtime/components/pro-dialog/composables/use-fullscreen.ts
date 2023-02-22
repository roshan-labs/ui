import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export const useFullscreen = (fullscreen: Ref<boolean>) => {
  const fullscreenCollapse = ref(false)

  watch(
    fullscreen,
    (value) => {
      fullscreenCollapse.value = value
    },
    { immediate: true }
  )

  const changeFullscreen = () => {
    fullscreenCollapse.value = !fullscreenCollapse.value
  }

  return {
    fullscreenCollapse,
    changeFullscreen,
  }
}
