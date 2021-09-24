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
import {
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { useRequireAuth } from '../../hooks/useRequireAuth'

const ReportsGrid = ({ reportsData, orgs }) => {
  const auth = useRequireAuth()

  function organisationMapper(id) {
    const theOrg = orgs.find((organisation) => organisation.id === id)
    // if (!theOrg) {
    //   return 'Unassigned'
    // }
    return theOrg.name
  }

  return (
    <div className="flex items-center justify-center w-full h-full ">
      {reportsData.length > 0 && (
        <Table className="max-w-6xl" colorScheme="facebook" variant="striped">
          <TableCaption>Reports</TableCaption>
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
                <Td>{organisationMapper(report.organisation)}</Td>
                <Td>
                  {report.roles?.map((role) => (
                    <Badge
                      variant="subtle"
                      colorScheme="messenger"
                      className="mr-1"
                      key={`${role}-your-boat`}
                    >
                      {role}
                    </Badge>
                  ))}
                </Td>
                <Td>
                  <span className="flex items-center justify-start w-full space-x-2">
                    {auth.user.isSuperAdmin && (
                      <>
                        <Link href={`/report/${report.id}`}>
                          <Button size="sm" colorScheme="facebook">
                            <PencilIcon className="w-5 h-5" />
                          </Button>
                        </Link>
                        <Button size="sm" colorScheme="red">
                          <TrashIcon className="w-5 h-5 text-red-200" />
                        </Button>
                      </>
                    )}
                    <Button size="sm" colorScheme="green" title="View Report">
                      <Link
                        href={{
                          pathname: '/report',
                          query: { id: `${report.id}` },
                        }}
                      >
                        <a>
                          <ExternalLinkIcon className="w-5 h-5" />
                        </a>
                      </Link>
                    </Button>
                  </span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  )
}

export default ReportsGrid
