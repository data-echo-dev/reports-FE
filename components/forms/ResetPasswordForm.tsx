// @ts-nocheck
import Router from 'next/router'
import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useAuth } from '../../hooks/useAuth'
import FormButton from '../Buttons/FormButton'

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const auth = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data: { email: string }) => {
    setIsLoading(true)
    auth.sendPasswordResetEmail(data.email).then(
      () => {
        Router.push('/login')
      },
      (error) => {
        setIsLoading(false)
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
          <FormButton
            title="Send reset link"
            isLoading={isLoading}
            onClick={() => onSubmit({ email })}
          />
        </span>
      </div>{' '}
    </form>
  )
}

export default ResetPasswordForm
