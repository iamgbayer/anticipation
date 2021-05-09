import React from 'react'
import styled from 'styled-components'
import { Props } from './Props'

const Icon = styled.div`
  transform: scaleY(-1) rotate(-90deg);
`

export function Down({ width, height, color }: Props) {
  return (
    <Icon>
      <svg width={width} height={height} viewBox="0 0 9 15" fill="none">
        <path
          d="M1.55469 14L7.33247 7.5L1.55469 1"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  )
}
