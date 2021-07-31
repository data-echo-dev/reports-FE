import { useRequireAuth } from '../hooks/useRequireAuth'
const DashBoardPage: React.FC = () => {
  // why won't useRequireAuth push an unlogged in user to the login page?
  const auth = useRequireAuth()
  if (!auth.user) return null

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-24 text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            {`Welcome ${auth.user.name}!`}
          </h2>
          <p className="mt-2 text-center text-gray-600 text-md">
            {`You are logged in with ${auth.user.email}`}
          </p>
          <button
            onClick={() => auth.signOut()}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
export default DashBoardPage
