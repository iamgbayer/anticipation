import { RESOURCES } from 'api'
import { useCallback, useEffect, useState } from 'react'
import { GetReceivablesPayload, Receivable } from 'types'
import useFetch from 'use-http'
import debounce from 'lodash.debounce'

export const useGetReceivables = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { post, data, error } = useFetch(RESOURCES.GET_RECEIVABLES(), {
    data: []
  })

  const execute = useCallback(
    debounce(({ amount, mdr, installments }: GetReceivablesPayload) => {
      const makeGetReceivablesPayload = () => ({
        amount: parseFloat(amount.toString()) * 100,
        mdr: parseFloat(mdr.toString()),
        installments
      })

      setIsLoading(true)
      post(makeGetReceivablesPayload()).then(() => setIsLoading(false))
    }, 400),
    []
  )

  return {
    execute,
    receivables: Object.entries(data).map(([days, value]) => ({
      days,
      value
    })) as Array<Receivable>,
    error,
    isLoading
  }
}
