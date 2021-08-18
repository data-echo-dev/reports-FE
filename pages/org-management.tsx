// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import { useEffect, useRef, useState } from 'react'
import OrgsGrid from '../components/Grids/OrgsGrid'

const OrgManagement = () => {
  useEffect(() => {
    isMounted.current = true
    fetchData()
    // this is run when component unmount
    return () => (isMounted.current = false)
  }, [])

  // Create Ref
  const isMounted = useRef(false)
  // Create Your Required States
  const [orgs, setOrgs] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const auth = useRequireAuth()

  if (!auth.user) return null
  // Create a function for fetching your data
  const fetchData = () => {
    const orgsRef = db.collection('organisations')
    orgsRef
      .get()
      .then((response) => {
        if (isMounted.current) {
          setOrgs(response)
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
      <OrgsGrid orgsData={orgs} />
    </div>
  )
}

export default OrgManagement
