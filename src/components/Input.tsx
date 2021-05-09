import React from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'
import { ifProp, theme } from 'styled-tools'

import { Text } from './Text'

type Props = {
  value: string | number
  type: 'text'
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  placeholder: string
  error: { has: boolean; message: string }
  isRequired: boolean
  id?: string
  label: string
  marginTop?: number
  marginBottom?: number
  marginRight?: number
  marginLeft?: number
  isDisabled?: boolean
  isFull: boolean
  name: string
}

const Container = styled.div<{
  isFull: boolean
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}>`
  ${space};
  width: ${ifProp('isFull', '100%', '250px')};
  display: flex;
  flex-direction: column;
  position: relative;
`

const Inputable = styled.input<{
  hasError: boolean
  isRequired: boolean
  placeholder: string
}>`
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: ${theme('radii.4')};
  appearance: none;
  font-family: ${theme('fonts.100')};
  height: 38px;
  outline: none;
  padding: 0 10px;

  color: ${ifProp(
    'hasError',
    theme('colors.support.100'),
    theme('colors.accent.700')
  )};

  border: 1px solid
    ${ifProp(
      'hasError',
      theme('colors.support.100'),
      theme('colors.accent.300')
    )};

  &::placeholder {
    color: ${ifProp(
      'hasError',
      theme('colors.support.100'),
      theme('colors.accent.700')
    )};
  }
`

const Label = styled.label<{ hasError: boolean }>`
  font-family: ${theme('fonts.100')};
  margin-bottom: 5px;
  color: ${ifProp(
    'hasError',
    theme('colors.support.100'),
    theme('colors.accent.600')
  )};
`

export const Input = ({
  value,
  type,
  onChange,
  onBlur,
  placeholder,
  error,
  isRequired,
  id,
  label,
  marginTop,
  isDisabled,
  marginBottom,
  marginRight,
  marginLeft,
  isFull,
  name,
  ...props
}: Props) => {
  return (
    <Container
      isFull={isFull}
      marginBottom={marginBottom}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      {label && (
        <Label htmlFor={id} hasError={error.has}>
          {label}
        </Label>
      )}

      <Inputable
        {...props}
        name={name}
        id={id}
        type={type}
        value={value}
        hasError={error.has}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        isRequired={isRequired}
        disabled={isDisabled}
      />

      {error.has && (
        <Text
          fontSize={14}
          marginTop="2px"
          color={error.has ? 'support.100' : 'accent.600'}
        >
          {error.message}
        </Text>
      )}
    </Container>
  )
}

Input.defaultProps = {
  value: '',
  placeholder: '',
  type: 'text',
  onChange: () => {},
  error: {
    has: false,
    message: ''
  },
  isRequired: false,
  isFull: false
}
