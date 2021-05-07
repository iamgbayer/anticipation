import React, { useEffect } from 'react'
import { Box, Text, Input, Select } from 'components'
import { useFormik } from 'formik'
import get from 'lodash/get'
import { formatMoneyValue, filterOnlyNumbers } from 'helpers'
import { GetReceivablesPayload } from 'types'
import { validationSchema } from './index.schema'

const options = [
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 3, text: '3' },
  { value: 4, text: '4' },
  { value: 5, text: '5' },
  { value: 6, text: '6' },
  { value: 7, text: '7' },
  { value: 8, text: '8' },
  { value: 9, text: '9' }
]

type Props = {
  execute: (getReceivablesPayload: GetReceivablesPayload) => void
}

export const Form = ({ execute }: Props) => {
  const {
    values,
    setFieldValue,
    errors,
    isValid,
    handleBlur,
    touched
  } = useFormik({
    validateOnChange: true,
    isInitialValid: false,
    validationSchema,
    initialValues: {
      amount: 0,
      mdr: 0,
      installments: 1
    },
    onSubmit: () => {}
  })

  const { amount, mdr, installments } = values

  useEffect(() => {
    const canExecuteGetReceivables =
      isValid &&
      Object.keys(errors).length === 0 &&
      Object.keys(touched).length === 2

    canExecuteGetReceivables && execute({ amount, mdr, installments })
  }, [isValid, values, errors, touched])

  const getError = (attribute: any) => ({
    //@ts-ignore
    has: !!errors[attribute],
    //@ts-ignore
    message: errors[attribute]
  })

  const onChangeFilteringOnlyNumbers = (field: string) => (event: InputEvent) =>
    setFieldValue(field, filterOnlyNumbers(get(event, 'target.value')))

  return (
    <Box flexDirection="column" padding="40px 55px">
      <Text fontSize={24}>Simule sua Antecipação</Text>

      <Input
        id="amount"
        name="amount"
        label="Informe o valor da venda *"
        marginTop={25}
        error={getError('amount')}
        onBlur={handleBlur}
        onChange={onChangeFilteringOnlyNumbers('amount')}
        value={formatMoneyValue(amount)}
      />

      <Select
        marginTop={25}
        label="Em quantas parcelas *"
        options={options}
        onChange={(value: number) => setFieldValue('installments', value)}
        defaultValue={1}
      />
      <Text fontSize={11} color="accent.500" marginTop="2px">
        Máximo de 12 parcelas
      </Text>

      <Input
        id="mdr"
        name="mdr"
        label="Informe o percentual de MDR *"
        onBlur={handleBlur}
        onChange={onChangeFilteringOnlyNumbers('mdr')}
        value={mdr}
        marginTop={25}
      />
    </Box>
  )
}
