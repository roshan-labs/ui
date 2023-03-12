import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export const useFullscreen = (
  fullscreen: Ref<boolean>,
  emit: (event: 'update:fullscreen', ...args: any[]) => void
) => {
  const _fullscreen = ref(false)

  watch(
    fullscreen,
    (value) => {
      _fullscreen.value = value
    },
    { immediate: true }
  )

  const changeFullscreen = () => {
    _fullscreen.value = !_fullscreen.value
    emit('update:fullscreen', _fullscreen.value)
  }

  return {
    _fullscreen,
    changeFullscreen,
  }
}
