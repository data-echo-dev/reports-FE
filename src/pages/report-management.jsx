import { PlusIcon } from '@heroicons/react/outline'
import { Button } from '@chakra-ui/button'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import ReportsGrid from '../components/Grids/ReportsGrid'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'
import { addReport } from '../services/report'
import ReportsFilter from '../components/ReportsFilter'

const ReportManagement = () => {
  const auth = useRequireAuth()

  const { data: reports, status, error } = useFirestoreQuery(
    db.collection('reports')
  )
  if (status === 'loading') {
    return 'Loading...'
  }
  if (status === 'error') {
    return `Error: ${error.message}`
  }

  if (!auth.user) return null; 


  const filterOptions = {
    organization: true,
    subject: true,
    reportClass: true,
    activeStatus: true,
  }

  return (
    <div className="w-full">
      <PageTitle text="Report Management" />
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-center w-full">
          <div className="flex  mb-6 items-center justify-between max-w-6xl w-full">
            <ReportsFilter activeFilters={filterOptions}/>
            <Button
              disabled={!auth.user}
              onClick={addReport}
              colorScheme="facebook"
              leftIcon={<PlusIcon className="w-5 h-5" />}
            >
              Report
            </Button>
          </div>
        </div>
        <ReportsGrid reportsData={reports} />
      </div>
    </div>
  )
}

export default ReportManagement
