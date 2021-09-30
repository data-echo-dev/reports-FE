import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { TrashIcon } from '@heroicons/react/outline'
import { useRequireAuth } from '../../hooks/useRequireAuth'

function DeleteUserButton({ userID }) {
  const auth = useRequireAuth()

  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  // if (!auth.user) return null

  function deleteOan(oanID) {
    fetch(`/api/user/${oanID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <>
      <Button size="sm" colorScheme="red" onClick={() => setIsOpen(true)}>
        <TrashIcon className="w-5 h-5 text-red-200" />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Delete this User? <br />
              You can't undo this action afterwards
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              {auth.user.isSuperAdmin && (
                <Button
                  colorScheme="red"
                  onClick={() => deleteOan(userID)}
                  ml={3}
                >
                  Delete
                </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteUserButton
