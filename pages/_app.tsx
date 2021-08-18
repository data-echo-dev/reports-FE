import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import Layout from '../components/Layout'

import '../styles/base.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
