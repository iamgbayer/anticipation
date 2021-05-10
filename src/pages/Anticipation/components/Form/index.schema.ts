import * as Yup from 'yup'

const isGreaterThanZero: Yup.TestFunction<number | undefined> = (
  amount?: number
): boolean => (amount ? amount > 0 : false)

export const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Campo obrigatório')
    .min(1000, 'Valor mínimo deve ser de R$10.00')
    .max(1000000, 'Valor máximo'),
  mdr: Yup.number()
    .required('Campo obrigatório')
    .test('mdr', 'Valor inválido', isGreaterThanZero)
    .max(100, 'Porcentagem máxima é de 100%')
})
