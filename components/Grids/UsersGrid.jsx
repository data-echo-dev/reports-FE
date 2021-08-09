import React from 'react'

const UsersGrid = ({usersData}) => {
    let cleanedUp = []
    usersData?.forEach((doc) => {
        cleanedUp.push(doc.data())
      })
    console.log(cleanedUp);

    
    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-900">
    <div className="col-span-12">
      <div className="overflow-auto lg:overflow-visible ">
          {cleanedUp.length > 0 && (
            <table className="table space-y-6 text-sm text-gray-400 border-separate">
            <thead className="text-gray-500 bg-gray-800">
                <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Organisation</th>
                <th className="p-3 text-left">Roles</th>
                </tr>
            </thead>
            <tbody>
                {
                    cleanedUp.map((user) => (
                    <tr key={user.uid} className="bg-gray-800">
                    <td className="p-3">
                        {user.name}
                    </td>
                    <td className="p-3">
                        {user.email}
                    </td>
                    <td className="p-3">
                        {user.organisation ? user.organisation : ''}
                    </td>
                    <td className="p-3">
                        {user.roles ? user.roles.map((role) => <span key={`${role}-your-boat`}>{role}</span>) : ''}
                    </td>
                    {/* <td className="p-3 whitespace-nowrap">
                        <span className='flex items-center justify-center w-full'>
                            <a href={user.url} target='_blank' className="text-gray-400 hover:text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>                    
                            </a>
                        </span>
                    </td> */}
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

export default UsersGrid
