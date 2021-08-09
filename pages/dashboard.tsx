// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import LinksGrid from '../components/Grids/LinksGrid'
import OrgsGrid from '../components/Grids/OrgsGrid'
import { db } from '../config/firebase'
import { useState } from 'react'

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth()
  const [reports, setReports] = useState(null)
  const [orgs, setOrgs] = useState(null)

  if (!auth.user) return null
  console.log(auth.user)

  async function getTeacherReports(auth): void {
    const reportsRef = db.collection('reports')
    const reportsTeacher = await reportsRef
      .where('organisation', '==', auth.user.organisation)
      .where('teacher', '==', auth.user.uid)
      .get()
    setReports(reportsTeacher)
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

    setReports(reportsOrg)
    return reportsOrg.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
    })
  }
  async function getOrgs(): void {
    const orgsRef = db.collection('organisations')
    const orgs = await orgsRef.get()

    setOrgs(orgs)
    return orgs.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
    })
  }

  async function getUsers(): void {
    const usersRef = db.collection('users')
    const users = await usersRef.get()

    return users.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="relative w-screen bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="h-screen w-80">
            <nav className="px-6 mt-10 ">
              <button
                className="flex items-start w-full p-2 my-6 text-left text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                onClick={() => getOrgReports(auth)}
                disabled={!auth}
              >
                <span className="mx-4 text-lg font-normal">
                  Organisation Reports
                </span>
                <span className="flex-grow text-right"></span>
              </button>
              <button
                className="flex items-center w-full p-2 my-6 text-gray-800 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-100 dark:bg-gray-600"
                onClick={() => getTeacherReports(auth)}
                disabled={!auth}
              >
                <span className="mx-4 text-lg font-normal">My Reports</span>
                <span className="flex-grow text-right"></span>
              </button>
              {auth.user.isSuperAdmin && (
                <>
                  <button
                    className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                    onClick={() => getOrgs()}
                  >
                    <span className="mx-4 text-lg font-normal">
                      Org Management
                    </span>
                    <span className="flex-grow text-right"></span>
                  </button>
                  <button
                    className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                    onClick={() => getUsers()}
                  >
                    <span className="mx-4 text-lg font-normal">
                      User Management
                    </span>
                    <span className="flex-grow text-right"></span>
                  </button>
                  <a
                    className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                    href="#"
                  >
                    <span className="mx-4 text-lg font-normal">
                      Report Management
                    </span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </>
              )}
            </nav>
          </div>

          <LinksGrid reportsData={reports} />
          <OrgsGrid orgsData={orgs} />
        </div>
      </div>

      {/* <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
            {auth.user.isSuperAdmin && <button>Things</button>}
          </div>
          <button
            onClick={() => auth.signOut()}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          >
            Sign out
          </button>
        </div>
      </div> */}
    </div>
  )
}
export default DashBoardPage
