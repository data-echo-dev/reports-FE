import { useAuth } from '../hooks/useAuth'
const DashBoardPage: React.FC = () => {
  const auth = useAuth()
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
        </div>
      </div>
    </div>
  )
}
export default DashBoardPage
