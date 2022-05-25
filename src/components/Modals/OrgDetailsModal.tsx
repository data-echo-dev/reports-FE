import React, { FC, useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
import { Organisation } from '../../app/types'
import { defaultOrganisation } from '../../app/fixtures/organisations'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { db } from '../../config/firebase'
import Toggle from '../common/toggle'
import Loading from '../common/loading'
import DeleteOrgButton from '../Buttons/DeleteOrgButton'
import { updateOrg } from '../../services/org'

interface Props {
  id: string
  children: React.ReactNode
}

const OrgDetailsModal: FC<Props> = ({ id, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [organisation, setOrganisation] = useState<Organisation>({
    id: '420',
    ...defaultOrganisation,
  })

  const { data, status, error } = useFirestoreQuery(
    db.collection('organisations').doc(id)
  )

  useEffect(() => {
    if (data) {
      console.log(data)

      setOrganisation(data)
    }
  }, [data])

  function handleNameChange(e) {
    const { value } = e.target
    setOrganisation({ ...organisation, name: value })
  }

  function handleToggleIsActive(e) {
    setOrganisation({ ...organisation, isActive: !organisation.isActive })
  }

  function handleSave() {
    updateOrg(organisation)
  }

  return (
    <>
      <div
        className="shadow-xl cursor-pointer card w-96 bg-base-100"
        onClick={onOpen}
      >
        {children}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Organisation Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data ? (
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="relative p-1 transition-all duration-500 border rounded ">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="name"
                        className="px-1 text-gray-600 bg-white"
                      >
                        ID
                      </label>
                    </div>
                    <input
                      id="name"
                      readOnly
                      autoComplete="false"
                      tabIndex={0}
                      type="text"
                      value={organisation.id}
                      className="block w-full h-full px-1 py-1 text-gray-900 outline-none cursor-not-allowed"
                    />
                  </div>
                  <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="lastname"
                        className="px-1 text-gray-600 bg-white"
                      >
                        Name
                      </label>
                    </div>
                    <input
                      id="lastname"
                      autoComplete="false"
                      tabIndex={0}
                      type="text"
                      onChange={handleNameChange}
                      value={organisation.name}
                      className="block w-full h-full px-1 py-1 outline-none"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-16">
                      <Toggle
                        name="Acitve"
                        label="Active"
                        checked={organisation.isActive}
                        onChange={handleToggleIsActive}
                      />
                    </div>
                    <DeleteOrgButton orgID={organisation.id} />
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
            <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
              Discard Changes
            </Button>
            <Button onClick={handleSave} colorScheme="blue">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OrgDetailsModal
