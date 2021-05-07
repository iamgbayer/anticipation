import React from 'react'
import styled from 'styled-components'
import { Box } from 'components'
import { theme } from 'styled-tools'
import { Receivables } from './Receivables'
import { useGetReceivables } from 'hooks'
import { Form } from 'Form'
import { useNetworkState } from 'react-use'

const Container = styled(Box)`
  flex-direction: row;
  border: 1px solid ${theme('colors.accent.400')};
  background-color: ${theme('colors.accent.100')};
  border-radius: ${theme('radii.4')};
`

function App() {
  const { execute, receivables, isLoading, error } = useGetReceivables()
  const { online } = useNetworkState()

  return (
    <Container>
      {!online && <>offline</>}

      <Form execute={execute} />
      <Receivables data={receivables} isLoading={isLoading} />
    </Container>
  )
}

export default App
