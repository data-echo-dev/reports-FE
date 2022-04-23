import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import UsersGrid from '../components/Grids/UsersGrid'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'

const UserManagement = () => {
  const auth = useRequireAuth()
  const { data, status, error } = useFirestoreQuery(db.collection('users'))
  console.log(data)

  if (!auth.user) return null

  return (
    <div className="w-full">
      <PageTitle text="User Management" />
      <div className="flex flex-col justify-center">
        {data && (
          <UsersGrid usersData={data} />
        )}
      </div>
    </div>
  )
}

export default UserManagement
