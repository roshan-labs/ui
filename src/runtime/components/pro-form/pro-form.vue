<template>
  <el-form ref="formRef" v-bind="$attrs" :model="model">
    <!-- Layout -->
    <el-row v-if="isLayout">
      <el-col v-for="item in options" :key="item.prop" v-bind="item">
        <el-form-item v-bind="item">
          <component
            :is="getComponent(item.type)"
            v-bind="item.component"
            v-model="model[item.prop]"
          >
            <template
              v-for="(slot, name) in (item.component?.slots as Slots<string>)"
              :key="name"
              #[name]="slotProps"
            >
              <slot v-if="typeof slot === 'string'" :name="slot" v-bind="slotProps" />
              <component :is="slot(slotProps)" v-if="typeof slot === 'function'" />
            </template>
          </component>
        </el-form-item>
      </el-col>
      <el-col v-bind="action">
        <el-form-item>
          <el-button v-if="resetVisible" @click="reset">{{ resetText }}</el-button>
          <el-button v-if="submitVisible" type="primary" :loading="loading" @click="submit">{{
            submitText
          }}</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- Default -->
    <template v-else>
      <el-form-item v-for="item in options" :key="item.prop" v-bind="item">
        <component :is="getComponent(item.type)" v-bind="item.component" v-model="model[item.prop]">
          <template
            v-for="(slot, name) in (item.component?.slots as Slots<string>)"
            :key="name"
            #[name]="slotProps"
          >
            <slot v-if="typeof slot === 'string'" :name="slot" v-bind="slotProps" />
            <component :is="slot(slotProps)" v-if="typeof slot === 'function'" />
          </template>
        </component>
      </el-form-item>
      <el-form-item>
        <el-button v-if="resetVisible" @click="reset">{{ resetText }}</el-button>
        <el-button v-if="submitVisible" type="primary" :loading="loading" @click="submit">{{
          submitText
        }}</el-button>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { FormInstance } from 'element-plus'
import { ref, computed, watchEffect, defineAsyncComponent } from 'vue'
import { ElForm, ElFormItem, ElButton, ElRow, ElCol } from 'element-plus'

import type { Slots } from '../../utils'
import type { ProFormOption, ProFormAction } from './types'
import { isUndefined } from './utils'

const props = defineProps({
  /** 表单项配置数组 */
  options: { type: Array as PropType<ProFormOption[]>, default: () => [] },
  /** 表单按钮配置 */
  action: { type: Object as PropType<ProFormAction>, default: () => ({}) },
})

const emit = defineEmits(['reset', 'submit'])

const model = ref<Record<string, any>>({})
const formRef = ref<FormInstance | null>(null)
const loading = ref(false)

const resetVisible = computed(() =>
  typeof props.action?.reset === 'boolean' ? props.action?.reset : true
)
const resetText = computed(() => props.action?.resetText ?? '重置')
const submitVisible = computed(() =>
  typeof props.action?.submit === 'boolean' ? props.action.submit : true
)
const submitText = computed(() => props.action?.submitText ?? '提交')
const isLayout = computed(
  () =>
    props.options.some((option) => !isUndefined(option.span)) || !isUndefined(props.action?.span)
)

const Input = defineAsyncComponent(() => import('./components/input'))
const InputNumber = defineAsyncComponent(() => import('./components/input-number'))
const Radio = defineAsyncComponent(() => import('./components/radio'))
const Checkbox = defineAsyncComponent(() => import('./components/checkbox'))
const Rate = defineAsyncComponent(() => import('./components/rate'))
const Autocomplete = defineAsyncComponent(() => import('./components/autocomplete'))
const Cascader = defineAsyncComponent(() => import('./components/cascader'))
const CascaderPanel = defineAsyncComponent(() => import('./components/cascader-panel'))
const ColorPicker = defineAsyncComponent(() => import('./components/color-picker'))
const Select = defineAsyncComponent(() => import('./components/select'))
const DatePicker = defineAsyncComponent(() => import('./components/date-picker'))
const Slider = defineAsyncComponent(() => import('./components/slider'))
const Switch = defineAsyncComponent(() => import('./components/switch'))
const TimePicker = defineAsyncComponent(() => import('./components/time-picker'))
const TimeSelect = defineAsyncComponent(() => import('./components/time-select'))
const Transfer = defineAsyncComponent(() => import('./components/transfer'))
const Upload = defineAsyncComponent(() => import('./components/form-upload.vue'))

const getComponent = (type: ProFormOption['type']) => {
  switch (type) {
    case 'input':
      return Input
    case 'input-number':
      return InputNumber
    case 'radio':
      return Radio
    case 'checkbox':
      return Checkbox
    case 'rate':
      return Rate
    case 'autocomplete':
      return Autocomplete
    case 'cascader':
      return Cascader
    case 'cascader-panel':
      return CascaderPanel
    case 'color-picker':
      return ColorPicker
    case 'select':
      return Select
    case 'date-picker':
      return DatePicker
    case 'slider':
      return Slider
    case 'switch':
      return Switch
    case 'time-picker':
      return TimePicker
    case 'time-select':
      return TimeSelect
    case 'transfer':
      return Transfer
    case 'upload':
      return Upload
    default:
      return Input
  }
}

// 给表单项赋予初始值
watchEffect(() => {
  props.options.forEach((item) => {
    let value: unknown = ''

    switch (item.type) {
      case 'input-number':
      case 'rate':
      case 'slider':
        value = 0
        break
      case 'checkbox':
      case 'cascader':
      case 'cascader-panel':
      case 'transfer':
      case 'upload':
        value = []
        break
      case 'switch':
        value = false
        break
      default:
        value = ''
        break
    }

    model.value[item.prop] = item.value ?? value
  })
})

const reset = () => {
  if (formRef.value) {
    formRef.value.resetFields()
    emit('reset')
  }
}

const done = () => {
  loading.value = false
}

const submit = () => {
  if (formRef.value) {
    loading.value = true

    formRef.value.validate((isValid) => {
      emit('submit', done, isValid, model.value)
    })
  }
}

defineExpose({
  validate: ((...args) => formRef.value!.validate(...args)) as FormInstance['validate'],
  validateField: ((...args) =>
    formRef.value!.validateField(...args)) as FormInstance['validateField'],
  resetFields: ((...args) => formRef.value!.resetFields(...args)) as FormInstance['resetFields'],
  scrollToField: ((...args) =>
    formRef.value!.scrollToField(...args)) as FormInstance['scrollToField'],
  clearValidate: ((...args) =>
    formRef.value!.clearValidate(...args)) as FormInstance['clearValidate'],
})
</script>
