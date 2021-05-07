export const toMoney = (value: string): string => {
  if (!Number(value)) {
    return ''
  }

  const amount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(parseFloat(value) / 100)

  return amount
}

export const filterOnlyNumbers = (value: string) => value.replace(/\D/g, '')
