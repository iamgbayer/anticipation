import styled from 'styled-components'
import { theme } from 'styled-tools'

import { Box } from './Box'

export const Bar = styled(Box)`
  width: 100%;
  min-height: 40px;
  background-color: ${theme('colors.support.100')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${theme('fonts.100')};
  color: ${theme('colors.accent.100')};
  text-align: center;
  padding: 5px 10px;
  position: absolute;
  left: 0;
  top: 0;
`
