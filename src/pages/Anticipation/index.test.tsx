import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { renderWithDependencies } from 'testHelpers'
import { Anticipation } from './index'
import userEvent from '@testing-library/user-event'
import { server } from 'mocks'
import { rest } from 'msw'
import { RESOURCES } from 'api'

test('Should see error message when something goes wrong', async () => {
  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true)

  server.use(
    rest.post(RESOURCES.GET_RECEIVABLES(), (req, res, ctx) =>
      res(
        ctx.status(500),
        ctx.body(
          JSON.stringify({
            message: 'Internal Server Error'
          })
        )
      )
    )
  )

  renderWithDependencies(<Anticipation />)

  userEvent.type(screen.getByTestId('amount'), '10000')
  userEvent.type(screen.getByTestId('mdr'), '1')

  await waitFor(() =>
    expect(
      screen.queryByText(
        'Preencha os campos ao lado para obter a simulação da antecipação.'
      )
    ).not.toBeInTheDocument()
  )

  await waitFor(() =>
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
  )

  expect(screen.queryByText('Algo deu errado.')).toBeInTheDocument()
})

test('Should message not be visible when it has network', async () => {
  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true)

  renderWithDependencies(<Anticipation />)

  expect(
    screen.queryByText(/Verifique a sua conexão com a internet/i)
  ).not.toBeInTheDocument()
})

test('Should message be visible when it has not network', async () => {
  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)

  renderWithDependencies(<Anticipation />)

  expect(
    screen.queryByText(/Verifique a sua conexão com a internet/i)
  ).toBeInTheDocument()
})

test('Should fill fields and see receivables correctly', async () => {
  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true)

  renderWithDependencies(<Anticipation />)

  userEvent.type(screen.getByTestId('amount'), '10000')
  userEvent.type(screen.getByTestId('mdr'), '1')

  await waitFor(() =>
    expect(
      screen.queryByText(
        'Preencha os campos ao lado para obter a simulação da antecipação.'
      )
    ).not.toBeInTheDocument()
  )

  await waitFor(() =>
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
  )

  const outputs = [
    'Amanhã: R$9.75',
    'Em 15 dias: R$9.80',
    'Em 30 dias: R$9.85',
    'Em 90 dias: R$9.90'
  ]

  screen.getAllByTestId('receivable').forEach((receivable, index) => {
    expect(receivable).toHaveTextContent(outputs[index])
  })
})
