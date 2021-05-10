import { Interceptors, Res } from 'use-http'
import get from 'lodash.get'

type ResponsePayload = {
  message?: string
}

type Props = {
  response: Res<ResponsePayload>
}

export const RESOURCES = {
  GET_RECEIVABLES: () => `${process.env.REACT_APP_API_URL}`
}

const getError = (error?: string) => {
  const DEFAULT_MESSAGE = 'Erro desconhecido, tente novamente.'

  const mapping: Record<string, string> = {
    'Internal Server Error': 'Algo deu errado.',
    Timeout: 'Tente novamente mais tarde.'
  }

  return error ? mapping[error] ?? DEFAULT_MESSAGE : DEFAULT_MESSAGE
}

const checkHasErrorAtResponse = async ({
  response
}: Props): Promise<Res<ResponsePayload>> => {
  if ([500, 408].includes(response.status)) {
    throw new Error(getError(get(response, 'data.message')))
  }

  if (!response.ok) {
    throw new Error(getError())
  }

  return response
}

export const makeInterceptorsResolver = (): Interceptors => ({
  response: checkHasErrorAtResponse
})
