import { render, screen } from '@testing-library/react'
import { Receivables } from './index'

const EMPTY_STATE_TEXT =
  'Preencha os campos ao lado para obter a simulação da antecipação.'
const RECEIVABLES_TEXT = 'Você receberá:'

const data = [
  {
    days: 1,
    value: 980
  },
  {
    days: 15,
    value: 985
  },
  {
    days: 30,
    value: 990
  }
]

test('Should see skeleton when does not have receivables', () => {
  render(<Receivables data={[]} isLoading={true} error={null} />)

  expect(screen.queryByTestId('skeleton')).toBeInTheDocument()
  expect(screen.queryByText(EMPTY_STATE_TEXT)).not.toBeInTheDocument()
  expect(screen.queryByText(RECEIVABLES_TEXT)).not.toBeInTheDocument()
})

test('Should see empty state on the first render', () => {
  render(<Receivables data={[]} isLoading={false} error={null} />)

  expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
  expect(screen.queryByText(EMPTY_STATE_TEXT)).toBeInTheDocument()
  expect(screen.queryByText(RECEIVABLES_TEXT)).not.toBeInTheDocument()
})

test('Should see receivables correctly', () => {
  render(<Receivables data={data} isLoading={false} error={null} />)

  expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
  expect(screen.queryByText(EMPTY_STATE_TEXT)).not.toBeInTheDocument()
  expect(screen.queryByText(RECEIVABLES_TEXT)).toBeInTheDocument()

  const outputs = ['Amanhã: R$9.80', 'Em 15 dias: R$9.85', 'Em 30 dias: R$9.90']

  screen.getAllByTestId('receivable').forEach((receivable, index) => {
    expect(receivable).toHaveTextContent(outputs[index])
  })
})
