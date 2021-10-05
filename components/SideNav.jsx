import React from 'react'
import Link from 'next/link'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { useAuth } from '../hooks/useAuth'

const SideNav = () => {
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  if (!auth.user) return null

  return (
    <span className="absolute top-0 m-4">
      <Button
        ref={btnRef}
        bgColor="primary.blue"
        className="opacity-80"
        onClick={onOpen}
      >
        <MenuIcon className="w-5 h-5 text-primary-black" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Quick Links</DrawerHeader>

          <DrawerBody>
            <nav>
              <Link href="/my-reports">
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={onClose}
                  disabled={!auth}
                  isFullWidth
                  className="text-left"
                  colorScheme="blue"
                >
                  <span className="my-4">My Reports</span>
                  <span className="flex-grow text-right" />
                </Button>
              </Link>
              <Link href="/org-reports">
                <Button
                  textAlign="left"
                  size="lg"
                  onClick={onClose}
                  disabled={!auth}
                  isFullWidth
                  variant="ghost"
                  colorScheme="blue"
                >
                  <span className="my-4">Organisation Reports</span>
                  <span className="flex-grow text-right" />
                </Button>
              </Link>
              {auth.user.isSuperAdmin && (
                <>
                  <Link href="/org-management">
                    <Button
                      size="lg"
                      onClick={onClose}
                      isFullWidth
                      variant="ghost"
                      colorScheme="blue"
                    >
                      <span className="my-4">Org Management</span>
                      <span className="flex-grow text-right" />
                    </Button>
                  </Link>
                  <Link href="/report-management">
                    <Button
                      size="lg"
                      onClick={onClose}
                      isFullWidth
                      colorScheme="blue"
                      variant="ghost"
                    >
                      <span className="my-4">Report Management</span>
                      <span className="flex-grow text-right" />
                    </Button>
                  </Link>
                  <Link href="/user-management">
                    <Button
                      size="lg"
                      onClick={onClose}
                      isFullWidth
                      variant="ghost"
                      colorScheme="blue"
                    >
                      <span className="my-4">User Management</span>
                      <span className="flex-grow text-right" />
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              size="lg"
              color="red"
              variant="outline"
              mr={3}
              onClick={() => auth.signOut()}
            >
              Sign Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </span>
  )
}

export default SideNav
