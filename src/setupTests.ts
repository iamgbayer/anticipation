// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom'
import { server } from 'mocks'

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error'
  })
)
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
