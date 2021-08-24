// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { db } from '../../config/firebase'

const SingleOrganisationPage = ({ params: { id } }) => {
  // Subscribe to Firestore document
  const [orgId, setOrgId] = useState('')
  const [name, setName] = useState('')
  const [roles, setRoles] = useState([])
  const { data, status, error } = useFirestoreQuery(
    db.collection('organisations').doc(id)
  )
  // Subscribe to Firestore stuffs
  const {
    data: reports,
    status: reportsStatus,
    error: reportsError,
  } = useFirestoreQuery(
    db.collection('reports').where('organisation', '==', id)
  )

  // initialise form data
  useEffect(() => {
    if (data) {
      const { name, id: orgId, roles } = data
      console.log(roles)
      setName(name)
      setOrgId(orgId)
      setRoles(roles)
    }
  }, [data])

  if (status === 'loading') {
    return 'Loading...'
  }
  if (status === 'error') {
    return `Error: ${error.message}`
  }

  console.log(data)
  console.log(reports)

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
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
            value={orgId}
            className="block w-full h-full px-1 py-1 text-gray-900 outline-none"
          />
        </div>
        <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
          <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
            <label htmlFor="lastname" className="px-1 text-gray-600 bg-white">
              Name
            </label>
          </div>
          <input
            id="lastname"
            autoComplete="false"
            tabIndex={0}
            type="text"
            value={name}
            className="block w-full h-full px-1 py-1 outline-none"
          />
        </div>
        {roles?.map((role, index) => (
          <div
            key={index}
            className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500"
          >
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="username" className="px-1 text-gray-600 bg-white">
                Role
              </label>
            </div>
            <input
              value={role}
              autoComplete="false"
              tabIndex={0}
              type="text"
              className="block w-full h-full px-1 py-1 outline-none"
            />
          </div>
        ))}
      </div>
      <div className="pt-3 mt-6 border-t">
        <button className="px-3 py-1 text-gray-100 transition-all duration-300 bg-blue-500 rounded hover:shadow-inner hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  )
}

export default SingleOrganisationPage

export async function getServerSideProps(context) {
  const { params } = context

  console.log(params)
  return { props: { params } }
}
