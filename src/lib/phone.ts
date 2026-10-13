const BRAZIL_COUNTRY_CODE = '55'
const LANDLINE_DIGITS = 10
const MOBILE_DIGITS = 11

/** Remove tudo que não é dígito e o DDI 55, quando presente. */
export function toNationalDigits(value: string): string {
  const digits = value.replace(/\D/g, '')
  const hasCountryCode = digits.length > MOBILE_DIGITS && digits.startsWith(BRAZIL_COUNTRY_CODE)
  return hasCountryCode ? digits.slice(BRAZIL_COUNTRY_CODE.length) : digits
}

/** Telefone brasileiro com DDD: 10 dígitos (fixo) ou 11 (celular). DDD não começa com 0. */
export function isValidBrazilianPhone(value: string): boolean {
  const digits = toNationalDigits(value)
  const hasValidLength = digits.length === LANDLINE_DIGITS || digits.length === MOBILE_DIGITS
  return hasValidLength && !digits.startsWith('0')
}

/**
 * Máscara progressiva para telefone brasileiro, aplicada enquanto a pessoa digita:
 * "(11) 1234-5678" para fixo e "(11) 91234-5678" para celular.
 */
export function formatBrazilianPhone(value: string): string {
  const digits = toNationalDigits(value).slice(0, MOBILE_DIGITS)
  const areaCode = digits.slice(0, 2)
  const number = digits.slice(2)

  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${areaCode}`
  if (number.length <= 4) return `(${areaCode}) ${number}`

  const prefixLength = digits.length === MOBILE_DIGITS ? 5 : 4
  return `(${areaCode}) ${number.slice(0, prefixLength)}-${number.slice(prefixLength)}`
}
