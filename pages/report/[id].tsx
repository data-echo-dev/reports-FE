// @ts-nocheck
import React from 'react'
import { db } from '../../config/firebase'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { useRequireAuth } from '../../hooks/useRequireAuth'

const SingleReport = ({ params: { id } }) => {
  const auth = useRequireAuth()
  const { data, status, error } = useFirestoreQuery(
    db.collection('reports').doc(id)
  )

  console.log(data);

  
  
  
  if (!auth.user) return null
  return <div></div>
}

export default SingleReport

export async function getServerSideProps(context) {
  const { params } = context

  console.log(params)
  return { props: { params } }
}