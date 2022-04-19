import Router from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { Input, Button } from '@chakra-ui/react'
import { useAuth } from '../../hooks/useAuth'
import FormButton from '../Buttons/FormButton'


const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = (data) => {
    setIsLoading(true)
    setError(null)
    return auth.signIn(data).then((response) => {
      if (response.error) {
        setIsLoading(false)
        return setError(response.error)
      }
      setIsLoading(false)
      Router.push('/dashboard')
    })
  }

  return (
    <form>
      {error?.message && (
        <div className="p-2 mb-4 text-center text-red-500 border border-red-600 border-dashed rounded">
          <span>{error?.message}</span>
        </div>
      )}
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        Email address
      </label>
      <Input
        id="email"
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label
        htmlFor="password"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        Password
      </label>
      <Input
        id="password"
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-end mt-4">
        <div className="text-sm leading-5">
          <Link href="/reset-password">
          <Button variant="link" color="secondary.100">
            <a >
              Forgot your password?
            </a>
            </Button>

          </Link>
        </div>
      </div>
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <FormButton
            title="Login"
            isLoading={isLoading}
            onClick={() => onSubmit({ email, password })}
          />
        </span>
      </div>{' '}
    </form>
  )
}

export default LoginForm
