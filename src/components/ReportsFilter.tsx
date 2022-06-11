import React from 'react'
import { Interface } from 'readline'

interface FilterOptions {
  organization: boolean
  subject: boolean
  reportClass: boolean
  activeStatus: boolean
}

interface PropTypes {
  activeFilters: FilterOptions
}

const ReportsFilter = (props: PropTypes) => {
  const { activeFilters } = props
  const { organization, subject, reportClass, activeStatus } = activeFilters

  const data1 = [
    {
      id: 0,
      name: 'Option0',
      organization: 'org1',
      activeStatus: 'Active',
      reportClass: 'Class1' ,
      subject: 'Subject1'
    },
    {
      id: 1,
      name: 'Option1',
      organization: 'org2',
      activeStatus: 'Active',
      reportClass: 'Class2',
      subject: 'Subject2'
    },
    {
      id: 2,
      name: 'Option2',
      organization: 'org3',
      activeStatus: 'Active',
      reportClass: 'Class3',
      subject: 'Subject3'
    },
    {
      id: 3,
      name: 'Option3',
      organization: 'org4',
      activeStatus: 'Active',
      reportClass: 'Class4',
      subject: 'Subject5'
    },
    {
      id: 4,
      name: 'Option4',
      organization: 'org7',
      activeStatus: 'Not-Active',
      reportClass: 'Class5',
      subject: 'Subject6'
    },
    {
      id: 5,
      name: 'Option5',
      organization: 'org7',
      activeStatus: 'Active',
      reportClass: 'Class7',
      subject: 'Subject7'
    },
    {
      id: 6,
      name: 'Option6',
      organization: 'org7',
      activeStatus: 'Not-Active',
      reportClass: 'Class8',
      subject: 'Subject8'

    },
  ]

  const orgOptions = organization
    ? data1.reduce((prev, current, index) => {
        if (prev.find((item) => item === current.organization)) {
          return prev
        }
        return [...prev, current.organization]
      }, [])
    : []

  const activeStatusOpt = activeStatus
    ? data1.reduce((prev, current, index) => {
        if (prev.find((item) => item === current.activeStatus)) {
          return prev
        }
        return [...prev, current.activeStatus]
      }, [])
    : []


    const classOptions = reportClass
    ? data1.reduce((prev, current, index) => {
        if (prev.find((item) => item === current.reportClass)) {
          return prev
        }
        return [...prev, current.reportClass]
      }, [])
    : []


    const subjectOptions = subject
    ? data1.reduce((prev, current, index) => {
        if (prev.find((item) => item === current.subject)) {
          return prev
        }
        return [...prev, current.subject]
      }, [])
    : []

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
                autoComplete="false"
                tabIndex={0}
                //   value={organisationID}
                //   onChange={handleOrgChange}
                className="block w-full h-full px-1 py-1 text-gray-900 outline-none  bg-inherit"
              >
                {orgOptions?.map((org) => (
                  <option value={org} key={org}>
                    {org}
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
                autoComplete="false"
                tabIndex={0}
                //   value={organisationID}
                //   onChange={handleOrgChange}
                className="block w-full h-full px-1 py-1 text-gray-900 outline-none  bg-inherit"
              >
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
                autoComplete="false"
                tabIndex={0}
                //   value={organisationID}
                //   onChange={handleOrgChange}
                className="block w-full h-full px-1 py-1 text-gray-900 outline-none  bg-inherit"
              >
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
                autoComplete="false"
                tabIndex={0}
                //   value={organisationID}
                //   onChange={handleOrgChange}
                className="block w-full h-full px-1 py-1 text-gray-900 outline-none  bg-inherit"
              >
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
