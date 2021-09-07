// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { db } from '../../config/firebase'
import PageTitle from '../../components/PageTitle'
import { MinusCircleIcon, PlusIcon } from '@heroicons/react/outline'
import { updateOrg } from '../../CRUD/org'
import DeleteOrgButton from '../../components/Buttons/DeleteOrgButton'

// TODO: this page should have auth

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
      setName(name)
      setOrgId(orgId)
      setRoles(roles)
      console.log(roles)
    }
  }, [data])

  if (status === 'loading') {
    return 'Loading...'
  }
  if (status === 'error') {
    return `Error: ${error.message}`
  }

  function handleRoleChange(e): void {
    const value = e.target.value
    const updateIndex = Number(e.target.attributes.index.value)
    roles.splice(updateIndex, 1, value)
    // remember when Mitchell helped me with this line below that one time?
    setRoles([...roles])
  }

  function removeRole(data): void {
    const removeIndex = roles.findIndex((role) => role === data)
    const copy = roles
    copy.splice(removeIndex, 1)
    setRoles([...copy])
  }

  function handleNameChange(e): void {
    const value = e.target.value
    setName(value)
  }

  function addRole(): void {
    const rolesPlusOne = roles
    rolesPlusOne.push('')
    setRoles([...rolesPlusOne])
  }

  const consolidated = {
    id,
    name,
    roles,
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <PageTitle text="Organisation Details" />
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
            value={orgId}
            className="block w-full h-full px-1 py-1 text-gray-900 outline-none cursor-not-allowed"
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
            onChange={handleNameChange}
            value={name}
            className="block w-full h-full px-1 py-1 outline-none"
          />
        </div>
        {roles.map((role, index) => (
          <div key={index} className="flex">
            <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
              <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                <label
                  htmlFor="username"
                  className="px-1 text-gray-600 bg-white"
                >
                  Role {index + 1}
                </label>
              </div>
              <input
                index={index}
                value={role}
                onChange={handleRoleChange}
                autoComplete="false"
                tabIndex={0}
                type="text"
                className="block w-full h-full px-1 py-1 outline-none "
              />
            </div>
            <button type="button">
              <MinusCircleIcon
                index={index}
                onClick={() => removeRole(role)}
                className="w-6 h-6"
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex pt-3 mt-6 space-x-3 border-t">
        <button
          onClick={addRole}
          className="px-3 py-1 text-gray-100 transition-all duration-300 bg-green-500 rounded hover:shadow-inner hover:bg-green-700"
        >
          <div className="flex">
            <PlusIcon className="w-5 h-5" />
            <span>Role</span>
          </div>
        </button>
        <button
          onClick={() => updateOrg(consolidated)}
          className="px-3 py-1 text-gray-100 transition-all duration-300 bg-blue-500 rounded hover:shadow-inner hover:bg-blue-700"
        >
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
