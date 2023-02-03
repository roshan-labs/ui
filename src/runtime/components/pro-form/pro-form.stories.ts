import type { Meta, Story } from '@storybook/vue3'
import { h } from 'vue'
import { ElButton } from 'element-plus'

import type { FormOption, FormAction } from './types'
import { ProForm } from './'

export default {
  title: '高级组件/ProForm',
  component: ProForm,
  argTypes: {
    onReset: { action: 'reset' },
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
  setup: () => ({ args }),
  template: `
    <pro-form v-bind="args">
      <template #upload-tip>
        <div class="el-upload__tip">Upload file to oss</div>
      </template>
    </pro-form>
  `,
})

export const Default = Template.bind({})
Default.args = {
  options: [
    { prop: 'input', label: 'Input', type: 'input', component: { class: 'w-[220px]' } },
    // {
    //   prop: 'age',
    //   label: 'Age',
    //   type: 'number',
    //   props: { class: 'w-[220px]', controlsPosition: 'right' },
    // },
    // {
    //   prop: 'search',
    //   label: 'Autocomplete',
    //   type: 'autocomplete',
    //   props: { class: 'w-[220px]', fetchSuggestions: querySearch, clearable: true },
    // },
    // {
    //   prop: 'select',
    //   label: 'Select',
    //   type: 'select',
    //   props: {
    //     class: 'w-[220px]',
    //     options: [
    //       { value: 'Online', label: 'Online' },
    //       { value: 'Promotion', label: 'Promotion' },
    //       { value: 'Offline', label: 'Offline' },
    //     ],
    //   },
    // },
    // {
    //   prop: 'resources',
    //   label: 'Resources',
    //   type: 'radio',
    //   props: {
    //     options: [
    //       { value: 'sponsor', label: 'Sponsor' },
    //       { value: 'venue', label: 'Venue' },
    //     ],
    //   },
    // },
    // {
    //   prop: 'checkbox',
    //   label: 'Checkbox',
    //   type: 'checkbox',
    //   props: {
    //     options: [
    //       { value: 'Online', label: 'Online' },
    //       { value: 'Promotion', label: 'Promotion' },
    //       { value: 'Offline', label: 'Offline' },
    //     ],
    //   },
    // },
    // { prop: 'rate', label: 'Rate', type: 'rate' },
    // { prop: 'color', label: 'Color', type: 'color' },
    // {
    //   prop: 'cascader',
    //   label: 'Cascader',
    //   type: 'cascader',
    //   props: {
    //     class: 'w-[220px]',
    //     options: [
    //       {
    //         value: 'guide',
    //         label: 'Guide',
    //         children: [
    //           {
    //             value: 'consistency',
    //             label: 'Consistency',
    //           },
    //           {
    //             value: 'feedback',
    //             label: 'Feedback',
    //           },
    //         ],
    //       },
    //       {
    //         value: 'navigation',
    //         label: 'Navigation',
    //         children: [
    //           {
    //             value: 'side nav',
    //             label: 'Side Navigation',
    //           },
    //           {
    //             value: 'top nav',
    //             label: 'Top Navigation',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
    // { prop: 'date', label: 'Date', type: 'date', props: { class: 'w-[220px]' } },
    // {
    //   prop: 'datetime',
    //   label: 'Date Time',
    //   type: 'date',
    //   props: { type: 'datetime', class: 'w-[220px]' },
    // },
    // {
    //   prop: 'time-picker',
    //   label: 'Time Picker',
    //   type: 'time-picker',
    //   props: { class: 'w-[220px]' },
    // },
    // {
    //   prop: 'time-select',
    //   label: 'Time Select',
    //   type: 'time-select',
    //   props: { class: 'w-[220px]' },
    // },
    // {
    //   prop: 'transfer',
    //   label: 'Transfer',
    //   type: 'transfer',
    //   props: { data: generateTransferData() },
    // },
    // { prop: 'switch', label: 'Switch', type: 'switch' },
    // { prop: 'slider', label: 'Slider', type: 'slider' },
    // {
    //   prop: 'upload',
    //   label: 'Upload',
    //   type: 'upload',
    //   component: {
    //     slots: {
    //       default: () => h(ElButton, { type: 'primary' }, () => 'Upload'),
    //       tip: 'upload-tip',
    //     },
    //   },
    // },
  ] as FormOption[],
  labelWidth: 100,
}

export const Inline = Template.bind({})
Inline.args = {
  options: [
    { prop: 'name', label: 'Name' },
    { prop: 'email', label: 'Email' },
  ] as FormOption[],
  inline: true,
}

export const CustomAction = Template.bind({})
CustomAction.args = {
  ...Default.args,
  action: {
    resetText: '重置表单',
    submitText: '确认',
  } as FormAction,
}
