import React from 'react'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'

import SignUpForm from '../components/forms/SignUpForm'

const SignUpPage  = () => (
  <div className="flex flex-col justify-center w-full min-h-screen bg-primary-white">
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="mt-24 text-center">
        <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
          Sign up
        </h2>
        <p className="mt-2 text-center text-gray-600 text-md">
          already have an account?{' '}
          <Link href="/login">
            <Button variant="link" color="secondary.100">
              <a className="text-blue-500">Log in</a>
            </Button>
          </Link>
        </p>
      </div>
      <div className="px-4 py-8 mt-8 bg-white shadow sm:rounded-lg sm:px-10">
        <SignUpForm />
      </div>
    </div>
  </div>
)
export default SignUpPage
