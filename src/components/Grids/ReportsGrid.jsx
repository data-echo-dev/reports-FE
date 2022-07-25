import Link from 'next/link'
import React from 'react'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import ReportCard from '../Cards/ReportCard'

const ReportsGrid = ({ reportsData }) => {
  const auth = useRequireAuth()

  return (
    <>
      <div className="w-full h-full grid grid-cols-2 gap-4 py-5 px-8 lg:grid-cols-3 max-w-7xl lg:mx-auto">
        {reportsData.length > 0 &&
          reportsData.map((report, index) => (
            <ReportCard
              key={report.id}
              report={report}
              user={auth.user}
              className="w-96"
            />
          ))}
      </div>
      <div className="flex justify-center">
        <p className="mt-4">Reports</p>
      </div>
    </>
  )
}

export default ReportsGrid
