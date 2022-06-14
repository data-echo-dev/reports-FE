import React, { useEffect, useState } from 'react'
import { Organisation, Report, User } from '../app/types'
import { db } from '../config/firebase'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'

type Data = Report[] | User[] | Organisation[]

interface FilterOptions {
  organization: boolean
  subject: boolean
  reportClass: boolean
  activeStatus: boolean
}

interface PropTypes {
  activeFilters: FilterOptions
  data: Data
  setUseFilter: React.Dispatch<React.SetStateAction<boolean>>
  setFilterResult: React.Dispatch<React.SetStateAction<Data>>
}

const ReportsFilter = (props: PropTypes) => {
  const { activeFilters, data, setUseFilter, setFilterResult } = props
  const { organization, subject, reportClass, activeStatus } = activeFilters
  const [inputValues, setInputValues] = useState({
    organisation: '',
    activeStatus: '',
    class: '',
    subject: '',
  })
  const {
    data: orgOptions,
    status: orgStatus,
    error: orgError,
  } = useFirestoreQuery(db.collection('organisations'))

  const reducibleData: any = data

  const activeStatusOpt = activeStatus
    ? reducibleData.reduce((prev, current, index) => {
        if (prev.find((item) => item === current.activeStatus)) {
          return prev
        }
        return [...prev, current.activeStatus]
      }, [])
    : []

  const classOptions = reportClass
    ? reducibleData.reduce((prev, current, index) => {
        if (prev.find((item) => item === current.reportClass)) {
          return prev
        }
        return [...prev, current.reportClass]
      }, [])
    : []

  const subjectOptions = subject
    ? reducibleData.reduce((prev, current, index) => {
        if (prev.find((item) => item === current.subject)) {
          return prev
        }
        return [...prev, current.subject]
      }, [])
    : []

  useEffect(() => {
    const updateParent = () => {
      let filtered = false
      let result = reducibleData
      if (
        !(
          inputValues.organisation === '' &&
          inputValues.activeStatus === '' &&
          inputValues.class === '' &&
          inputValues.subject === ''
        )
      ) {
        if (organization && inputValues.organisation !== '') {
          result = result.filter(
            (item) => item.organisation === inputValues.organisation
          )
        }
        if (activeStatus && inputValues.activeStatus !== '') {
          result = result.filter(
            (item) => item.isActive === inputValues.activeStatus
          )
        }
        if (reportClass && inputValues.class !== '') {
          result = result.filter(
            (item) => item.reportClass === inputValues.class
          )
        }
        if (subject && inputValues.subject !== '') {
          result = result.filter((item) => item.subject === inputValues.subject)
        }
        filtered = true
      }
      setFilterResult(result)
      setUseFilter(filtered)
    }
    updateParent()
  }, [inputValues])

  const handleChange = (e) => {
    const { id, value } = e.target
    setInputValues((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <div id="filterContainer">
      <p className="font-medium mb-6">Filters</p>
      <div id="filterSubcontainer" className="flex">
        {organization && (
          <div id="column" className="mr-3.5 w-40">
            <div className="relative p-1 transition-all duration-500 border  rounded">
              <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                <label htmlFor="org" className="px-1 text-gray-600 bg-inherit">
                  organization
                </label>
              </div>
              <select
                id="organisation"
                autoComplete="false"
                tabIndex={0}
                value={inputValues.organisation}
                onChange={handleChange}
                className="block w-full h-full px-1 py-1 text-gray-900 outline-none  bg-inherit"
              >
                <option value="" />
                {orgOptions?.map((org) => (
                  <option value={org.id} key={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {activeStatus && (
          <div id="column" className="mr-3.5 w-40">
            <div className="relative p-1 transition-all duration-500 border  rounded">
              <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                <label htmlFor="org" className="px-1 text-gray-600 bg-inherit">
                  active status
                </label>
              </div>
              <select
                id="activeStatus"
                autoComplete="false"
                tabIndex={0}
                value={inputValues.activeStatus}
                onChange={handleChange}
                className="block w-full h-full px-1 py-1 text-gray-900 outline-none  bg-inherit"
              >
                <option value="" />
                {activeStatusOpt?.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {reportClass && (
          <div id="column" className="mr-3.5 w-40">
            <div className="relative p-1 transition-all duration-500 border  rounded">
              <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                <label htmlFor="org" className="px-1 text-gray-600 bg-inherit">
                  {'class'}
                </label>
              </div>
              <select
                id="class"
                autoComplete="false"
                tabIndex={0}
                value={inputValues.class}
                onChange={handleChange}
                className="block w-full h-full px-1 py-1 text-gray-900 outline-none  bg-inherit"
              >
                <option value="" />
                {classOptions?.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {subject && (
          <div id="column" className="mr-3.5 w-40">
            <div className="relative p-1 transition-all duration-500 border  rounded">
              <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                <label htmlFor="org" className="px-1 text-gray-600 bg-inherit">
                  subject
                </label>
              </div>
              <select
                id="subject"
                autoComplete="false"
                tabIndex={0}
                value={inputValues.subject}
                onChange={handleChange}
                className="block w-full h-full px-1 py-1 text-gray-900 outline-none  bg-inherit"
              >
                <option value="" />
                {subjectOptions?.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportsFilter
