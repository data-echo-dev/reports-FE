import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import ResetPasswordForm from '../components/forms/ResetPasswordForm'

const ResetPasswordPage = () => (
  <div className="flex flex-col justify-center w-full min-h-screen bg-primary-white">
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="mt-24 text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Reset password
        </h2>
        <p className="mt-2 text-center text-gray-600 text-md">
          {"Didn't forget? "}
          <Link href="/login">
            <Button variant="link" color="secondary.100">
              <a className="text-blue-500">Login</a>
            </Button>
          </Link>
        </p>
      </div>
      <div className="px-4 py-8 mt-8 bg-white shadow sm:rounded-lg sm:px-10">
        <ResetPasswordForm />
      </div>
    </div>
  </div>
)
export default ResetPasswordPage
