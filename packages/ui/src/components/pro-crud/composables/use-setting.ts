import { ref } from 'vue'

/** 列配置 */
export const useSetting = () => {
  /** 列配置对话框是否显示 */
  const settingVisible = ref(false)

  return {
    settingVisible,
  }
}
