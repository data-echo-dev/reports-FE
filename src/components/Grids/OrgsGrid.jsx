import React from 'react'
import Link from 'next/link'

import DeleteOrgButton from '../Buttons/DeleteOrgButton'
import { BanIcon, CheckIcon } from '@heroicons/react/outline'

const OrgsGrid = ({ orgsData }) => (
  <div className="grid grid-cols-4 gap-4 p-5">
    {orgsData.map((org) => (
      <div key={org.id} className="shadow-xl card w-96 bg-base-100">
          <div className="card-body">
          <div className="justify-between card-actions">
          <Link passHref href={`/organisation/${org.id}`}>
              <h2 className="cursor-pointer card-title">{org.name || 'No Name'}</h2>
          </Link>
            {org.isActive ? <CheckIcon className='w-6 h-6 text-green-900 bg-green-200 rounded-full'/> : <BanIcon className='w-6 h-6 text-red-900 bg-red-200 rounded-full'/>}
          </div>

            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            {/* <div className="justify-end card-actions">
                <DeleteOrgButton orgID={org.id} />
            </div> */}
          </div>
      </div>
    ))}
  </div>
)

export default OrgsGrid
