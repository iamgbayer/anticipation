import { makeInterceptorsResolver, RESOURCES } from 'api'
import { useCallback, useMemo, useState } from 'react'
import { GetReceivablesPayload, Receivable } from 'types'
import useFetch from 'use-http'
import debounce from 'lodash.debounce'

export const useGetReceivables = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { post, data, error } = useFetch(RESOURCES.GET_RECEIVABLES(), {
    data: [],
    interceptors: makeInterceptorsResolver()
  })

  /**
   * @description the maximum period of anticipation is based on
   * the number of installments.
   *
   * @example
   * - 2 installments, anticipation until 60 days
   * - 3 installments, anticipation until 90 days
   */
  const makePayload = ({
    amount,
    installments,
    mdr
  }: GetReceivablesPayload) => {
    const mapping: Record<number, number> = {
      1: 30,
      2: 60,
      3: 90,
      4: 120,
      5: 150
    }

    const days = mapping[installments] ?? 150

    return {
      amount,
      mdr,
      installments,
      days: [1, 15, 30, 60, 90, 120, 150].filter((day) => day <= days)
    }
  }

  const execute = useCallback(
    debounce((getReceivablesPayload: GetReceivablesPayload) => {
      setIsLoading(true)
      post(makePayload(getReceivablesPayload)).then(() => setIsLoading(false))
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
