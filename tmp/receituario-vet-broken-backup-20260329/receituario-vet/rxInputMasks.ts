export function digitsOnly(value: string): string {
  return String(value || '').replace(/\D/g, '')
}

export function maskCpf(value: string): string {
  const digits = digitsOnly(value).slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return digits.replace(/^(\d{3})(\d+)/, '$1.$2')
  if (digits.length <= 9) return digits.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3')
  return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4')
}

export function maskCep(value: string): string {
  const digits = digitsOnly(value).slice(0, 8)
  if (digits.length <= 5) return digits
  return digits.replace(/^(\d{5})(\d+)/, '$1-$2')
}

export function maskPhoneBr(value: string): string {
  const digits = digitsOnly(value).slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d+)/, '($1) $2')
  if (digits.length <= 10) return digits.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3')
  return digits.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3')
}

export function maskRg(value: string): string {
  const clean = String(value || '').toUpperCase().replace(/[^0-9X]/g, '').slice(0, 9)
  if (clean.length <= 2) return clean
  if (clean.length <= 5) return clean.replace(/^(\d{2})(\d+)/, '$1.$2')
  if (clean.length <= 8) return clean.replace(/^(\d{2})(\d{3})(\d+)/, '$1.$2.$3')
  return clean.replace(/^(\d{2})(\d{3})(\d{3})([\dX])/, '$1.$2.$3-$4')
}

