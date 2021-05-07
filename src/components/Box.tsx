import React from 'react'
import styled, { css } from 'styled-components'
import {
  space,
  flexbox,
  layout,
  textAlign,
  display,
  maxWidth,
  position,
  shadow,
  LayoutProps,
  SpaceProps,
  FlexboxProps,
  PositionProps
} from 'styled-system'
import { ifNotProp, ifProp } from 'styled-tools'

interface Props extends LayoutProps, SpaceProps, FlexboxProps, PositionProps {
  children: React.ReactNode
}

export const Box = styled.div<Props>`
  ${layout}
  ${display}
  ${space}
  ${flexbox}
  ${textAlign}
  ${maxWidth}
  ${position}
  ${shadow}

  ${ifProp(
    'onClick',
    css`
      cursor: pointer;
    `
  )}
  ${ifNotProp(
    'display',
    css`
      display: flex;
    `
  )}
`
