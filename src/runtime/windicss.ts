import type { FullConfig } from 'windicss/types/interfaces'
import { defineConfig } from 'windicss/helpers'
import { defu } from 'defu'

const size = {
  sm: '24px',
  base: '32px',
  lg: '40px',
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
        },
        disabled: {
          text: '#00000040',
          bg: '#f5f5f5',
        },
      },
      width: size,
      height: size,
      minWidth: {
        base: size.base,
      },
      fontSize: {
        base: '14px',
        sm: '12px',
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
        DEFAULT: '2px',
      },
      textShadow: {
        button: '0 -1px 0 rgba(0, 0, 0, 0.12)',
      },
      boxShadow: {
        button: '0 2px 0 rgba(0, 0, 0, 0.015)',
        primary: '0 2px 0 rgba(0, 0, 0, 0.045)',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
      padding: {
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
      },
      margin: {
        xss: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
      },
    },
  },
  shortcuts: {
    // Button
    'n-button':
      'inline-flex items-center justify-center h-base text-base font-normal text-content py-[4px] px-[15px] whitespace-nowrap align-middle bg-none border-1 border-solid border-base shadow-button cursor-pointer transition-all duration-300 ease-in-out select-none rounded bg-white outline-none hover:(no-underline bg-white text-primary-5 border-primary-5) active:(outline-none bg-white text-primary-7 border-primary-7) focus:(outline-none bg-white text-primary-5 border-primary-5)',
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
    'n-avatar-square': 'rounded',
    'n-avatar-icon': 'text-[18px]',
    'n-avatar-small': 'w-sm h-sm',
    'n-avatar-large': 'w-lg h-lg',
    'n-avatar-icon-small': 'text-[14px]',
    'n-avatar-icon-large': 'text-[24px]',

    // Layout
    'n-layout': 'flex flex-auto flex-col min-h-0 bg-[#f0f2f5]',
    'n-layout-header': 'h-[64px] leading-[64px] px-[50px] text-content flex-shrink-0 bg-[#001529]',
    'n-layout-content': 'flex-auto min-h-0',
    'n-layout-footer': 'flex-shrink-0 text-content text-base py-[24px] px-[50px] bg-[#f0f2f5]',
  },
})

export function extendUserConfig(userConfig: FullConfig = {}) {
  return defu(userConfig, defultWindiConfig)
}
