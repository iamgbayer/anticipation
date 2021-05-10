import { Form } from './index'
import { renderWithDependencies } from 'testHelpers'
import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

const spyExecute = jest.fn()

const AMOUNT = 1000

test('Should just execute get receivables when all fields are filled correctly', async () => {
  renderWithDependencies(
    <Form execute={spyExecute} shouldFieldsBeDisabled={false} />
  )

  expect(screen.getByText('Simule sua Antecipação')).toBeInTheDocument()

  userEvent.type(screen.getByTestId('amount'), AMOUNT.toString())

  await waitFor(() => expect(spyExecute).not.toBeCalled())

  userEvent.type(screen.getByTestId('mdr'), '1')

  await waitFor(() =>
    expect(spyExecute).toBeCalledWith({
      amount: AMOUNT,
      installments: 1,
      mdr: 1
    })
  )
})

test('Should see error message when amount is not correctly filled', async () => {
  renderWithDependencies(
    <Form execute={spyExecute} shouldFieldsBeDisabled={false} />
  )

  userEvent.type(screen.getByTestId('amount'), '100')
  userEvent.type(screen.getByTestId('mdr'), '10')

  await waitFor(() =>
    expect(
      screen.queryByText('Valor mínimo deve ser de R$10.00')
    ).toBeInTheDocument()
  )

  expect(spyExecute).not.toBeCalled()
})

test('Should see error message when mdr is not correctly filled', async () => {
  renderWithDependencies(
    <Form execute={spyExecute} shouldFieldsBeDisabled={false} />
  )

  userEvent.type(screen.getByTestId('mdr'), '120')
  userEvent.type(screen.getByTestId('amount'), '1000')

  await waitFor(() =>
    expect(
      screen.queryByText('Porcentagem máxima é de 100%')
    ).toBeInTheDocument()
  )

  expect(spyExecute).not.toBeCalled()
})

test.todo('Should fields be disabled')
test.todo('Should select different installments')
