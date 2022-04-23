// @ts-nocheck
import { Badge, Button } from '@chakra-ui/react'
import { CloudIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import { db } from '../../config/firebase'
import { updateReport } from '../../CRUD/report'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { useRequireAuth } from '../../hooks/useRequireAuth'

const SingleReport = ({ params: { id } }) => {
  const auth = useRequireAuth()

  // state
  const [reportID, setReportID] = useState('')
  const [organisationID, setOrganisationID] = useState('')
  const [title, setTitle] = useState('')
  const [selectedRoles, setSelectedRoles] = useState([])
  const [availableRoles, setAvailableRoles] = useState([])
  const [teacherID, setTeacherID] = useState('')
  const [url, setUrl] = useState('')

  const consolidated = {
    reportID,
    organisationID,
    title,
    selectedRoles,
    teacherID,
    url,
  }

  const { data, status, error } = useFirestoreQuery(
    db.collection('reports').doc(id)
  )
  const {
    data: organisations,
    status: orgStatus,
    error: orgError,
  } = useFirestoreQuery(db.collection('organisations'))

  const {
    data: teachers,
    status: teachersStatus,
    error: teachersError,
  } = useFirestoreQuery(
    db.collection('users').where('organisation', '==', organisationID)
  )

  // init form data
  useEffect(() => {
    if (data) {
      console.log(data)
      const {
        // id,
        organisation,
        roles,
        teacher,
        title: databaseTitle,
        url: databaseUrl,
      } = data
      setReportID(id)
      setOrganisationID(organisationID || organisation)
      setTitle(title || databaseTitle)
      setSelectedRoles(roles)
      setTeacherID(teacher)
      console.log('teacher:', teacher)
      setUrl(url || databaseUrl)
    }

  }, [data])

  function handleOrgChange(e) {
    const { value } = e.target
    setOrganisationID(value)
  }

  function handleTeacherChange(e) {
    const { value } = e.target
    setTeacherID(value)
  }

  function handleURLChange(e) {
    const { value } = e.target
    setUrl(value)
  }

  function handleTitleChange(e) {
    const { value } = e.target
    setTitle(value)
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
                Title
              </label>
            </div>
            <input
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
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={teacherID }
              onChange={handleTeacherChange}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
            >
              {/* haha what an ugly hack, this is so the default selected item is an empty string, that way you're forced to trigger an onChange */}
              <option value=""/>
              {teachersStatus === 'success' &&
                teachers?.map((teacher) => (
                  <option value={teacher.uid}  key={teacher.uid}>
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
              autoComplete="false"
              tabIndex={0}
              type="text"
              value={url || ''}
              onChange={handleURLChange}
              className="block w-full h-full px-1 py-1 text-gray-900 outline-none"
            />
          </div>
          <div className="relative p-1 transition-all duration-500 border rounded ">
            <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="org" className="px-1 text-gray-600 bg-white">
                Available Roles
              </label>
            </div>
            <div className="absolute right-0 px-1 -mt-4 text-xs tracking-wider uppercase">
              <label htmlFor="org" className="px-1 text-gray-600 bg-white">
                Selected Roles
              </label>
            </div>
            <div className="flex justify-between">
              <div className="relative p-1 space-x-1 transition-all duration-500 border rounded ">
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
              <div className="relative p-1 space-x-1 transition-all duration-500 border rounded ">
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
          <Button
            colorScheme="teal"
            leftIcon={<CloudIcon className="w-5 h-5" />}
            type="button"
            onClick={() => updateReport(consolidated)}
          >
            Update
          </Button>
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
