import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react"
import {TrashIcon} from '@heroicons/react/outline'

function DeleteOrgButton() {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
  
    return (
    <>
        <Button size='sm' colorScheme="red" onClick={() => setIsOpen(true)}>
          <TrashIcon className='w-5 h-5 text-red-200'/>
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Customer
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Delete this Organisation? <br/>You can't undo this action afterwards
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={onClose} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  export default DeleteOrgButton