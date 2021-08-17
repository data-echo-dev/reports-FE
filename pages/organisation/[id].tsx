// @ts-nocheck
import React from 'react'
import { useRouter } from 'next/router'

const SingleOrganisationPage = (context) => {
  const router = useRouter()
  const {
    query: { id },
  } = router
  console.log(id)

  return <div>hi</div>
}

export default SingleOrganisationPage
