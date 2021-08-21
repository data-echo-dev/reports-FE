// @ts-nocheck
import React from 'react'
import { useRouter } from 'next/router'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { db } from '../../config/firebase'

const SingleOrganisationPage = () => {
  const router = useRouter()
  const {
    query: { id },
  } = router
  console.log(id)

  // Subscribe to Firestore document
  const { data, status, error } = useFirestoreQuery(
    db.collection('organisations').doc(id)
  )
  // Subscribe to Firestore stuffs
  const {
    data: reports,
    status: reportsStatus,
    error: reportsError,
  } = useFirestoreQuery(
    db.collection('reports').where('organisation', '==', id)
  )

  if (status === 'loading') {
    return 'Loading...'
  }
  if (status === 'error') {
    return `Error: ${error.message}`
  }

  console.log(data)
  console.log(reports)

  return <div>hi</div>
}

export default SingleOrganisationPage
