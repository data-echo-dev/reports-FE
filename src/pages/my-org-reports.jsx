import { PlusIcon } from '@heroicons/react/outline'
import { Button } from '@chakra-ui/button'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import ReportsGrid from '../components/Grids/ReportsGrid'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'
import { Alert, AlertIcon } from '@chakra-ui/react'
import ReportsFilter from '../components/ReportsFilter'
import NewReportModal from '../components/Modals/NewReportModal'
import { useState } from 'react'
import { defaultUser } from '../app/fixtures/users'
import PageSubtitle from '../components/PageSubtitle'
import { defaultOrganisation } from '../app/fixtures/organisations'

const EditorReportManagement = () => {
  const auth = useRequireAuth()
  const [useFilter, setUseFilter] = useState(false)
  const [filterResult, setFilterResult] = useState([])

  const user = auth.user?.uid ? auth.user : defaultUser

  console.log(user)
  // const user =  defaultUser

  const { data: reports, status, error } = useFirestoreQuery(
    db.collection('reports').where('organisation', '==', user.organisation)
  )

  const {
    data: organisations,
    status: orgStatus,
    error: orgError,
  } = useFirestoreQuery(
    db.collection('organisations').where('id', '==', user.organisation)
  )

  const org = !organisations ? defaultOrganisation : organisations[0] ?? ''

  if (status === 'loading') {
    return 'Loading...'
  }
  if (status === 'error') {
    return `Error: ${error.message}`
  }

  if (!auth.user) return null

  const filterOptions = {
    organization: false,
    subject: true,
    reportClass: true,
    activeStatus: false,
  }

  return (
    <div className="w-full">
      <PageTitle text="Report Management" />
      <PageSubtitle text={org.name} />
      <div className="flex flex-col justify-center">
        {!(
          user.isSuperAdmin ||
          (user.isEditor && org.isActive)
        ) ? (
          organisations[0]?.isActive ? (
            <Alert className="max-w-lg mx-auto" status="error">
              <AlertIcon />
              You are not authorised to view this page, please contact your
              Administration department
            </Alert>
          ) : (
            <Alert className="max-w-lg mx-auto" status="warning">
              <AlertIcon />
              Your organisation is currently Inactive, please contact your
              Administration department
            </Alert>
          )
        ) : (
          <>
            <div className="flex items-center justify-center w-full">
              <div className="flex  mb-6 items-center justify-between max-w-6xl w-full">
                <ReportsFilter
                  data={reports}
                  setUseFilter={setUseFilter}
                  setFilterResult={setFilterResult}
                  activeFilters={filterOptions}
                />
                <NewReportModal isSuperAdmin={user.isSuperAdmin} orgId={user.organisation}>
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
          </>
        )}
      </div>
    </div>
  )
}

export default EditorReportManagement
