import React from 'react'
// import '../../styles/grids.css'

const LinksGrid = ({reportsData}) => {

    let cleanedUp = []
    reportsData?.forEach((doc) => {
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
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">URL</th>
                <th className="p-3 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    cleanedUp.map((report) => (
                    <tr key={report.id} className="bg-gray-800">
                    <td className="p-3">
                        <div className="flex align-items-center">
                        <div className>{report.title}</div>
                        </div>
                    </td>
                    <td className="p-3">
                        {report.url}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                        <span className='flex items-center justify-center w-full'>
                            <a href={report.url} target='_blank' className="text-gray-400 hover:text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>                    
                            </a>
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

export default LinksGrid
