export type Receivable = {
  days: string
  value: number
}

export type GetReceivablesPayload = {
  amount: number
  mdr: number
  installments: number
}
