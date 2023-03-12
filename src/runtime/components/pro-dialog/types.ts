import type { Ref } from 'vue'

/** 提交前回调方法 */
export type ProDialogBeforeConfirm = (
  loading: Ref<boolean>,
  done: () => void
) => Promise<void> | void
