// @ts-nocheck
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import Router from 'next/router'
import NProgress from 'nprogress'
import { AuthProvider } from '../hooks/useAuth'
import '../styles/nprogress.css'
import Layout from '../components/Layout'

import '../styles/style.scss'
import { theme } from '../styles/chakraTheme'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Head>
            <link rel="shortcut icon" href="/favicon.svg" />
            <title>DataEcho - Hear it speak</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
