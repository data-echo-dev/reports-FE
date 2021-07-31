import Router from 'next/router'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

interface LoginData {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useAuth()

  const onSubmit = (data: LoginData) => {
    return auth.signIn(data).then(() => {
      Router.push('/dashboard')
    })
  }

  return (
    <form>
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
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <button
            type="button"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
            onClick={() => onSubmit({ email, password })}
          >
            Login
          </button>
        </span>
      </div>{' '}
    </form>
  )
}

export default LoginForm
