import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import Layout from '../components/Layout'
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/base.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
