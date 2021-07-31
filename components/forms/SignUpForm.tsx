import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '../../config/firebase'

interface SignUpData {
  name: string
  email: string
  password: string
}

const signUp = ({ name, email, password }) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      return { error }
    })
}

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = (data: SignUpData) => {
    return signUp(data).then((user) => {
      console.log(user)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="name"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        Name
      </label>
      <input
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
            type="submit"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
            onClick={() => onSubmit({ name, email, password })}
          >
            Sign up
          </button>
        </span>
      </div>{' '}
    </form>
  )
}

export default SignUpForm

{
  /* <div className="rounded-md shadow-sm">
  <label
    htmlFor="name"
    className="block text-sm font-medium leading-5 text-gray-700"
  >
    Name
  </label>
  <input
    id="name"
    className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
    type="text"
    {...register('name')}
  />
  {errors.password && (
    <div className="mt-2 text-xs text-red-600">
      {errors.password.message}
    </div>
  )}
</div>
<div className="mt-6">
  <label
    htmlFor="email"
    className="block text-sm font-medium leading-5 text-gray-700"
  >
    Email address
  </label>
  <div className="mt-1 rounded-md shadow-sm">
    <input
      id="email"
      className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
      type="email"
      {...register('email')}
    />
    {errors.email && (
      <div className="mt-2 text-xs text-red-600">
        {errors.email.message}
      </div>
    )}
  </div>
</div>
<div className="mt-6">
  <label
    htmlFor="password"
    className="block text-sm font-medium leading-5 text-gray-700"
  >
    Password
  </label>
  <div className="mt-1 rounded-md shadow-sm">
    <input
      id="password"
      className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
      type="password"
      {...register('password')}
    />
    {errors.password && (
      <div className="mt-2 text-xs text-red-600">
        {errors.password.message}
      </div>
    )}
  </div>
</div>
<div className="mt-6">
  <span className="block w-full rounded-md shadow-sm">
    <button
      type="submit"
      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
    >
      Sign up
    </button>
  </span>
</div> */
}
