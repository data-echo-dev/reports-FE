// @ts-nocheck
import Router from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import FormButton from '../Buttons/FormButton'

interface LoginData {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = (data: LoginData) => {
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
      <input
        id="email"
        className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
      <input
        id="password"
        className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-end mt-4">
        <div className="text-sm leading-5">
          <Link href="/reset-password">
            <a className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
              Forgot your password?
            </a>
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
