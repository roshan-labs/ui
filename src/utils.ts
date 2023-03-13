export function hyphenate(value: string) {
  return value.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}
