import React from 'react'
import { db } from '../../config/firebase'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { useRequireAuth } from '../../hooks/useRequireAuth'

const SingleUser = ({ params: { id } }) => {
  const auth = useRequireAuth()

  // state

  // Subscribe to Firestore document
  const { data, status, error } = useFirestoreQuery(
    db.collection('users').doc(id)
  )
  console.log(data)

  return (
    <>
      <h1>user</h1>
      <div>{id}</div>
    </>
  )
}

export default SingleUser

export async function getServerSideProps(context) {
  const { params } = context

  console.log(params)
  return { props: { params } }
}
