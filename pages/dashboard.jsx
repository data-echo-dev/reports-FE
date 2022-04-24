import React from 'react'
import { Badge, Center } from '@chakra-ui/layout'
import PageTitle from '../components/PageTitle'
import { db } from '../config/firebase'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import { useRequireAuth } from '../hooks/useRequireAuth'

const DashBoardPage = () => {
  const auth = useRequireAuth()

  const {
    data: organisations,
    status: statusOrgs,
    error: errorOrgs,
  } = useFirestoreQuery(db.collection('organisations'))

  function organisationMapper(id) {
    let theOrg = { name: 'Unassigned Organisation' }

    if (organisations) {
      const search = organisations.find(
        (organisation) => organisation.id === id
      )
      if (search) {
        theOrg = search
      }
    }
    return theOrg.name
  }

  if (!auth.user) return null
  return (
    <main className="w-full h-full">
      <PageTitle text="DataEcho Dashboard" />
      <Center>
        <div className="p-4 xl:w-1/3 md:w-1/2">
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="inline-flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-secondary-100 text-secondary-300">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
            </div>
            <h2 className="mb-2 text-lg font-medium text-gray-900 title-font">
              {auth?.user?.name}
            </h2>
            <p>{auth?.user?.email}</p>
            <p>{organisationMapper(auth?.user?.organisation)}</p>
          </div>
        </div>
      </Center>
    </main>
  )
}
export default DashBoardPage
