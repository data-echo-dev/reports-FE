// @ts-nocheck
import Router from 'next/router'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const auth = useAuth()

  const onSubmit = (data: { email: string }) => {
    auth.sendPasswordResetEmail(data.email).then(
      () => {
        Router.push('/login')
      },
      (error) => {
        setError(error.message)
      }
    )
  }

  return (
    <form>
      {error && (
        <div className="p-2 mb-4 text-center text-red-500 border border-red-600 border-dashed rounded">
          <span>{error}</span>
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
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <button
            type="button"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
            onClick={() => onSubmit({ email })}
          >
            Send reset link
          </button>
        </span>
      </div>{' '}
    </form>
  )
}

export default ResetPasswordForm
