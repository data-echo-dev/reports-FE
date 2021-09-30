import React, { useEffect, useState } from 'react'
import { Badge } from '@chakra-ui/react'
import PageTitle from '../../components/PageTitle'

import { db } from '../../config/firebase'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { updateUser } from '../../CRUD/user'

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
    uid: userID,
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
        organisation: databaseOrganisation,
        roles: databaseRoles,
      } = data

      setEmail(email || databaseEmail)
      setName(name || databaseName)
      setUserID(id)
      setOrganisationID(organisationID || databaseOrganisation)
      setSelectedRoles(databaseRoles || selectedRoles)
    }

    if (singleOrg) {
      setAvailableRoles(singleOrg[0].roles)
    }
  }, [data, singleOrg])

  function handleOrgChange(e) {
    const { value } = e.target
    setOrganisationID(value)
  }
  function handleNameChange(e) {
    const { value } = e.target
    setName(value)
  }
  function handleEmailChange(e) {
    const { value } = e.target
    setEmail(value)
  }
  function selectRole(e) {
    const value = e.target.textContent
    const currentlyActiveRoles = [...selectedRoles]

    if (!currentlyActiveRoles.includes(value)) {
      currentlyActiveRoles.push(value)
      setSelectedRoles([...currentlyActiveRoles])
    }
  }

  function deselectRole(e) {
    const value = e.target.textContent
    const currentlyActiveRoles = [...selectedRoles]

    const iHaveBeenRemoved = currentlyActiveRoles.filter(
      (role) => role !== value
    )
    setSelectedRoles([...iHaveBeenRemoved])
  }

  function updateOan(oanId) {
    fetch(`/api/user/${oanId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consolidated),
    })
  }
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
              onChange={handleOrgChange}
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
          <div className="relative p-1 transition-all duration-500 border rounded ">
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="org" className="px-1 text-gray-600 bg-white">
                Name
              </label>
            </div>
            <input
              id="org"
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={name}
              onChange={handleNameChange}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
            />
          </div>
          {/* TODO: figure out how to update user authentication email */}
          {/* <div className="relative p-1 transition-all duration-500 border rounded ">
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="org" className="px-1 text-gray-600 bg-white">
                Email
              </label>
            </div>
            <input
              id="org"
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
            />
          </div> */}
          <div className="relative p-1 transition-all duration-500 border rounded ">
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="org" className="px-1 text-gray-600 bg-white">
                Roles
              </label>
            </div>
            <div className="flex justify-between">
              <div className="relative p-1 transition-all duration-500 border rounded ">
                {availableRoles?.map((role, index) => (
                  <Badge
                    key={index}
                    className="cursor-pointer"
                    variant="solid"
                    type="button"
                    colorScheme="blue"
                    onClick={selectRole}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
              <div className="relative p-1 transition-all duration-500 border rounded ">
                {selectedRoles?.map((role, index) => (
                  <Badge
                    className="cursor-pointer"
                    onClick={deselectRole}
                    key={index}
                    variant="solid"
                    colorScheme="blue"
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {/* <button type="button" onClick={() => updateUser(consolidated)}>
            Update
          </button> */}
          <button type="button" onClick={() => updateOan(userID)}>
            Update
          </button>
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
