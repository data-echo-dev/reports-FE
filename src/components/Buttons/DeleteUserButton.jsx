import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Button,
} from '@chakra-ui/react'
import { TrashIcon } from '@heroicons/react/outline'
import NProgress from 'nprogress'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { deleteUser } from '../../services/user'

function DeleteUserButton({ userID }) {
  const auth = useRequireAuth()
  const toast = useToast()
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  if (!auth.user) return null

  async function deleteOan(oanID) {
    NProgress.start()
    try {
      await deleteUser(oanID)
      toast({
        title: 'Delete Successful.',
        description: 'You successfully deleted the user',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
      NProgress.done()
    } catch (e) {
      toast({
        title: 'Failed to delete user.',
        description: 'A problem occurred whilst attempting to delete the user.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
      NProgress.done()
    }
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
              You cannot undo this action afterwards
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
