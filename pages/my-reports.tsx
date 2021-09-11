// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'

import ReportsGrid from '../components/Grids/ReportsGrid'
import { db } from '../config/firebase'
import PageTitle from '../components/PageTitle'

const MyReports = () => {
  const auth = useRequireAuth()
  const { data, status, error } = useFirestoreQuery(
    db
      .collection('reports')
      // .where('organisation', '==', auth.user.organisation)
      .where('teacher', '==', auth.user?.uid)
  )
  if (status === 'loading') {
    return 'Loading...'
  }
  if (status === 'error') {
    return `Error: ${error.message}`
  }

  // useEffect(() => {
  //   isMounted.current = true
  //   fetchData()
  //   // this is run when component unmount
  //   return () => (isMounted.current = false)
  // }, [])

  // Create Ref
  // const isMounted = useRef(false)
  // Create Your Required States
  // const [reports, setReports] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState('')

  if (!auth.user) return null
  // Create a function for fetching your data
  // const fetchData = () => {
  //   const reportsRef = db.collection('reports')
  //   reportsRef
  //     .where('organisation', '==', auth.user.organisation)
  //     .where('teacher', '==', auth.user.uid)
  //     .get()
  //     .then((response) => {
  //       if (isMounted.current) {
  //         setReports(response)
  //         setIsLoading(false)
  //       }
  //     })
  //     .catch((error) => {
  //       // check ref before updating state
  //       isMounted.current && setError(error)
  //     })
  // }

  return (
    <div className="w-full">
      <PageTitle text="My Reports" />

      <div className="flex flex-col justify-center">
        <ReportsGrid reportsData={data} />
      </div>
    </div>
  )
}

export default MyReports
