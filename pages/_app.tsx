import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'

import '../styles/base.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
