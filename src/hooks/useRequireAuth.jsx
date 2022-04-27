import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from './useAuth'

export const useRequireAuth = () => {
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (auth.user == null) {
      router.push('/login')
    }
  }, [auth, router])

  return auth
}
