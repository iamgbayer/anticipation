import React, { useEffect } from 'react'
import { Box, Text, Input, Select } from 'components'
import { useFormik } from 'formik'
import get from 'lodash/get'
import { toMoney } from 'helpers'
import { GetReceivablesPayload } from 'types'
import { validationSchema } from './index.schema'
import NumberFormat from 'react-number-format'
import { head } from 'lodash'

const options = [
  { value: 1, text: '1 parcela' },
  { value: 2, text: '2 parcelas' },
  { value: 3, text: '3 parcelas' },
  { value: 4, text: '4 parcelas' },
  { value: 5, text: '5 parcelas' },
  { value: 6, text: '6 parcelas' },
  { value: 7, text: '7 parcelas' },
  { value: 8, text: '8 parcelas' },
  { value: 9, text: '9 parcelas' },
  { value: 10, text: '10 parcelas' },
  { value: 11, text: '11 parcelas' },
  { value: 12, text: '12 parcelas' }
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
      amount: '',
      mdr: '',
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

    canExecuteGetReceivables &&
      execute({
        amount: parseFloat(amount),
        mdr: parseFloat(mdr),
        installments
      })
  }, [isValid, values, errors, touched])

  const getError = (attribute: any) => ({
    //@ts-ignore
    has: !!errors[attribute],
    //@ts-ignore
    message: errors[attribute]
  })

  const onChangeFilteringInvalidCharacters = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFieldValue(
      field,
      get(event, 'target.value')
        .replace('%', '')
        .replace('R$', '')
        .replace(',', '.')
        .trim('')
    )
  }

  return (
    <Box flexDirection="column" padding="40px 55px">
      <Text fontSize={24}>Simule sua Antecipação</Text>

      <NumberFormat
        id="amount"
        name="amount"
        label="Informe o valor da venda *"
        marginTop={25}
        error={getError('amount')}
        format={toMoney}
        onBlur={handleBlur}
        onChange={onChangeFilteringInvalidCharacters('amount')}
        value={amount}
        prefix="R$"
        customInput={Input}
        allowEmptyFormatting
        allowLeadingZeros
        thousandSeparator="."
        fixedDecimalScale
        decimalScale={2}
        decimalSeparator=","
      />

      <Select
        marginTop={25}
        label="Em quantas parcelas *"
        options={options}
        onChange={(value: number) => setFieldValue('installments', value)}
        defaultValue={get(head(options), 'text')}
      />
      <Text fontSize={11} color="accent.500" marginTop="2px">
        Máximo de 12 parcelas
      </Text>

      <NumberFormat
        id="mdr"
        name="mdr"
        customInput={Input}
        label="Informe o percentual de MDR *"
        suffix="%"
        onChange={onChangeFilteringInvalidCharacters('mdr')}
        marginTop={25}
        onBlur={handleBlur}
      />
    </Box>
  )
}
