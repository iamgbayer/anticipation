import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { renderWithDependencies } from 'testHelpers'
import App from './App'
import userEvent from '@testing-library/user-event'

test('Should message not be visible when it has network', async () => {
  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true)

  renderWithDependencies(<App />)

  expect(
    screen.queryByText(/Verifique a sua conexão com a internet/i)
  ).not.toBeInTheDocument()
})

test('Should message be visible when it has not network', async () => {
  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)

  renderWithDependencies(<App />)

  expect(
    screen.queryByText(/Verifique a sua conexão com a internet/i)
  ).toBeInTheDocument()
})

test('Should fill fields and see receivables correctly', async () => {
  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true)

  renderWithDependencies(<App />)

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
