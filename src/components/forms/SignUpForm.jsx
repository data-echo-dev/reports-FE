import Router from 'next/router'
import { Input } from "@chakra-ui/react";
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import FormButton from '../Buttons/FormButton';


const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const auth = useAuth()
  const [isLoading, setIsLoading] = useState(false)


  const onSubmit = (data) => {
    setIsLoading(true)
    
    return auth.signUp(data).then((response) => {
      if (response.error) {
        setIsLoading(false)
        setError(response.error.message)
        return
      }
      Router.push('/my-reports')
    })
  }

  return (
    <form>
      {error && (
        <div className="p-2 mb-4 text-center text-red-500 border border-red-600 border-dashed rounded">
          <span>{error}</span>
        </div>
      )}
      <label
        htmlFor="name"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        Name
      </label>
      <Input
        id="name"
        className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
      />
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        Email address
      </label>
      <Input
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
      <Input
        id="password"
        className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <FormButton
          title='Sign Up'
          isLoading={isLoading}
            onClick={() => onSubmit({ name, email, password })}
          />
        </span>
      </div>{' '}
    </form>
  )
}

export default SignUpForm

