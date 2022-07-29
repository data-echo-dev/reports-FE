import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { User } from '../../app/types'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { db } from '../../config/firebase'
import Loading from '../common/loading'
import NProgress from 'nprogress'
import { defaultUser } from '../../app/fixtures/users'
import { updateUser } from '../../services/user'

interface Props {
  user: User
  children: React.ReactNode
}

const UserDetailsModal: FC<Props> = ({ user, children }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [newUser, setNewUser] = useState<User>({
    ...defaultUser,
  })

  const {
    data: organisations,
    status: orgStatus,
    error: orgError,
  } = useFirestoreQuery(db.collection('organisations'))

  useEffect(() => {
    if (user && isOpen) {
      setNewUser(user)
    }
  }, [user, isOpen])

  function handleChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const { id, value } = e.target
    setNewUser((currentUser) => ({ ...currentUser, [id]: value }))
  }

  function handleRoles(e: ChangeEvent<HTMLSelectElement>) {
    const { id, value } = e.target
    const bool = value === 'true' ? true : false
    setNewUser((currentUser) => ({ ...currentUser, [id]: bool }))
  }

  async function handleSave() {
    NProgress.start()
    setIsLoading(true)
    try {
      await updateUser(newUser)
      setIsLoading(false)
      toast({
        title: 'Update Successful.',
        description: 'You successfully updated the user',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
      NProgress.done()
      onClose()
    } catch (e) {
      setIsLoading(false)
      toast({
        title: 'Failed to update user.',
        description: 'A problem occurred whilst attempting to update the user.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
      NProgress.done()
      onClose()
    }
  }

  return (
    <>
      <div className="shadow-xl cursor-pointer" onClick={onOpen}>
        {children}
      </div>

      <Modal isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User Details</ModalHeader>
          <ModalCloseButton color="#FF0000" />
          <ModalBody>
            {user ? (
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="relative p-1 transition-all duration-500 border rounded ">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="id"
                        className="px-1 text-gray-600 bg-white"
                      >
                        ID
                      </label>
                    </div>
                    <input
                      id="id"
                      readOnly
                      autoComplete="false"
                      tabIndex={0}
                      type="text"
                      value={newUser.uid}
                      className="block w-full h-full px-1 py-1 text-gray-900 outline-none cursor-not-allowed"
                    />
                  </div>
                  <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="organisation"
                        className="px-1 text-gray-600 bg-white"
                      >
                        Organisation
                      </label>
                    </div>
                    <select
                      id="organisation"
                      autoComplete="false"
                      tabIndex={0}
                      value={newUser.organisation}
                      onChange={handleChange}
                      className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
                    >
                      {orgStatus === 'success' &&
                        organisations?.map((org) => (
                          <option value={org.id} key={org.id}>
                            {org.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="title"
                        className="px-1 text-gray-600 bg-white"
                      >
                        Name
                      </label>
                    </div>
                    <input
                      id="name"
                      autoComplete="false"
                      tabIndex={0}
                      type="text"
                      onChange={handleChange}
                      value={newUser.name}
                      className="block w-full h-full px-1 py-1 outline-none"
                    />
                  </div>
                  <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="class"
                        className="px-1 text-gray-600 bg-white"
                      >
                        Email
                      </label>
                    </div>
                    <input
                      id="email"
                      autoComplete="false"
                      tabIndex={0}
                      type="text"
                      onChange={handleChange}
                      value={newUser.email}
                      className="block w-full h-full px-1 py-1 outline-none"
                    />
                  </div>
                  <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="organisation"
                        className="px-1 text-gray-600 bg-white"
                      >
                        IsEditor
                      </label>
                    </div>
                    <select
                      id="isEditor"
                      autoComplete="false"
                      tabIndex={0}
                      value={newUser.isEditor?.toString()}
                      onChange={handleRoles}
                      className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
                    >
                      <option value={'false'}>False</option>
                      <option value={'true'}>True</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-20 mx-auto">
                <Loading />
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} className="text-primary-blue4">
              Discard Changes
            </Button>
            <Button
              isLoading={isLoading}
              bgColor="#66CEF5"
              _hover={{ bg: '#339BC2' }}
              _active={{ bg: '#0082B3' }}
              onClick={handleSave}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserDetailsModal
