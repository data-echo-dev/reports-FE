import React from 'react'
import Link from 'next/link'

const OrgsGrid = ({orgsData}) => {
    
    return (
        <div className="flex items-center justify-center w-full h-full bg-gray-600">
    <div className="col-span-12">
      <div className="overflow-auto lg:overflow-visible ">
          {orgsData.length > 0 && (
            <table className="table space-y-6 text-sm text-gray-400 border-separate">
            <thead className="text-gray-500 bg-gray-800">
                <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Roles</th>
                </tr>
            </thead>
            <tbody>
                {
                    orgsData.map((org) => (
                    <tr key={org.id} className="bg-gray-800">
                    <td className="p-3">
                        <div className="flex align-items-center">
                        <div >{org.name}</div>
                        </div>
                    </td>
                    <td className="p-3">
                        {org.roles?.map((role) => <span key={`${role}-your-boat`}>{role}</span>)}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                        <span className='flex items-center justify-center w-full'>
                            <Link href={`/organisation/${org.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </Link>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </span>
                    </td>
                    </tr>
                    ))
                }
            </tbody>
            </table>
          )}
      </div>
    </div>
  </div>
    )
}

export default OrgsGrid
