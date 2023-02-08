import type { Meta, Story } from '@storybook/vue3'
import { h } from 'vue'
import { ElButton } from 'element-plus'

import type { ProFormOption, ProFormAction, ProFormSubmit } from './types'
import { ProForm } from './'

export default {
  title: '高级组件/表单 ProForm',
  component: ProForm,
  argTypes: {
    onReset: { action: 'reset' },
    onSubmit: { action: 'submit' },
  },
} as Meta

let timeout: number
const data = [
  { value: 'vue', link: 'https://github.com/vuejs/vue' },
  { value: 'element', link: 'https://github.com/ElemeFE/element' },
  { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
  { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
  { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
  { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
  { value: 'babel', link: 'https://github.com/babel/babel' },
]

const querySearch = (search: string, cb: (args: any[]) => void) => {
  const result = search
    ? data.filter((item) => item.value.toLowerCase().indexOf(search.toLowerCase()) === 0)
    : data

  clearTimeout(timeout)
  timeout = window.setTimeout(() => {
    cb(result)
  }, 3000 * Math.random())
}

interface TransferOption {
  key: number
  label: string
}

const generateTransferData = () => {
  const data: TransferOption[] = []

  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
    })
  }

  return data
}

const Template: Story = (args) => ({
  components: { ProForm },
  setup: () => {
    const onSubmit: ProFormSubmit = (done) => {
      setTimeout(done, 1000)
    }

    return {
      args,
      onSubmit,
    }
  },
  template: `
    <pro-form @submit="onSubmit" v-bind="args">
      <template #upload-tip>
        <div class="el-upload__tip">文件上传提示</div>
      </template>
    </pro-form>
  `,
})

const width = 'w-[220px]'
const cascader = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'consistency',
        label: 'Consistency',
      },
      {
        value: 'feedback',
        label: 'Feedback',
      },
    ],
  },
  {
    value: 'navigation',
    label: 'Navigation',
    children: [
      {
        value: 'side nav',
        label: 'Side Navigation',
      },
      {
        value: 'top nav',
        label: 'Top Navigation',
      },
    ],
  },
]

export const Default = Template.bind({})
Default.args = {
  options: [
    { prop: 'username', label: '用户名', type: 'input', component: { class: width } },
    {
      prop: 'password',
      label: '密码',
      type: 'input',
      component: { class: width, type: 'password' },
    },
  ] as ProFormOption[],
  labelWidth: 60,
}
Default.storyName = '默认'

export const Autocomplete = Template.bind({})
Autocomplete.args = {
  options: [
    {
      prop: 'autocomplete',
      label: '自动补全',
      type: 'autocomplete',
      component: { class: width, fetchSuggestions: querySearch, clearable: true },
    },
  ] as ProFormOption[],
  labelWidth: 90,
}
Autocomplete.storyName = '自动补全'

export const Cascader = Template.bind({})
Cascader.args = {
  options: [
    {
      prop: 'cascader',
      label: '级联选择',
      type: 'cascader',
      component: {
        class: width,
        options: cascader,
      },
    },
  ] as ProFormOption[],
  labelWidth: 90,
}
Cascader.storyName = '级联选择器'

export const CascaderPanel = Template.bind({})
CascaderPanel.args = {
  options: [
    {
      type: 'cascader-panel',
      prop: 'cascader-panel',
      label: '级联面板',
      component: { options: cascader },
    },
  ] as ProFormOption[],
  labelWidth: 90,
}
CascaderPanel.storyName = '级联面板'

export const Checkbox = Template.bind({})
Checkbox.args = {
  options: [
    {
      prop: 'checkbox',
      label: '多选',
      type: 'checkbox',
      component: {
        options: [
          { value: '1', label: '选项1' },
          { value: '2', label: '选项2' },
          { value: '3', label: '选项3' },
        ],
      },
    },
  ] as ProFormOption[],
  labelWidth: 90,
}
Checkbox.storyName = '多选框'

export const ColorPicker = Template.bind({})
ColorPicker.args = {
  options: [{ prop: 'color-picker', label: '取色器', type: 'color-picker' }] as ProFormOption[],
  labelWidth: 90,
}
ColorPicker.storyName = '取色器'

export const DatePicker = Template.bind({})
DatePicker.args = {
  options: [
    { prop: 'date-picker', label: '日期选择器', type: 'date-picker', component: { class: width } },
  ] as ProFormOption[],
  labelWidth: 90,
}
DatePicker.storyName = '日期选择器'

export const DateTimePicker = Template.bind({})
DateTimePicker.args = {
  options: [
    {
      type: 'date-picker',
      prop: 'date-time-picker',
      label: '日期时间选择器',
      component: { class: width, type: 'datetime' },
    },
  ] as ProFormOption[],
  labelWidth: 110,
}
DateTimePicker.storyName = '日期时间选择器'

export const Input = Template.bind({})
Input.args = {
  options: [
    {
      type: 'input',
      prop: 'input',
      label: '文本输入',
      component: { class: width, placeholder: '请输入' },
    },
  ] as ProFormOption[],
  labelWidth: 90,
}
Input.storyName = '文本输入'

export const InputNumber = Template.bind({})
InputNumber.args = {
  options: [
    { type: 'input-number', prop: 'input-number', label: '数字输入', component: { class: width } },
  ] as ProFormOption[],
  labelWidth: 90,
}
InputNumber.storyName = '数字输入'

export const Radio = Template.bind({})
Radio.args = {
  options: [
    {
      type: 'radio',
      prop: 'radio',
      label: '单选',
      component: {
        options: [
          { value: '1', label: '选项1' },
          { value: '2', label: '选项2' },
        ],
      },
    },
  ] as ProFormOption[],
  labelWidth: 60,
}
Radio.storyName = '单选'

export const Rate = Template.bind({})
Rate.args = {
  options: [{ prop: 'rate', label: '评分', type: 'rate' }] as ProFormOption[],
  labelWidth: 60,
}
Rate.storyName = '评分'

export const Select = Template.bind({})
Select.args = {
  options: [
    {
      type: 'select',
      prop: 'select',
      label: '选择器',
      component: {
        class: width,
        options: [
          { value: '1', label: '选项1' },
          { value: '2', label: '选项2' },
          { value: '3', label: '选项3' },
        ],
      },
    },
  ] as ProFormOption[],
  labelWidth: 60,
}
Select.storyName = '选择器'

export const Slider = Template.bind({})
Slider.args = {
  options: [
    { prop: 'slider', label: '滑块', type: 'slider', component: { class: width } },
  ] as ProFormOption[],
  labelWidth: 60,
}
Slider.storyName = '滑块'

export const Switch = Template.bind({})
Switch.args = {
  options: [{ prop: 'switch', label: '开关', type: 'switch' }] as ProFormOption[],
  labelWidth: 60,
}
Switch.storyName = '开关'

export const TimePicker = Template.bind({})
TimePicker.args = {
  options: [
    {
      type: 'time-picker',
      prop: 'time-picker',
      label: '时间选择器',
      component: { class: width },
    },
  ] as ProFormOption[],
  labelWidth: 90,
}
TimePicker.storyName = '时间选择器'

export const TimeSelect = Template.bind({})
TimeSelect.args = {
  options: [
    {
      type: 'time-select',
      prop: 'time-select',
      label: '时间选择',
      component: { class: width },
    },
  ] as ProFormOption[],
  labelWidth: 90,
}
TimeSelect.storyName = '时间选择'

export const Transfer = Template.bind({})
Transfer.args = {
  options: [
    {
      type: 'transfer',
      prop: 'time-select',
      label: '穿梭框',
      component: { data: generateTransferData() },
    },
  ] as ProFormOption[],
  labelWidth: 90,
}
Transfer.storyName = '穿梭框'

export const Upload = Template.bind({})
Upload.args = {
  options: [
    {
      type: 'upload',
      prop: 'upload',
      label: '文件上传',
      component: {
        slots: {
          default: () => h(ElButton, { type: 'primary' }, () => '上传'),
          tip: 'upload-tip',
        },
      },
    },
  ] as ProFormOption[],
  labelWidth: 90,
}
Upload.storyName = '上传'

export const CustomAction = Template.bind({})
CustomAction.args = {
  ...Default.args,
  action: {
    resetText: '重置表单',
    submitText: '确认',
  } as ProFormAction,
}
CustomAction.storyName = '自定义按钮'

export const Inline = Template.bind({})
Inline.args = {
  ...Default.args,
  inline: true,
}
Inline.storyName = '行内表单'

export const Validate = Template.bind({})
Validate.args = {
  options: [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      rules: { required: true, message: '不能为空' },
      component: { class: width },
    },
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      rules: { required: true, message: '不能为空' },
      component: { class: width },
    },
  ] as ProFormOption[],
  labelWidth: 80,
}
Validate.storyName = '验证表单'

export const Layout = Template.bind({})
Layout.args = {
  options: [
    { type: 'input', prop: 'input1', label: '文本', span: 24 },
    { type: 'input', prop: 'input2', label: '文本', span: 12 },
    { type: 'input', prop: 'input3', label: '文本', span: 12 },
    { type: 'input', prop: 'input4', label: '文本', span: 6 },
    { type: 'input', prop: 'input5', label: '文本', span: 6 },
    { type: 'input', prop: 'input6', label: '文本', span: 6 },
    { type: 'input', prop: 'input7', label: '文本', span: 6 },
  ] as ProFormOption[],
  action: {
    span: 24,
  } as ProFormAction,
  labelWidth: 60,
}
Layout.storyName = '布局表单'
