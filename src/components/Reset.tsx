import { createGlobalStyle } from 'styled-components'
import { theme } from 'styled-tools'

export const Reset = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  body {
    width: 100%;
    height: 100vh;
    background-color: ${theme('colors.accent.250')};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  button,
  span,
  a,
  p,
  li {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
