// @ts-nocheck
import React from 'react'
import { useRouter } from 'next/router'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { db } from '../../config/firebase'

const SingleOrganisationPage = ({ params: { id } }) => {
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

export async function getServerSideProps(context) {
  const { params } = context

  console.log(params)
  return { props: { params } }
}
