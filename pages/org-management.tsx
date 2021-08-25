// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import OrgsGrid from '../components/Grids/OrgsGrid'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'

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
      <OrgsGrid orgsData={data} />
    </div>
  )
}

export default OrgManagement
