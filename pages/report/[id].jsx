// @ts-nocheck
import React, { useState } from 'react'
import PageTitle from '../../components/PageTitle'
import { db } from '../../config/firebase'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { useRequireAuth } from '../../hooks/useRequireAuth'

const SingleReport = ({ params: { id } }) => {
  const auth = useRequireAuth()

  // state
  const [reportID, setReportID] = useState('')
  const [organisationID, setOrganisationID] = useState('')
  const [title, setTitle] = useState('')
  const [roles, setRoles] = useState([])
  const [teacherID, setTeacherID] = useState('')
  const [url, setUrl] = useState('')

  const { data, status, error } = useFirestoreQuery(
    db.collection('reports').doc(id)
  )
  const {
    data: organisations,
    status: orgStatus,
    error: orgError,
  } = useFirestoreQuery(db.collection('organisations'))

  // TODO: firestore query for teachers. these are just users of a currently selected org. this will need a mapper function too.
  // the state that's in OrganisationID can be interpolated into the firestore query, that should re-render on org ID change
  // TODO: figure out the UX for roles on this page. these are also dependent on the selected org, as that's the source of truth for roles that can be assigned to a report.

  function organisationMapper(orgId) {
    if (orgStatus === 'success') {
      const theOrg = organisations?.find((org) => org.id === orgId)
      return theOrg.name
    }
  }

  console.log(orgStatus)

  if (!auth.user) return null
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <PageTitle text="Report Details" />
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
              value={id}
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
              value={organisationMapper(data.organisation) || ''}
              // value={data.organisation}
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
                Title
              </label>
            </div>
            <input
              id="org"
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={data.title}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
            />
          </div>
          <div className="relative p-1 transition-all duration-500 border rounded ">
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="org" className="px-1 text-gray-600 bg-white">
                Teacher
              </label>
            </div>
            <input
              id="org"
              readOnly
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={data.teacher}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none cursor-not-allowed"
            />
          </div>
          <div className="relative p-1 transition-all duration-500 border rounded ">
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="org" className="px-1 text-gray-600 bg-white">
                URL
              </label>
            </div>
            <textarea
              id="org"
              readOnly
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={data.url}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none cursor-not-allowed"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleReport

export async function getServerSideProps(context) {
  const { params } = context

  console.log(params)
  return { props: { params } }
}
