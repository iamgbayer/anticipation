export const toMoney = (
  value: number,
  symbol = true,
  options: Intl.NumberFormatOptions = {}
): string => {
  const getCurrencySymbol = () => {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
      .format(value)
      .replace(/\d+/g, '')
      .trim()
      .replace(/[&/\\#,+()~%.'":*?<>{}]/g, '')
  }

  const result = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    ...options
  }).format(value)

  if (!symbol) return result.replace(getCurrencySymbol(), '')

  return result
}

export const filterOnlyNumbers = (value: string) => value.replace(/\D/g, '')

export const toPercent = (value: number, total = 100): string => {
  const percentage = value / total
  return Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2
  }).format(percentage)
}

export const formatMoneyValue = (value: string | number) => {
  if (!value) return value

  let formattedValue = typeof value === 'number' ? value : unmaskMoney(value)

  return toMoney(formattedValue, true)
}

export const unmaskMoney = (value: string): number => {
  let v = value
  if (!v) {
    return value as any
  }

  v = v.toString().split('.').join('')
  v = v.split(',').join('.')

  return parseFloat(v.replace(/\D/g, '')) / 100
}
