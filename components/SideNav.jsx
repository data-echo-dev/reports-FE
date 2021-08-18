import React from 'react'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'


const SideNav = () => {
    const auth = useAuth()

  if (!auth.user) return null
    
    return (
        <div className="flex min-h-screen bg-gray-200 w-80">
      <div className="relative bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="h-screen w-80">
            <nav className="px-6 mt-10 ">
              <Link href={'/org-reports'}>
                <button
                  className="flex items-start w-full p-2 my-6 text-left text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
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
                  disabled={!auth}
                >
                  <span className="mx-4 text-lg font-normal">My Reports</span>
                  <span className="flex-grow text-right"></span>
                </button>
              </Link>
              {auth.user.isSuperAdmin && (
                <>
                  <Link href={'/org-management'}>
                    <button className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 ">
                      <span className="mx-4 text-lg font-normal">
                        Org Management
                      </span>
                      <span className="flex-grow text-right"></span>
                    </button>
                  </Link>
                  <Link href={'/user-management'}>
                    <button className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 ">
                      <span className="mx-4 text-lg font-normal">
                        User Management
                      </span>
                      <span className="flex-grow text-right"></span>
                    </button>
                  </Link>
                  <Link href={'/report-management'}>
                    <button
                      className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                      // onClick={() => getReports()}
                    >
                      <span className="mx-4 text-lg font-normal">
                        Report Management
                      </span>
                      <span className="flex-grow text-right"></span>
                    </button>
                  </Link>
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

        </div>
      </div>
    </div>
    )
}

export default SideNav
