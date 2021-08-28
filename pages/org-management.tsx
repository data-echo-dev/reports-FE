// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import OrgsGrid from '../components/Grids/OrgsGrid'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'
import { PlusIcon } from '@heroicons/react/outline'
import { addOrg } from '../CRUD/org'

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
      <button
        disabled={!auth.user}
        onClick={addOrg}
        className="px-3 py-1 text-gray-100 transition-all duration-300 bg-green-500 rounded hover:shadow-inner hover:bg-green-700"
      >
        <div className="flex">
          <PlusIcon className="w-6 h-6" />
          <span>Org</span>
        </div>
      </button>
      <OrgsGrid orgsData={data} />
    </div>
  )
}

export default OrgManagement
