import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import UsersGrid from '../components/Grids/UsersGrid'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'
import PageTitle from '../components/PageTitle'
import ReportsFilter from '../components/ReportsFilter'
import { Fragment, useState } from 'react'


const UserManagement = () => {
  const auth = useRequireAuth()
  const [useFilter, setUseFilter] = useState(false)
  const [filterResult, setFilterResult] = useState([])
  const { data, status, error } = useFirestoreQuery(db.collection('users'))
  console.log(data)

  const filterOptions = {
    organization: true,
    subject: false,
    reportClass: false,
    activeStatus: false,
  }

  if (!auth.user) return null

  return (
    <div className="w-full">
      <PageTitle text="User Management" />
      <div className="flex flex-col justify-center">
        {data && (
          <Fragment>
            <div className="flex items-center justify-center w-full">
              <div className="mb-6 items-center  w-[848px]">
                <ReportsFilter
                  data={data}
                  setUseFilter={setUseFilter}
                  setFilterResult={setFilterResult}
                  activeFilters={filterOptions}
                />
              </div>
            </div>
            <UsersGrid usersData={useFilter ? filterResult : data} />
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default UserManagement
