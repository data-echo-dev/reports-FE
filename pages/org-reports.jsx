import { useRequireAuth } from '../hooks/useRequireAuth'
import ReportsGrid from '../components/Grids/ReportsGrid'
import { db } from '../config/firebase'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'

const OrgReports = () => {
  const auth = useRequireAuth()

  const {
    data: organisations,
    status: statusOrgs,
    error: errorOrgs,
  } = useFirestoreQuery(db.collection('organisations'))
  const { data: reports, status, error } = useFirestoreQuery(
    db
      .collection('reports')
      .where('organisation', '==', auth.user.organisation)
      .where('roles', 'array-contains-any', auth.user.roles)
  )
  if (status === 'loading') {
    return null
  }
  if (status === 'error') {
    return `Error: ${error.message}`
  }

  console.log(reports)

  if (!auth.user) return null

  return (
    <div className="w-full">
      <PageTitle text="Organisation Reports" />

      <div className="flex flex-col justify-center">
        <ReportsGrid reportsData={reports} orgs={organisations} />
      </div>
    </div>
  )
}

export default OrgReports

export async function getServerSideProps(context) {
  return { props: {} }
}
