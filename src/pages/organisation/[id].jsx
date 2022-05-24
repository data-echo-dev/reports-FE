import React, { useEffect, useState } from 'react'
import { CloudIcon } from '@heroicons/react/outline'
import { Button } from '@chakra-ui/react'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { db } from '../../config/firebase'
import PageTitle from '../../components/PageTitle'
import { updateOrg } from '../../services/org'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import Toggle from '../../components/common/toggle.tsx'

const SingleOrganisationPage = ({ params: { id } }) => {
  const auth = useRequireAuth()

  // state
  const [orgId, setOrgId] = useState('')
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState(false)

  // Subscribe to Firestore document
  const { data, status, error } = useFirestoreQuery(
    db.collection('organisations').doc(id)
  )

  // initialise form data
  useEffect(() => {
    if (data) {
      const { name: zita, id: organisationId, isActive: renamedIsActiveFFS } = data
      setName(zita)
      setOrgId(organisationId)
      setIsActive(renamedIsActiveFFS)
    }
  }, [data])

  if (status === 'loading') {
    return 'Loading...'
  }
  if (status === 'error') {
    return `Error: ${error.message}`
  }


  function handleNameChange(e) {
    const { value } = e.target
    setName(value)
  }

  function handleToggleIsActive(e){
    setIsActive(!isActive)
  }


  const consolidated = {
    id,
    name,
    isActive
  }


  if (!auth.user) return null

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <PageTitle text="Organisation Details" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative p-1 transition-all duration-500 border rounded ">
          <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
            <label htmlFor="name" className="px-1 text-gray-600 bg-white">
              ID
            </label>
          </div>
          <input
            id="name"
            readOnly
            autoComplete="false"
            tabIndex={0}
            type="text"
            value={orgId}
            className="block w-full h-full px-1 py-1 text-gray-900 outline-none cursor-not-allowed"
          />
        </div>
        <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
          <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
            <label htmlFor="lastname" className="px-1 text-gray-600 bg-white">
              Name
            </label>
          </div>
          <input
            id="lastname"
            autoComplete="false"
            tabIndex={0}
            type="text"
            onChange={handleNameChange}
            value={name}
            className="block w-full h-full px-1 py-1 outline-none"
          />
        </div>
      </div>
      <div className='w-16'>
        <Toggle label='Active' checked={isActive} onChange={handleToggleIsActive}/>
      </div>
      <div className="flex pt-3 mt-6 space-x-3 border-t">
        <Button
          type="button"
          onClick={() => updateOrg(consolidated)}
          colorScheme="teal"
          leftIcon={<CloudIcon className="w-5 h-5" />}
        >
          Update
        </Button>
      </div>
    </div>
  )
}

export default SingleOrganisationPage

export async function getServerSideProps(context) {
  const { params } = context

  return { props: { params } }
}
