import { render, RenderResult } from '@testing-library/react'
import { Tokens } from 'components'
import React from 'react'
import { ThemeProvider } from 'styled-components'

declare global {
  namespace NodeJS {
    interface Global {
      renderWithDependencies: (children: React.ReactNode) => RenderResult
    }
  }

  namespace globalThis {
    const renderWithDependencies: (children: React.ReactNode) => RenderResult
  }
}

export const renderWithDependencies = (children: React.ReactNode) =>
  render(<ThemeProvider theme={Tokens}>{children}</ThemeProvider>)
