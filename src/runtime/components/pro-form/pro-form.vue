<template>
  <el-form ref="formRef" v-bind="$attrs" :model="model">
    <el-form-item v-for="item in options" :key="item.prop" :prop="item.prop" :label="item.label">
      <component :is="getComponent(item.type)" v-bind="item.component" v-model="model[item.prop]">
        <template v-for="(slot, name) in item.slots" :key="name" #[name]="slotProps">
          <slot v-if="typeof slot === 'string'" :name="slot" v-bind="slotProps" />
          <component :is="slot(slotProps)" v-else-if="typeof slot === 'function'" />
        </template>
      </component>
    </el-form-item>
    <el-form-item>
      <el-button v-if="resetVisible" @click="reset">{{ resetText }}</el-button>
      <el-button v-if="submitVisible" type="primary">{{ submitText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { FormInstance } from 'element-plus'
import { ref, computed, watchEffect, defineAsyncComponent } from 'vue'
import { ElForm, ElFormItem, ElButton } from 'element-plus'

import type { FormOption, FormAction } from './types'

const props = defineProps({
  /** 表单项配置 */
  options: { type: Array as PropType<FormOption[]>, default: () => [] },
  /** 表单按钮配置 */
  action: { type: Object as PropType<FormAction> },
})

const emit = defineEmits(['reset'])

const model = ref<Record<string, unknown>>({})
const formRef = ref<FormInstance | null>(null)

const resetVisible = computed(() =>
  typeof props.action?.reset === 'boolean' ? props.action?.reset : true
)
const resetText = computed(() => props.action?.resetText ?? '重置')
const submitVisible = computed(() =>
  typeof props.action?.submit === 'boolean' ? props.action.submit : true
)
const submitText = computed(() => props.action?.submitText ?? '提交')

const Input = defineAsyncComponent(() => import('./components/input'))
const InputNumber = defineAsyncComponent(() => import('./components/input-number'))
const Radio = defineAsyncComponent(() => import('./components/radio'))
const Checkbox = defineAsyncComponent(() => import('./components/checkbox'))
const Rate = defineAsyncComponent(() => import('./components/rate'))
const Autocomplete = defineAsyncComponent(() => import('./components/autocomplete'))
const Cascader = defineAsyncComponent(() => import('./components/cascader'))
const ColorPicker = defineAsyncComponent(() => import('./components/color-picker'))
const Select = defineAsyncComponent(() => import('./components/select'))
const DatePicker = defineAsyncComponent(() => import('./components/date-picker'))
const Slider = defineAsyncComponent(() => import('./components/slider'))
const Switch = defineAsyncComponent(() => import('./components/switch'))
const TimePicker = defineAsyncComponent(() => import('./components/time-picker'))
const TimeSelect = defineAsyncComponent(() => import('./components/time-select'))
const Transfer = defineAsyncComponent(() => import('./components/transfer'))
const Upload = defineAsyncComponent(() => import('./components/form-upload.vue'))

const getComponent = (type: FormOption['type']) => {
  switch (type) {
    case 'input':
      return Input
    case 'number':
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
    case 'color':
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

const reset = () => {
  formRef.value?.resetFields()
  emit('reset')
}

// 给表单项赋予初始值
watchEffect(() => {
  props.options.forEach((item) => {
    let value: unknown = ''

    switch (item.type) {
      case 'number':
      case 'rate':
      case 'slider':
        value = 0
        break
      case 'checkbox':
      case 'cascader':
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
</script>
