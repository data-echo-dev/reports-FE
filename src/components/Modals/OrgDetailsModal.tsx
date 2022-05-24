import React, { FC, useState } from 'react'
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

  console.log(data)

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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>yo</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OrgDetailsModal
