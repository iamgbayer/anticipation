import * as Yup from 'yup'

const isGreaterThanZero = (amount: any): boolean => parseFloat(amount) > 0

export const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Campo obrigatório')
    .min(10, 'Valor mínimo deve ser de R$10,00')
    .max(10000),
  mdr: Yup.number()
    .required('Campo obrigatório')
    .test('mdr', 'Valor inválido', isGreaterThanZero)
})
