import { Box, Text } from 'components'
import { toMoney } from 'helpers'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { Receivable } from 'types'
import { Skeleton } from './Skeleton'

type Props = {
  data: Array<Receivable>
  isLoading: boolean
}

const Container = styled(Box)`
  background-color: ${theme('colors.accent.200')};
  padding: 40px 55px;
`

export const Receivables = ({ data, isLoading }: Props) => {
  const getPrefixByDays = (days: string) =>
    days === String(1) ? 'Amanhã:' : `Em ${days} dias:`

  const canRenderContent = data.length > 0 && !isLoading
  const canRenderEmptyState = data.length === 0 && !isLoading

  return (
    <>
      <Container>
        {canRenderContent && (
          <Box flexDirection="column">
            <Text color="primary.200" fontWeight={700}>
              Você receberá:
            </Text>

            <Box flexDirection="column">
              {data.map(({ days, value }) => (
                <Text key={days} color="primary.100" marginTop={20}>
                  {getPrefixByDays(days)}{' '}
                  <strong>{toMoney(value.toString())}</strong>
                </Text>
              ))}
            </Box>
          </Box>
        )}

        {canRenderEmptyState && (
          <Box
            justifyContent="center"
            alignItems="center"
            maxWidth={140}
            height="100%"
          >
            <Text textAlign="center">
              Preencha os campos ao lado para obter a simulação da antecipação.
            </Text>
          </Box>
        )}

        {isLoading && <Skeleton />}
      </Container>
    </>
  )
}
