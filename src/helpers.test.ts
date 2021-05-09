import { toMoney } from './helpers'

test('Should see money correctly formatted', () => {
  expect(toMoney(100)).toStrictEqual('R$1.00')
  expect(toMoney(1075)).toStrictEqual('R$10.75')
  expect(toMoney(120000)).toStrictEqual('R$1,200.00')
})
