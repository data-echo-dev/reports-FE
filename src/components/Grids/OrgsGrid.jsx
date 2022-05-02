import React from 'react'
import Link from 'next/link'
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

import { PencilIcon } from '@heroicons/react/outline'
import DeleteOrgButton from '../Buttons/DeleteOrgButton'

const OrgsGrid = ({ orgsData }) => (
  <div className="flex items-center justify-center w-full h-full ">
    {orgsData.length > 0 && (
      <Table className="max-w-6xl" colorScheme="facebook" variant="striped">
        <TableCaption>Organisations</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Actions</Th>
            <Th>Active</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orgsData.map((org) => (
            <Tr key={org.id}>
              <Td>{org.name}</Td>
              <Td>
                <span className="flex items-center justify-start w-full space-x-2">
                  <Link passHref href={`/organisation/${org.id}`}>
                    <Button size="sm" colorScheme="facebook">
                      <PencilIcon className="w-5 h-5 text-blue-300" />
                    </Button>
                  </Link>
                  <DeleteOrgButton orgID={org.id} />
                </span>
              </Td>
              <Td>{JSON.stringify(org.isActive)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )}
  </div>
)

export default OrgsGrid
