import { useRequireAuth } from '../hooks/useRequireAuth'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'

import ReportsGrid from '../components/Grids/ReportsGrid'
import { db } from '../config/firebase'
import PageTitle from '../components/PageTitle'

const MyReports = () => {
  const auth = useRequireAuth()
  // console.log(fakeData);
  const {
    data: organisations,
    status: statusOrgs,
    error: errorOrgs,
  } = useFirestoreQuery(db.collection('organisations'))
  const { data, status, error } = useFirestoreQuery(
    db
      .collection('reports')
      // .where('organisation', '==', auth.user.organisation)
      .where('teacher', '==', auth.user?.uid)
  )
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
        <ReportsGrid reportsData={data} orgs={organisations} />
      </div>
    </div>
  )
}

export default MyReports

export async function getServerSideProps(context) {
  return { props: {} }
}
