// @ts-nocheck
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Router from 'next/router'
import NProgress from 'nprogress'
import { AuthProvider } from '../hooks/useAuth'
import '../styles/nprogress.css'
import Layout from '../components/Layout'

import '../styles/base.css'
import { theme } from '../styles/chakraTheme'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
