import * as Yup from 'yup'

const isGreaterThanZero = (amount: any): boolean => parseFloat(amount) > 0

export const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Campo obrigatório')
    .test('amount', 'Valor inválido', isGreaterThanZero),
  mdr: Yup.number()
    .required('Campo obrigatório')
    .test('mdr', 'Valor inválido', isGreaterThanZero)
})
