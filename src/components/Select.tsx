import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import { ifProp, theme } from 'styled-tools'

import { Closeable } from './Closeable'
import { Icon } from './Icon'
import { Text } from './Text'

type OptionProps = {
  value: number | string
  text: string
}

type Props = {
  options: Array<OptionProps>
  defaultValue?: string
  onChange: (value: number | string) => void
  label: string
  marginTop?: number
  marginBottom?: number
  marginRight?: number
  marginLeft?: number
  isRequired?: boolean
  isDisabled?: boolean
  isFull?: boolean
}

interface ContainerProps extends SpaceProps {
  isFull: boolean
}

const Container = styled.div<ContainerProps>`
  ${space};
  width: ${ifProp('isFull', '100%', '250px')};
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: ${theme('zIndeces.50')};
`

const Selectable = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 38px;
  padding: 0 16px;
  border-radius: ${theme('radii.4')};
  outline: 0;
  margin-top: 5px;
  appearance: none;
  cursor: pointer;
  position: relative;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${theme('colors.accent.300')};
`

const Options = styled.div<{ isVisible: boolean }>`
  display: ${ifProp({ isVisible: true }, 'block', 'none')};
  width: 100%;
  top: calc(100% + 4px);
  position: absolute;
  border-radius: ${theme('radii.4')};
  list-style: none;
  padding: 1px;
  background-color: ${theme('colors.accent.100')};
  border: 1px solid ${theme('colors.accent.300')};
`

const Option = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
  padding-left: 14px;
  padding-right: 14px;
  cursor: pointer;
`

export const Select = ({
  options,
  defaultValue = 'Selecionar',
  label,
  onChange = () => {},
  isFull = false,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom
}: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [selected, setSelected] = useState(defaultValue)
  const [isFocused, setIsFocused] = useState(false)

  const toggleShow = () => setIsVisible(!isVisible)

  const closeWhenClickedOutside = (): void => {
    setIsVisible(false)
    setIsFocused(false)
  }

  const onOptionSelected = ({ value, text }: OptionProps) => () => {
    toggleShow()

    setSelected(text)
    onChange(value)
  }

  const whenFocus = () => setIsFocused(!isFocused)

  const hasOptionSelected = useMemo(() => 'Selecionar' !== selected, [selected])

  return (
    <Container
      isFull={isFull}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
    >
      {label && <Text onClick={whenFocus}>{label}</Text>}

      <Closeable whenClose={closeWhenClickedOutside}>
        <Selectable isVisible={isVisible || isFocused} onClick={toggleShow}>
          <Text fontSize={15} color="accent.700">
            {selected}
          </Text>

          <Icon name="down" width={8} color="accent.600" />
        </Selectable>

        <Options isVisible={isVisible}>
          {options.map(({ value, text }: OptionProps) => (
            <Option
              key={text}
              isSelected={text === selected}
              onClick={onOptionSelected({ value, text })}
            >
              <Text fontSize={15}>{text}</Text>
            </Option>
          ))}
        </Options>
      </Closeable>
    </Container>
  )
}
