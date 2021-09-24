// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react'
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    primary: {
      black: '#000000',
      blue: '#0082b3',
      white: '#F1F1F1',
    },
    secondary: {
      100: '#339bc2',
      200: '#66cef5',
      300: '#a3e2f9',
    },
  },
})

export { theme }
