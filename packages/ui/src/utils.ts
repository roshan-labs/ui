export const isUndefined = (value: any): value is undefined => typeof value === 'undefined'

export const isBoolean = (value: any): value is boolean => typeof value === 'boolean'

export const isObject = (value: any): value is object =>
  Object.prototype.toString.call(value) === '[object Object]'

export const isString = (value: any): value is string => typeof value === 'string'
