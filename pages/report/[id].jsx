// @ts-nocheck
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import { db } from '../../config/firebase'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { useRequireAuth } from '../../hooks/useRequireAuth'

  // TODO: figure out the UX for roles on this page. these are also dependent on the selected org, as that's the source of truth for roles that can be assigned to a report.


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

  const { data: teachers, status: teachersStatus, error: teachersError} = useFirestoreQuery(db.collection('users').where('organisation', '==', organisationID))
  console.log(organisationID);
  console.log(teachers);

  // init form data
  useEffect(() => {
    if (data) {
      console.log(data);
      const {id, organisation, roles, teacher, title, url} = data
      setReportID(id)
      setOrganisationID(organisation)
      setTitle(title)
      setRoles(roles)
      setTeacherID(teacher)
      setUrl(url)
    }
  }, [data])

  
  function handleOrgChange(e){
    const { value } = e.target
    setOrganisationID(value)
  }
  
  function handleTeacherChange(e){
    const { value } = e.target
    setTeacherID(value)
  }
  
  function handleURLChange(e){
    const { value } = e.target
    setUrl(value)
  }
  
  function handleTitleChange(e){
    const { value } = e.target
    setTitle(value)
  }

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
              value={reportID}
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
              value={organisationID || ''}
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
                Title
              </label>
            </div>
            <input
              id="org"
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
            />
          </div>
          <div className="relative p-1 transition-all duration-500 border rounded ">
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="org" className="px-1 text-gray-600 bg-white">
                Teacher
              </label>
            </div>
            <select
              id="org"
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={teacherID || ''}
              onChange={handleTeacherChange}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
            >
              {teachersStatus === 'success' &&
                teachers?.map((teacher) => (
                  <option value={teacher.uid} key={teacher.uid}>
                    {teacher.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="relative p-1 transition-all duration-500 border rounded ">
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="org" className="px-1 text-gray-600 bg-white">
                URL
              </label>
            </div>
            <textarea
              id="org"
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={url || ''}
              onChange={handleURLChange}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none"
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
