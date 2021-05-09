import Dinero from 'dinero.js'

Dinero.defaultCurrency = 'BRL'

export const toMoney = (amount: number) => Dinero({ amount }).toFormat()
