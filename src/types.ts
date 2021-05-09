export type Receivable = {
  days: number
  value: number
}

export type GetReceivablesPayload = {
  amount: number
  mdr: number
  installments: number
  days: number
}
