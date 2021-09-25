import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import { db } from '../../config/firebase'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { useRequireAuth } from '../../hooks/useRequireAuth'

const SingleUser = ({ params: { id } }) => {
  const auth = useRequireAuth()

  // state
  const [userID, setUserID] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedRoles, setSelectedRoles] = useState([])
  const [availableRoles, setAvailableRoles] = useState([])
  const [organisationID, setOrganisationID] = useState('')

  const consolidated = {
    id: userID,
    name,
    email,
    roles: selectedRoles,
    organisation: organisationID,
  }

  // Subscribe to Firestore document + other queries
  const { data, status, error } = useFirestoreQuery(
    db.collection('users').doc(id)
  )
  const {
    data: organisations,
    status: orgStatus,
    error: orgError,
  } = useFirestoreQuery(db.collection('organisations'))
  console.log(data)

  // this query allows us to get roles of an org
  const {
    data: singleOrg,
    status: singleOrgStatus,
    error: singleOrgError,
  } = useFirestoreQuery(
    db.collection('organisations').where('id', '==', organisationID)
  )

  useEffect(() => {
    if (data) {
      const {
        email: databaseEmail,
        name: databaseName,
        organisation,
        roles,
      } = data
      setEmail(databaseEmail)
      setName(databaseName)
      setUserID(id)
      setOrganisationID(organisation)
      setSelectedRoles(roles)
    }

    if (singleOrg) {
      setAvailableRoles(singleOrg[0].roles)
    }
  })

  if (!auth.user) return null
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <PageTitle text="User Details" />
      {data && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative p-1 transition-all duration-500 border rounded ">
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="name" className="px-1 text-gray-600 bg-white">
                ID
              </label>
            </div>
            <input
              id="name"
              readOnly
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={userID}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none cursor-not-allowed"
            />
          </div>
          <div className="relative p-1 transition-all duration-500 border rounded ">
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="org" className="px-1 text-gray-600 bg-white">
                Organisation
              </label>
            </div>
            <select
              id="org"
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={organisationID}
              // onChange={handleOrgChange}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
            >
              {orgStatus === 'success' &&
                organisations?.map((org) => (
                  <option value={org.id} key={org.id}>
                    {org.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleUser

export async function getServerSideProps(context) {
  const { params } = context

  console.log(params)
  return { props: { params } }
}
