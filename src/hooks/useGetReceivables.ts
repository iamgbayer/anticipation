import { makeInterceptorsResolver, RESOURCES } from 'api'
import { useCallback, useMemo, useState } from 'react'
import { GetReceivablesPayload, Receivable } from 'types'
import useFetch from 'use-http'
import debounce from 'lodash.debounce'

export const useGetReceivables = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [installments, setInstallments] = useState(1)
  const { post, data, error } = useFetch(RESOURCES.GET_RECEIVABLES(), {
    data: [],
    interceptors: makeInterceptorsResolver()
  })

  const execute = useCallback(
    debounce(({ amount, mdr, installments, days }: GetReceivablesPayload) => {
      const makeGetReceivablesPayload = () => ({
        amount,
        mdr,
        installments,
        days: [1, 15, 30, 60, 90, 120].filter((day) => day <= days)
      })

      setInstallments(installments)
      setIsLoading(true)
      post(makeGetReceivablesPayload()).then(() => setIsLoading(false))
    }, 400),
    []
  )

  const getReceivables = useMemo(
    () => (data: Record<string, number>): Array<Receivable> =>
      Object.entries(data).map(([days, value]) => ({
        days: Number(days),
        value
      })),
    [data]
  )

  return {
    execute,
    receivables: getReceivables(data),
    error,
    isLoading
  }
}
