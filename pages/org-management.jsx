// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import OrgsGrid from '../components/Grids/OrgsGrid'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'
import { PlusIcon } from '@heroicons/react/outline'
import { addOrg } from '../CRUD/org'
import { Button } from '@chakra-ui/button'

const OrgManagement = () => {
  const auth = useRequireAuth()
  const { data, status, error } = useFirestoreQuery(
    db.collection('organisations')
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
      <PageTitle text="Organisation Management" />
      <div className='flex flex-col justify-center'>
        <span className='flex justify-end max-w-full md:mx-12 lg:mx-32 xl:mx-60'>

        <Button
          disabled={!auth.user}
          onClick={addOrg}
          colorScheme='facebook'
          leftIcon={<PlusIcon className='w-5 h-5'/>}
        >
            Org
        </Button>
        
        </span>
        <OrgsGrid orgsData={data} />
      </div>
    </div>
  )
}

export default OrgManagement
