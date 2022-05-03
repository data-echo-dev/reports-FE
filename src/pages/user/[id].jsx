import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import NProgress from 'nprogress'
import { CloudIcon } from '@heroicons/react/outline'
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
  const [organisationID, setOrganisationID] = useState('')

  const consolidated = {
    uid: userID,
    name,
    email,
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

  useEffect(() => {
    if (data) {
      const {
        email: databaseEmail,
        name: databaseName,
        organisation: databaseOrganisation,
      } = data

      setEmail(email || databaseEmail)
      setName(name || databaseName)
      setUserID(id)
      setOrganisationID(organisationID || databaseOrganisation)
    }

  }, [data])

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

  async function updateOan(oanId) {
    NProgress.start()
    await fetch(`/api/user/${oanId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consolidated),
    }).then((res) => {
      console.log(res.json())
      NProgress.done()
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
          <div className="relative p-1 transition-all duration-500 border rounded ">
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
          </div>
          <Button
            colorScheme="teal"
            leftIcon={<CloudIcon className="w-5 h-5" />}
            type="button"
            onClick={() => updateOan(userID)}
          >
            Update
          </Button>
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