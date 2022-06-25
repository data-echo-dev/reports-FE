import { useRequireAuth } from '../hooks/useRequireAuth'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'

import ReportsGrid from '../components/Grids/ReportsGrid'
import { db } from '../config/firebase'
import PageTitle from '../components/PageTitle'
import ReportsFilter from '../components/ReportsFilter'
import { useEffect, useState } from 'react'

const MyReports = () => {
  const auth = useRequireAuth()
  const [useFilter, setUseFilter] = useState(false)
  const [filterResult, setFilterResult] = useState([])
  const [isOrgActive, setIsOrgActive] = useState(false)
  const { data, status, error } = useFirestoreQuery(
    db.collection('reports').where('teacher', '==', auth.user?.uid)
  )
  const {
    data: organisations,
    status: orgStatus,
    error: orgError,
  } = useFirestoreQuery(
    db.collection('organisations').where('id', '==', auth.user?.organisation)
  )

  useEffect(() => {
    organisations && organisations[0] && setIsOrgActive(organisations[0].isActive)
  }, [organisations])

  const filterOptions = {
    organization: false,
    subject: true,
    reportClass: true,
    activeStatus: false,
  }

  if (status === 'loading') {
    return null
  }
  if (status === 'error') {
    return `Error: ${error.message}`
  }

  if (!auth.user) return null

  return (
    <div className="w-full">
      <PageTitle text="My Reports" />
      <div className="flex flex-col justify-center">
        {isOrgActive ? (
          <>
            <div className="flex items-center justify-center w-full">
              <div className="flex  mb-6 items-center justify-between max-w-6xl w-full">
                <ReportsFilter
                  data={data}
                  setUseFilter={setUseFilter}
                  setFilterResult={setFilterResult}
                  activeFilters={filterOptions}
                />
              </div>
            </div>
            <ReportsGrid reportsData={useFilter ? filterResult : data} />
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            <p className="font-semibold mt-12">
              Your organization is currently Inactive, please contact your
              Administration department
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyReports

export async function getServerSideProps(context) {
  return { props: {} }
}
