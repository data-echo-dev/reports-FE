import { PlusIcon } from '@heroicons/react/outline'
import { Button } from '@chakra-ui/button'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import ReportsGrid from '../components/Grids/ReportsGrid'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'
import { addReport } from '../services/report'
import ReportsFilter from '../components/ReportsFilter'
import NewReportModal from '../components/Modals/NewReportModal'
import { useState } from 'react'

const ReportManagement = () => {
  const auth = useRequireAuth()
  const [useFilter, setUseFilter] = useState(false)
  const [filterResult, setFilterResult] = useState([])
 

  const { data: reports, status, error } = useFirestoreQuery(
    db.collection('reports')
  )

  if (status === 'loading') {
    return 'Loading...'
  }
  if (status === 'error') {
    return `Error: ${error.message}`
  }

  if (!auth.user) return null

  const filterOptions = {
    organization: true,
    subject: true,
    reportClass: true,
    activeStatus: false,
  }

  return (
    <div className="w-full">
      <PageTitle text="Report Management" />
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-center w-full">
          <div className="flex  mb-6 items-center justify-between max-w-6xl w-full">
            <ReportsFilter
              data={reports}
              setUseFilter={setUseFilter}
              setFilterResult={setFilterResult}
              activeFilters={filterOptions}
            />
            <NewReportModal>
            <Button
              disabled={!auth.user}
              leftIcon={<PlusIcon className="w-5 h-5" />}
              bgColor="#66CEF5"
              _hover={{ bg: '#339BC2' }}
              _active={{ bg: '#0082B3' }}
            >
              Report
            </Button>
            </NewReportModal>
          </div>
        </div>
        <ReportsGrid reportsData={useFilter ? filterResult : reports} />
      </div>
    </div>
  )
}

export default ReportManagement
