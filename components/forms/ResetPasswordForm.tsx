// @ts-nocheck
import Router from 'next/router'
import { useState } from 'react'
import { Button, Input } from '@chakra-ui/react'
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
      <Input
        id="email"
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <Button
            type="button"
            bgColor="primary.blue"
            className="opacity-80 hover:text-primary-blue"
            isFullWidth
            color="primary.white"
            onClick={() => onSubmit({ email })}
          >
            Send reset link
          </Button>
        </span>
      </div>{' '}
    </form>
  )
}

export default ResetPasswordForm
