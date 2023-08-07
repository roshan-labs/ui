<template>
  <el-form ref="formRef" v-bind="$attrs" :model="fields">
    <!-- Layout -->
    <el-row v-if="isLayout">
      <el-col v-for="item in options" v-show="!item.hide" :key="item.prop" v-bind="item">
        <el-form-item v-bind="item">
          <component
            :is="getComponent(item.type)"
            v-bind="item.component"
            :model-value="fields[item.prop]"
            @update:model-value="updateFieldValue($event, item.prop)"
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
      <el-col v-if="action" v-bind="action">
        <el-form-item>
          <slot name="action" v-bind="actionProps">
            <el-button v-if="resetVisible" @click="reset">{{ resetText }}</el-button>
            <el-button v-if="submitVisible" type="primary" :loading="loading" @click="submit">
              {{ submitText }}
            </el-button>
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- Default -->
    <template v-else>
      <el-form-item v-for="item in options" v-show="!item.hide" :key="item.prop" v-bind="item">
        <component
          :is="getComponent(item.type)"
          v-bind="item.component"
          :model-value="fields[item.prop]"
          @update:model-value="updateFieldValue($event, item.prop)"
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
      <el-form-item v-if="action">
        <!-- @slot 自定义表单按钮内容插槽 -->
        <slot name="action" v-bind="actionProps">
          <el-button v-if="resetVisible" @click="reset">{{ resetText }}</el-button>
          <el-button v-if="submitVisible" type="primary" :loading="loading" @click="submit">
            {{ submitText }}
          </el-button>
        </slot>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { FormInstance, FormItemProp } from 'element-plus'
import { ref, computed, watchEffect, defineAsyncComponent } from 'vue'
import { ElForm, ElFormItem, ElButton, ElRow, ElCol } from 'element-plus'
import { useVModel } from '@vueuse/core'

import { isUndefined } from '../../utils'
import type { Slots } from '../../type-utils'
import type { ProFormOption, ProFormAction, ProFormBeforeSubmit, ProFormModelValue } from './types'

const props = defineProps({
  /** 表单绑定值 v-model */
  modelValue: { type: Object as PropType<ProFormModelValue>, default: () => ({}) },
  /** 表单项配置数组 */
  options: { type: Array as PropType<ProFormOption[]>, default: () => [] },
  /** 表单按钮配置 */
  action: { type: [Object, Boolean] as PropType<ProFormAction | false>, default: () => ({}) },
  /** 表单提交前的回调 */
  beforeSubmit: { type: Function as PropType<ProFormBeforeSubmit> },
})

const emit = defineEmits(['update:modelValue', 'reset', 'submit'])

const formRef = ref<FormInstance | null>(null)
const loading = ref(false)

const fields = useVModel(props, 'modelValue', emit, { passive: true })

const resetVisible = computed(() => (props.action ? props.action.reset ?? true : true))
const resetText = computed(() => (props.action ? props.action.resetText ?? '重置' : ''))
const submitVisible = computed(() => (props.action ? props.action.submit ?? true : true))
const submitText = computed(() => (props.action ? props.action.submitText ?? '提交' : ''))
const isLayout = computed(
  () =>
    props.options.some((option) => !isUndefined(option.span)) ||
    (props.action ? !isUndefined(props.action.span) : false)
)
const actionProps = computed(() => ({
  loading: loading.value,
  resetVisible: resetVisible.value,
  resetText: resetText.value,
  reset,
  submitVisible: submitVisible.value,
  submitText: submitText.value,
  submit,
}))

const Input = defineAsyncComponent(() => import('./components/input'))
const InputNumber = defineAsyncComponent(() => import('./components/input-number'))
const Radio = defineAsyncComponent(() => import('./components/radio'))
const Checkbox = defineAsyncComponent(() => import('./components/checkbox'))
const Rate = defineAsyncComponent(() => import('./components/rate'))
const Autocomplete = defineAsyncComponent(() => import('./components/autocomplete'))
const Cascader = defineAsyncComponent(() => import('./components/cascader'))
const CascaderPanel = defineAsyncComponent(() => import('./components/cascader-panel'))
const ColorPicker = defineAsyncComponent(() => import('./components/color-picker'))
const ProSelect = defineAsyncComponent(() => import('../pro-select/pro-select.vue'))
const SelectV2 = defineAsyncComponent(() => import('./components/select-v2'))
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
      return ProSelect
    case 'select-v2':
      return SelectV2
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
    let value: any = ''

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
      case 'select':
      case 'select-v2':
        value = item.component?.multiple ? [] : ''
        break
      default:
        value = ''
        break
    }

    if (isUndefined(fields.value[item.prop])) {
      fields.value[item.prop] = item.value ?? value
    }
  })
})

const updateFieldValue = (value: any, key: string) => {
  fields.value = {
    ...fields.value,
    [key]: value,
  }
}

const reset = () => {
  if (formRef.value) {
    formRef.value.resetFields()
    emit('reset')
  }
}

const submit = () => {
  if (formRef.value) {
    formRef.value.validate((isValid) => {
      const done = () => {
        emit('submit', fields.value, isValid)
      }

      if (props.beforeSubmit) {
        props.beforeSubmit(fields.value, isValid, done, loading)
      } else {
        done()
      }
    })
  }
}

defineExpose({
  // 原 ElForm 方法
  validate: () => {
    formRef.value?.validate()
  },
  validateField: () => {
    formRef.value?.validateField()
  },
  resetFields: () => {
    formRef.value?.resetFields()
  },
  scrollToField: (prop: FormItemProp) => {
    formRef.value?.scrollToField(prop)
  },
  clearValidate: () => {
    formRef.value?.clearValidate()
  },
  /** 表单提交 */
  submit,
})
</script>

<script lang="ts">
export default {
  name: 'ProForm',
}
</script>
