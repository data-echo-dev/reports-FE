import { useRequireAuth } from '../hooks/useRequireAuth'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'

import ReportsGrid from '../components/Grids/ReportsGrid'
import { db } from '../config/firebase'
import PageTitle from '../components/PageTitle'
import ReportsFilter from '../components/ReportsFilter'
import { useState } from 'react'

const MyReports = () => {
  const auth = useRequireAuth()
  const [useFilter, setUseFilter] = useState(false)
  const [filterResult, setFilterResult] = useState([])
  const { data, status, error } = useFirestoreQuery(
    db.collection('reports').where('teacher', '==', auth.user?.uid)
  )

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
      </div>
    </div>
  )
}

export default MyReports

export async function getServerSideProps(context) {
  return { props: {} }
}
