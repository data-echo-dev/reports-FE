// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import { useEffect, useRef, useState } from 'react'
import ReportsGrid from '../components/Grids/ReportsGrid'

const ReportManagement = () => {
  useEffect(() => {
    isMounted.current = true
    fetchData()
    // this is run when component unmount
    return () => (isMounted.current = false)
  }, [])

  // Create Ref
  const isMounted = useRef(false)
  // Create Your Required States
  const [reports, setReports] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const auth = useRequireAuth()

  if (!auth.user) return null
  // Create a function for fetching your data
  const fetchData = () => {
    const reportsRef = db.collection('reports')
    reportsRef
      .get()
      .then((response) => {
        if (isMounted.current) {
          setReports(response)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        // check ref before updating state
        isMounted.current && setError(error)
      })
  }

  return (
    <div>
      <ReportsGrid reportsData={reports} />
    </div>
  )
}

export default ReportManagement
