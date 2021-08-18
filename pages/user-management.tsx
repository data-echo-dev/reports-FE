// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import { useEffect, useRef, useState } from 'react'
import UsersGrid from '../components/Grids/UsersGrid'

const UserManagement = () => {
  useEffect(() => {
    isMounted.current = true
    fetchData()
    // this is run when component unmount
    return () => (isMounted.current = false)
  }, [])

  // Create Ref
  const isMounted = useRef(false)
  // Create Your Required States
  const [users, setUsers] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const auth = useRequireAuth()

  if (!auth.user) return null
  // Create a function for fetching your data
  const fetchData = () => {
    const usersRef = db.collection('users')
    usersRef
      .get()
      .then((response) => {
        if (isMounted.current) {
          setUsers(response)
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
      <UsersGrid usersData={users} />
    </div>
  )
}

export default UserManagement
