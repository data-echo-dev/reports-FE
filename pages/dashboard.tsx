// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db, auth as otherAuth } from '../config/firebase'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

async function getReports(auth) {
  const reportsRef = db.collection('reports')
  // const reports = await reportsRef
  //   .where('organisation', '==', auth.user.organisation)
  //   .where('teacher', '==', auth.user.uid)
  //   .get()

  const reports = await reportsRef
    .where('roles', 'array-contains-any', auth.user.roles)
    .get()

  return reports.forEach((doc) => {
    console.log(doc.id, '=>', doc.data())
  })
}

// TODO: query reports where teacher = signed in user
// TODO: query reports where signed in user has a role that's allowed to view certain reports

const DashBoardPage: React.FC = () => {
  const [user, loading, error] = useAuthState(otherAuth)
  console.log(user)

  // useEffect(() => {
  //   if (auth?.user?.roles) {
  //     console.log(auth?.user?.roles)
  //     getReports(auth)
  //   }
  //   // return () => {
  //   //   cleanup
  //   // }
  // }, [auth])
  const auth = useRequireAuth()
  console.log(auth)
  getReports(auth)

  // useEffect(() => {
  //   const unsub = getReports(auth)

  //   return () => unsub()
  // }, [auth])
  // user && getReports(auth)
  if (!auth.user) return null
  // Votes Collection
  const [reports, reportsLoading, reportsError] = useCollection(
    db.collection('reports'),
    {}
  )
  // console.log(reports)

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
