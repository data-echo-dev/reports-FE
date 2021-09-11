import Link from 'next/link'
import React from 'react'
import {
  Button,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'

const ReportsGrid = ({ reportsData }) => (
  <div className="flex items-center justify-center w-full h-full ">
    {reportsData.length > 0 && (
      <Table className="max-w-6xl" colorScheme="facebook" variant="striped">
        <TableCaption>My Reports</TableCaption>
        <Thead>
          <Tr>
            <Th>Title</Th>
            {/* <Th >URL</Th> */}
            <Th>Organisation</Th>
            <Th>Roles</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reportsData.map((report) => (
            <Tr key={report.id}>
              <Td>
                <div>
                  <div>{report.title}</div>
                </div>
              </Td>
              {/* <Td >

                        {report.url}
                    </Td> */}
              <Td>{report.organisation}</Td>
              <Td>
                {report.roles?.map((role) => (
                  <span key={`${role}-your-boat`}>{role}</span>
                ))}
              </Td>
              <Td>
                <span className="flex items-center justify-center w-full">
                  <Link
                    href={{
                      pathname: '/report',
                      query: { id: `${report.id}` },
                    }}
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-auto text-gray-400 hover:text-gray-100 hover:cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )}
  </div>
)

export default ReportsGrid
