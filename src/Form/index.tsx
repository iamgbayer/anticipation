import React, { useEffect } from 'react'
import { Box, Text, Input, Select } from 'components'
import { useFormik } from 'formik'
import get from 'lodash.get'
import head from 'lodash.head'
import { GetReceivablesPayload } from 'types'
import NumberFormat from 'react-number-format'
import { toMoney } from 'helpers'
import { validationSchema } from './index.schema'

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
  shouldFieldsBeDisabled: boolean
}

export const Form = ({ execute, shouldFieldsBeDisabled }: Props) => {
  const { values, setFieldValue, errors, isValid } = useFormik({
    validateOnChange: true,
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
      validationSchema.isValidSync(values)

    canExecuteGetReceivables &&
      execute({
        amount,
        mdr,
        installments
      })
  }, [isValid, values, errors])

  const getError = (attribute: string) => ({
    has: !!get(errors, attribute),
    message: get(errors, attribute)
  })

  const applyFilterAndSetValueByField = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = get(event, 'target.value')
    const applyWhenAmount = parseInt(value.replace(/R\$|,|\./g, ''))
    const applyWhenMdr = parseFloat(value.replace('%', ''))

    setFieldValue(field, field === 'amount' ? applyWhenAmount : applyWhenMdr)
  }

  return (
    <Box flexDirection="column" padding="40px 55px">
      <Text fontSize={24}>Simule sua Antecipação</Text>

      <Input
        id="amount"
        name="amount"
        data-testid="amount"
        label="Informe o valor da venda *"
        marginTop={25}
        error={getError('amount')}
        onChange={applyFilterAndSetValueByField('amount')}
        value={toMoney(amount)}
        isDisabled={shouldFieldsBeDisabled}
      />

      <Select
        marginTop={25}
        label="Em quantas parcelas *"
        options={options}
        onChange={(value) => setFieldValue('installments', value)}
        defaultValue={get(head(options), 'text')}
      />
      <Text fontSize={11} color="accent.500" marginTop="2px">
        Máximo de 12 parcelas
      </Text>

      <NumberFormat
        id="mdr"
        name="mdr"
        data-testid="mdr"
        customInput={Input}
        label="Informe o percentual de MDR *"
        suffix="%"
        isDisabled={shouldFieldsBeDisabled}
        onChange={applyFilterAndSetValueByField('mdr')}
        error={getError('mdr')}
        marginTop={25}
      />
    </Box>
  )
}
