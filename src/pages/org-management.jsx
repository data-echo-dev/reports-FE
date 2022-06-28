import { PlusIcon } from '@heroicons/react/outline'
import { Button } from '@chakra-ui/button'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import OrgsGrid from '../components/Grids/OrgsGrid'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'
import NewOrgModal from '../components/Modals/NewOrgModal'
import ReportsFilter from '../components/ReportsFilter'
import { useState } from 'react'

const OrgManagement = () => {
  const [useFilter, setUseFilter] = useState(false)
  const [filterResult, setFilterResult] = useState([])
  const auth = useRequireAuth()
  const { data, status, error } = useFirestoreQuery(
    db.collection('organisations')
  )

  const filterOptions = {
    organization: false,
    subject: false,
    reportClass: false,
    activeStatus: true,
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
      <PageTitle text="Organisation Management" />
      <div className="flex flex-col justify-center">
        <span className="flex justify-between max-w-full px-5">
          <ReportsFilter
            data={data}
            setUseFilter={setUseFilter}
            setFilterResult={setFilterResult}
            activeFilters={filterOptions}
          />
          <NewOrgModal>
            <Button
              disabled={!auth.user}
              leftIcon={<PlusIcon className="w-5 h-5" />}
              bgColor="#66CEF5"
              _hover={{ bg: '#339BC2' }}
              _active={{ bg: '#0082B3' }}
            >
              Org
            </Button>
          </NewOrgModal>
        </span>
        <OrgsGrid orgsData={useFilter ? filterResult : data} />
      </div>
    </div>
  )
}

export default OrgManagement
