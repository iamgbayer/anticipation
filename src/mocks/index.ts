import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { RESOURCES } from 'api'

export const server = setupServer(
  rest.post(RESOURCES.GET_RECEIVABLES(), (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.body(JSON.stringify({ '1': 975, '15': 980, '30': 985, '90': 990 }))
    )
  )
)
