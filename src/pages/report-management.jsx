import { PlusIcon } from '@heroicons/react/outline'
import { Button } from '@chakra-ui/button'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import ReportsGrid from '../components/Grids/ReportsGrid'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'
import { addReport } from '../services/report'

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

  if (!auth.user) return null

  return (
    <div className="w-full">
      <PageTitle text="Report Management" />
      <div className="flex flex-col justify-center">
        <span className="flex justify-end max-w-full md:mx-12 lg:mx-32 xl:mx-60">
          <Button
            disabled={!auth.user}
            onClick={addReport}
            colorScheme="facebook"
            leftIcon={<PlusIcon className="w-5 h-5" />}
          >
            Report
          </Button>
        </span>
        <ReportsGrid reportsData={reports} />
      </div>
    </div>
  )
}

export default ReportManagement
