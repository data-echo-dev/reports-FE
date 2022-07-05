import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react'
import { TrashIcon } from '@heroicons/react/outline'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { deleteReport } from '../../services/report'
import NProgress from 'nprogress'

function DeleteOrgButton({ reportID }) {
  const toast = useToast()
  const auth = useRequireAuth()

  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  if (!auth.user) return null

  const handleDelete = async () => {
    NProgress.start()
    try {
      await deleteReport(reportID)
      toast({
        title: 'Delete Successful.',
        description: 'You successfully deleted the report',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
      NProgress.done()
      onClose()
    } catch (e) {
      toast({
        title: 'Failed to delete the report.',
        description:
          'A problem occurred whilst attempting to delete the report.',
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
              Delete Report
            </AlertDialogHeader>

            <AlertDialogBody>
              Delete this Report? <br />
              You cannot undo this action afterwards
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              {auth.user.isSuperAdmin && (
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
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

export default DeleteOrgButton
