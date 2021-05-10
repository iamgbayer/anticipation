import React from 'react'
import styled from 'styled-components'
import { Box, Bar } from 'components'
import { theme } from 'styled-tools'
import { Receivables, Form } from './components'
import { useGetReceivables } from 'hooks'
import { useNetworkState } from 'react-use'

const Container = styled(Box)`
  flex-direction: row;
  border: 1px solid ${theme('colors.accent.400')};
  background-color: ${theme('colors.accent.100')};
  border-radius: ${theme('radii.4')};
`

export const Anticipation = () => {
  const { execute, receivables, isLoading, error } = useGetReceivables()
  const { online } = useNetworkState()

  return (
    <>
      {!online && (
        <Bar>
          Verifique a sua conexão com a internet, não iremos conseguir exibir as
          simulações da antecipação.
        </Bar>
      )}

      <Container>
        <Form execute={execute} shouldFieldsBeDisabled={!online} />
        <Receivables data={receivables} isLoading={isLoading} error={error} />
      </Container>
    </>
  )
}
