import React from 'react'
import Link from 'next/link'
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

import DeleteOrgButton from '../Buttons/DeleteOrgButton'

const OrgsGrid = ({ orgsData }) => (
  <div className="flex items-center justify-center w-full h-full ">
    {orgsData.length > 0 && (
      <Table className='max-w-6xl' colorScheme='linkedin' variant="striped">
        <TableCaption>Organisations</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Roles</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orgsData.map((org) => (
            <Tr key={org.id}>
              <Td>{org.name}</Td>
              <Td>
                {org.roles?.map((role) => (
                  <Badge variant="subtle" colorScheme='messenger' className='mr-1' key={`${role}-your-boat`}>{role}</Badge>
                ))}
              </Td>
              <Td>
                <span className="flex items-center justify-start w-full space-x-2">
                  <Link href={`/organisation/${org.id}`}>
                    <Button size="sm" colorScheme="facebook">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-blue-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </Button>
                  </Link>
                  <DeleteOrgButton orgID={org.id} />
                </span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )}
  </div>
)

export default OrgsGrid
