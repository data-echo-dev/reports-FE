import React from 'react'
import { PencilIcon } from '@heroicons/react/outline'
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
import DeleteUserButton from '../Buttons/DeleteUserButton'

const UsersGrid = ({ usersData }) => {
  console.log(usersData)

  return (
    <div className="flex items-center justify-center w-full ">
      <div className="col-span-12">
        <div className="overflow-auto lg:overflow-visible ">
          {usersData.length > 0 && (
            <Table
              className="max-w-6xl"
              colorScheme="facebook"
              variant="striped"
            >
              <TableCaption>Users</TableCaption>

              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Organisation</Th>
                  <Th>Roles</Th>
                </Tr>
              </Thead>
              <Tbody>
                {usersData.map((user) => (
                  <Tr key={user.email}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.organisation ? user.organisation : ''}</Td>
                    <Td>
                      {user.roles
                        ? user.roles.map((role) => (
                            <Badge
                              variant="subtle"
                              colorScheme="messenger"
                              className="mr-1"
                              key={`${role}-your-boat`}
                            >
                              {role}
                            </Badge>
                          ))
                        : ''}
                    </Td>
                    <Td className="p-3 whitespace-nowrap">
                      <span className="flex items-center justify-center w-full space-x-2">
                        <Button size="sm" colorScheme="facebook">
                          <PencilIcon className="w-5 h-5" />
                        </Button>
                        <DeleteUserButton userID="as" />
                      </span>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}

export default UsersGrid
