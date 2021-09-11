// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'

const SingleReport = ({ data }) => {
  const auth = useRequireAuth()
  if (!auth.user) return null
  // Create Ref
  const isMounted = useRef(false)

  return (
    <div
      className="w-screen h-screen"
      dangerouslySetInnerHTML={{ __html: `${data.url}` }}
    />
  )
}

export default SingleReport

// This gets called on every request
export async function getServerSideProps({ query }) {
  // Fetch data from external API
  const snapshot = await db.collection('reports').doc(query.id).get()
  const data = snapshot.data()
  console.log(data)
  return { props: { data } }
}
