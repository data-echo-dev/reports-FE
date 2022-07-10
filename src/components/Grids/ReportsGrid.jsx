import Link from 'next/link'
import React from 'react'
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'
import { ExternalLinkIcon, PencilIcon } from '@heroicons/react/outline'
import DeleteReportButton from '../Buttons/DeleteReportButton'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { OrganisationMapper } from '../../utils/organisationMapper'
import ReportDetailsModal from '../../components/Modals/ReportDetailsModal'

const ReportsGrid = ({ reportsData }) => {
  const auth = useRequireAuth()

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
                <Td>{OrganisationMapper(report.organisation)}</Td>
                <Td>
                  <span className="flex items-center justify-start w-full space-x-2">
                    {(auth.user.isSuperAdmin || auth.user.isEditor) && (
                      <>
                        <ReportDetailsModal
                          id={report.id}
                          isSuperAdmin={auth.user.isSuperAdmin}
                          orgId={auth.user.organisation}
                        >
                          <Button size="sm" colorScheme="facebook">
                            <PencilIcon className="w-5 h-5" />
                          </Button>
                        </ReportDetailsModal>
                        <DeleteReportButton reportID={report.id} />
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
