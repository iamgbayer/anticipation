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
  const canRenderSkeleton = isLoading || data.length === 0

  return (
    <>
      <Container flexDirection="column">
        {canRenderContent && (
          <>
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
          </>
        )}

        {canRenderSkeleton && <Skeleton />}
      </Container>
    </>
  )
}
