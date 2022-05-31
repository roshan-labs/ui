import type { FullConfig } from 'windicss/types/interfaces'
import { defineConfig } from 'windicss/helpers'
import { defu } from 'defu'

const size = {
  sm: '24px',
  base: '32px',
  lg: '40px',
}

const space = {
  /** more small */
  xss: '4px',
  /** small items */
  xs: '8px',
  /** Form controls and items */
  sm: '12px',
  /** small containers and buttons */
  md: '16px',
  /** containers */
  lg: '24px',
}

const defultWindiConfig = defineConfig({
  preflight: true,
  theme: {
    extend: {
      colors: {
        primary: {
          5: '#597ef7',
          6: '#2f54eb',
          7: '#1d39c4',
        },
        error: {
          base: '#ff4d4f',
          hover: '#ff7875',
          active: '#d9363e',
          outline: 'rgb(255, 77, 79)',
        },
        warning: {
          base: '#faad14',
          hover: '#ffc53d',
          outline: 'rgb(250, 173, 20)',
        },
        disabled: {
          text: '#00000040',
          bg: '#f5f5f5',
        },
      },
      width: size,
      height: size,
      minHeight: size,
      minWidth: {
        base: size.base,
      },
      fontSize: {
        sm: '12px',
        base: '14px',
        lg: '16px',
      },
      lineHeight: {
        base: '1.5715',
      },
      textColor: {
        content: '#000000d9',
        inverse: '#ffffff',
      },
      borderColor: {
        base: '#d9d9d9',
      },
      borderRadius: {
        base: '2px',
      },
      textShadow: {
        button: '0 -1px 0 rgba(0, 0, 0, 0.12)',
      },
      boxShadow: {
        button: '0 2px 0 rgba(0, 0, 0, 0.015)',
        primary: '0 2px 0 rgba(0, 0, 0, 0.045)',
        input: '0 0 0 2px rgba(47, 84, 235, 0.2)',
        'input-error': '0 0 0 2px rgba(255, 77, 79, 0.2)',
        'input-warning': '0 0 0 2px rgba(250, 173, 20, 0.2)',
      },
      transitionProperty: {
        input: 'border-color, box-shadow',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
      padding: space,
      margin: space,
    },
  },
  shortcuts: {
    // Button
    'n-button':
      'inline-flex items-center justify-center h-base text-base font-normal text-content py-[4px] px-[15px] whitespace-nowrap align-middle bg-none border-1 border-solid border-base shadow-button cursor-pointer transition-all duration-300 ease-in-out select-none rounded-base bg-white outline-none hover:(no-underline bg-white text-primary-5 border-primary-5) active:(outline-none bg-white text-primary-7 border-primary-7) focus:(outline-none bg-white text-primary-5 border-primary-5)',
    'n-button-default':
      'disabled:(text-disabled-text bg-disabled-bg border-base shadow-none text-shadow-none cursor-not-allowed) disabled:hover:border-base disabled:hover:text-disabled-text',
    'n-button-primary':
      'text-white border-primary-6 bg-primary-6 text-shadow-button shadow-primary hover:(border-primary-5 bg-primary-5 text-white) focus:(border-primary-5 bg-primary-5 text-white) active:(border-primary-7 bg-primary-7 text-white) disabled:(text-disabled-text bg-disabled-bg border-base shadow-none text-shadow-none cursor-not-allowed)',
    'n-button-dashed':
      'border-dashed disabled:(text-disabled-text bg-disabled-bg border-base shadow-none text-shadow-none cursor-not-allowed)',
    'n-button-text':
      'border-transparent bg-transparent shadow-transparent hover:(text-content border-transparent bg-[rgba(0,0,0,0.018)]) focus:(text-content border-transparent bg-[rgba(0,0,0,0.018)]) active:(text-content border-transparent bg-[rgba(0,0,0,0.028)]) disabled:(text-disabled-text bg-transparent cursor-not-allowed) disabled:hover:text-disabled-text',
    'n-button-link':
      'text-primary-6 border-transparent bg-transparent shadow-transparent no-underline hover:(border-transparent bg-transparent) focus:(border-transparent bg-transparent) active:(border-transparent bg-transparent) disabled:(text-disabled-text bg-transparent cursor-not-allowed) disabled:hover:text-disabled-text',
    'n-button-block': 'w-full',
    'n-button-default-danger':
      'text-error-base border-error-base hover:(text-error-hover border-error-hover) focus:(text-error-hover border-error-hover) active:(text-error-active border-error-active)',
    'n-button-primary-danger':
      'bg-error-base border-error-base hover:(bg-error-hover border-error-hover) focus:(bg-error-hover border-error-hover) active:(bg-error-active border-error-active)',
    'n-button-dashed-danger': 'n-button-default-danger',
    'n-button-text-danger':
      'text-error-base hover:text-error-hover focus:text-error-hover active:text-error-active',
    'n-button-link-danger': 'n-button-text-danger',
    'n-button-default-ghost':
      'text-white bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent',
    'n-button-primary-ghost':
      'text-primary-6 bg-transparent text-shadow-none hover:(text-primary-5 bg-transparent) focus:(text-primary-5 bg-transparent) active:(text-primary-7 bg-transparent)',
    'n-button-dashed-ghost': 'n-button-default-ghost',
    'n-button-danger-ghost':
      'text-error-base hover:text-error-hover focus:text-error-hover active:text-error-active',
    'n-button-large': 'min-w-40px h-lg text-lg',
    'n-button-small': 'h-sm py-0 px-xs',
    'n-button-circle': 'min-w-base px-0 rounded-1/2',
    'n-button-circle-small': 'min-w-24px',
    'n-button-circle-large': 'min-w-40px',
    'n-button-round': 'rounded-32px',
    'n-button-round-small': 'rounded-24px',
    'n-button-round-large': 'rounded-40px',
    'n-button-icon': 'w-base py-0 px-0 text-lg',
    'n-button-icon-small': 'w-sm py-0 px-0',
    'n-button-icon-large': 'w-lg text-[18px]',

    // Divider
    'n-divider':
      'box-border p-0 m-0 text-content text-base tabular-nums leading-base list-none border-t border-solid',
    'n-divider-horizontal': 'flex clear-both w-full min-w-full my-lg border-[#0000000f]',
    'n-divider-vertical':
      'relative top-[-0.06em] inline-block h-[0.9em] mx-xs align-middle border-t-0 border-l border-[rgba(0,0,0,.06)]',
    'n-divider-dashed': 'bg-transparent border-[#0000000f] border-dashed',
    'n-divider-text':
      'my-md mx-0 text-content font-medium text-lg whitespace-nowrap text-center border-t-0 before:(content-[""] relative top-1/2 w-1/2 border-t border-solid border-[inherit] transform translate-y-1/2) after:(content-[""] relative top-1/2 w-1/2 border-t border-solid border-[inherit] transform translate-y-1/2)',
    'n-divider-text-dashed': 'before:border-dashed after:border-dashed',
    'n-divider-text-left': 'before:(top-1/2 w-[5%]) after:(top-1/2 w-[95%])',
    'n-divider-text-right': 'before:(top-1/2 w-[95%]) after:(top-1/2 w-[5%])',
    'n-divider-inner-text': 'inline-block px-[1em]',
    'n-divider-plain': 'font-normal text-base',
    'n-divider-orientation-left': 'before:w-0',
    'n-divider-orientation-right': 'after:w-0',

    // Icon
    'n-icon': 'relative inline-flex justify-center items-center fill-current svg:(w-[1em] h-[1em])',

    // Avatar
    'n-avatar':
      'inline-flex items-center justify-center w-base h-base rounded-1/2 overflow-hidden p-0 text-base text-white whitespace-nowrap align-middle bg-[#ccc]',
    'n-avatar-image': 'bg-transparent children:(block w-full h-full object-cover)',
    'n-avatar-square': 'rounded-base',
    'n-avatar-icon': 'text-[18px]',
    'n-avatar-small': 'w-sm h-sm',
    'n-avatar-large': 'w-lg h-lg',
    'n-avatar-icon-small': 'text-[14px]',
    'n-avatar-icon-large': 'text-[24px]',

    // Layout
    'n-layout': 'flex flex-auto flex-col min-h-0 bg-[#f0f2f5]',
    'n-layout-has-sider': 'flex-row',
    'n-layout-header': 'h-[64px] leading-[64px] px-[50px] text-content flex-shrink-0 bg-[#001529]',
    'n-layout-sider': 'relative bg-[#001529] transition-all duration-200 ease',
    'n-layout-sider-children': 'h-full',
    'n-layout-sider-trigger':
      'fixed bottom-0 z-1 flex items-center justify-center h-48px text-white bg-[#002140] cursor-pointer transition-all duration-200 ease',
    'n-layout-content': 'flex-auto min-h-0',
    'n-layout-footer': 'flex-shrink-0 text-content text-base py-[24px] px-[50px] bg-[#f0f2f5]',

    // Input
    'n-input': 'inline-flex w-full text-base text-content',
    'n-input-large': 'text-lg',
    'n-input-wrapper':
      'inline-flex flex-grow border-1 border-solid border-base rounded-base px-[11px] py-[4px] transition-all duration-300 ease hover:border-primary-5',
    'n-input-wrapper-small': 'py-0',
    'n-input-wrapper-large': 'py-[6.5px]',
    'n-input-focus': 'border-primary-5 shadow-input',
    'n-input-main': 'w-full leading-base outline-none placeholder-shown:overflow-ellipsis',
    'n-input-clear':
      'text-[#00000040] cursor-pointer transition-all duration-300 ease hover:text-[#00000073]',
    'n-input-prefix': 'flex items-center flex-none mr-xss',
    'n-input-prefix-error': 'text-error-base',
    'n-input-prefix-warning': 'text-warning-base',
    'n-input-suffix': 'flex items-center flex-none ml-xss',
    'n-input-suffix-item': 'mr-xs last:mr-0',
    'n-input-error': 'border-error-base hover:border-error-base shadow-error-outline/20',
    'n-input-warning': 'border-warning-base hover:border-warning-base shadow-warning-outline/20',
    'n-input-addon':
      'flex items-center relative text-center border-1 border-solid border-base rounded-base bg-[#fafafa] px-[11px] first:(border-r-0 rounded-tr-none rounded-br-none) last:(border-l-0 rounded-tl-none rounded-bl-none)',
    'n-input-addon-before': 'relative z-1 rounded-tl-none rounded-bl-none',
    'n-input-addon-after': 'relative z-1 rounded-tr-none rounded-br-none',
    'n-input-borderless': 'border-none shadow-none',
    'n-input-wrapper-disabled':
      'text-[#00000040] bg-[#f5f5f5] cursor-not-allowed hover:border-base',
    'n-input-main-disabled': 'bg-transparent cursor-not-allowed',
    'n-input-password':
      'text-[#00000073] transition-all duration-300 cursor-pointer hover:text-content',
    'n-input-show-count': 'text-[#00000073]',

    // Textarea
    'n-textarea': 'relative inline-block w-full text-base align-bottom',
    'n-textarea-show-count':
      'after:(content-[attr(data-count)] absolute right-[11px] bottom-[4px] text-[#00000073] whitespace-nowrap)',
    'n-textarea-main':
      'block w-full min-h-base text-content leading-base border border-solid border-base rounded-base px-[11px] py-[4px] bg-white bg-none outline-none transition-input duration-300 ease hover:border-primary-5 focus:(border-primary-5 shadow-input)',
    'n-textarea-clear': 'absolute top-[8px] right-[8px] z-1',
    'n-textarea-borderless': 'border-none focus:shadow-none',
    'n-textarea-error': 'border-error-base hover:border-error-base focus:shadow-error-outline/20',
    'n-textarea-warning':
      'border-warning-base hover:border-warning-base focus:(border-warning-hover shadow-warning-outline/20)',
    'n-textarea-disabled': 'text-[#00000040] bg-[#f5f5f5] cursor-not-allowed hover:border-base',

    // Space
    'n-space': 'inline-flex',
    'n-space-vertical': 'flex flex-col',
    'n-space-horizontal': 'flex-row',
    'n-space-wrap': 'flex-wrap',
    'n-space-align-start': 'items-start',
    'n-space-align-end': 'items-end',
    'n-space-align-center': 'items-center',
    'n-space-align-baseline': 'items-baseline',
  },
})

export function extendWindiConfig(userConfig: FullConfig = {}) {
  return defu(userConfig, defultWindiConfig)
}
