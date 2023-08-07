import type { Ref } from 'vue'
import type { FormInstance } from 'element-plus'

export const useExposeFormMethods = (formRef: Ref<FormInstance | null>) => {
  const validate: FormInstance['validate'] = (...args) => {
    return formRef.value!.validate(...args)
  }

  const validateField: FormInstance['validateField'] = (...args) => {
    return formRef.value!.validateField(...args)
  }

  const resetFields: FormInstance['resetFields'] = (...args) => {
    formRef.value?.resetFields(...args)
  }

  const scrollToField: FormInstance['scrollToField'] = (...args) => {
    formRef.value?.scrollToField(...args)
  }

  const clearValidate: FormInstance['clearValidate'] = (...args) => {
    formRef.value?.clearValidate(...args)
  }

  return {
    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate,
  }
}
