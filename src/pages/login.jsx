import React from 'react'
import { Button } from '@chakra-ui/react'

import Link from 'next/link'
import LoginForm from '../components/forms/LoginForm'

const LoginPage = () => (
  <div className="flex flex-col justify-center w-full min-h-screen bg-primary-white">
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="mt-24 text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Log in
        </h2>
        <p className="mt-2 text-center text-gray-600 text-md">
          {"Don't have an account? "}
          <Link passHref href="/signup">
            <Button variant="link" color="secondary.100">
              <a className="text-primary-blue4 hover:text-primary-blue3">
                Sign Up
              </a>
            </Button>
          </Link>
        </p>
      </div>
      <div className="px-4 py-8 mt-8 bg-white shadow sm:rounded-lg sm:px-10">
        <LoginForm />
      </div>
    </div>
  </div>
)
export default LoginPage
