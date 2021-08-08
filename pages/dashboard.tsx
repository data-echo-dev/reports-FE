// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth()

  if (!auth.user) return null

  async function getTeacherReports(auth): void {
    const reportsRef = db.collection('reports')
    const reportsTeacher = await reportsRef
      .where('organisation', '==', auth.user.organisation)
      .where('teacher', '==', auth.user.uid)
      .get()
    return reportsTeacher.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
    })
  }

  async function getOrgReports(auth): void {
    const reportsRef = db.collection('reports')
    const reportsOrg = await reportsRef
      .where('organisation', '==', auth.user.organisation)
      .where('roles', 'array-contains-any', auth.user.roles)
      .get()

    return reportsOrg.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
    })
  }

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
          <div className="flex items-center justify-center">
            <button onClick={() => getOrgReports(auth)} disabled={!auth}>
              Org Links
            </button>
            <button onClick={() => getTeacherReports(auth)} disabled={!auth}>
              My Links
            </button>
          </div>
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
