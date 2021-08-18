// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import LinksGrid from '../components/Grids/LinksGrid'
import OrgsGrid from '../components/Grids/OrgsGrid'
import UsersGrid from '../components/Grids/UsersGrid'
import ReportsGrid from '../components/Grids/ReportsGrid'
import { db } from '../config/firebase'
import { useState } from 'react'
import Link from 'next/link'

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth()
  const [reports, setReports] = useState(null)
  const [users, setUsers] = useState(null)

  if (!auth.user) return null

  async function getReports(): void {
    const reportsRef = db.collection('reports')
    const reports = await reportsRef.get()

    setReports(reports)
    return reports.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
    })
  }

  async function getUsers(): void {
    const usersRef = db.collection('users')
    const users = await usersRef.get()

    setUsers(users)
    return users.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="relative w-full bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="h-screen w-80">
            <nav className="px-6 mt-10 ">
              <Link href={'/org-reports'}>
                <button
                  className="flex items-start w-full p-2 my-6 text-left text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                  // onClick={() => getOrgReports(auth)}
                  disabled={!auth}
                >
                  <span className="mx-4 text-lg font-normal">
                    Organisation Reports
                  </span>
                  <span className="flex-grow text-right"></span>
                </button>
              </Link>
              <Link href={'/my-reports'}>
                <button
                  className="flex items-center w-full p-2 my-6 text-gray-800 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-100 dark:bg-gray-600"
                  // onClick={() => getTeacherReports(auth)}
                  disabled={!auth}
                >
                  <span className="mx-4 text-lg font-normal">My Reports</span>
                  <span className="flex-grow text-right"></span>
                </button>
              </Link>
              {auth.user.isSuperAdmin && (
                <>
                  <Link href={'/org-management'}>
                    <button
                      className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                      // onClick={() => getOrgs()}
                    >
                      <span className="mx-4 text-lg font-normal">
                        Org Management
                      </span>
                      <span className="flex-grow text-right"></span>
                    </button>
                  </Link>
                  <button
                    className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                    onClick={() => getUsers()}
                  >
                    <span className="mx-4 text-lg font-normal">
                      User Management
                    </span>
                    <span className="flex-grow text-right"></span>
                  </button>
                  <button
                    className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                    onClick={() => getReports()}
                  >
                    <span className="mx-4 text-lg font-normal">
                      Report Management
                    </span>
                    <span className="flex-grow text-right"></span>
                  </button>
                </>
              )}
              <button
                className="flex items-center w-full p-2 my-6 text-red-800 transition-colors duration-200 rounded-lg hover:text-red-800 hover:bg-red-100 dark:hover:text-white dark:hover:bg-red-600 dark:text-red-100 dark:bg-red-600"
                onClick={() => auth.signOut()}
              >
                <span className="mx-4 text-lg font-normal">Sign Out</span>
                <span className="flex-grow text-right"></span>
              </button>
            </nav>
          </div>

          {/* <LinksGrid reportsData={reports} /> */}
          {/* <OrgsGrid orgsData={orgs} /> */}
          <UsersGrid usersData={users} />
          <ReportsGrid reportsData={reports} />
        </div>
      </div>
    </div>
  )
}
export default DashBoardPage
