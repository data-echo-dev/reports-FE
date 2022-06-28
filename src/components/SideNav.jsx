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
import { useRouter } from 'next/router'
import Logo from '../images/logo'

const SideNav = () => {
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { pathname } = useRouter()

  const btnRef = React.useRef()

  if (!auth.user) return null
  if (pathname === '/') return
  return (
    <span className="absolute top-0 z-10 m-4">
      <Button
        ref={btnRef}
        className="opacity-80"
        onClick={onOpen}
        bgColor="#66CEF5"
        _hover={{ bg: '#339BC2' }}
        _active={{ bg: '#0082B3' }}
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
          <DrawerCloseButton color="#FF0000" />
          <nav className="pb-0 p-7">
            <Link href="/" passHref>
              <button>
                <Logo />
              </button>
            </Link>
          </nav>
          <DrawerHeader>Quick Links</DrawerHeader>
          <DrawerBody>
            <nav>
              <Link href="/" passHref>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={onClose}
                  disabled={!auth}
                  isFullWidth
                  className="text-left"
                  color="blue.700"
                  colorScheme="blue"
                >
                  <span className="my-4">Home</span>
                  <span className="flex-grow text-right" />
                </Button>
              </Link>
              <Link passHref href="/my-reports">
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={onClose}
                  disabled={!auth}
                  isFullWidth
                  className="text-left"
                  color="blue.700"
                  colorScheme="blue"
                >
                  <span className="my-4">My Reports</span>
                  <span className="flex-grow text-right" />
                </Button>
              </Link>
              {auth.user.isSuperAdmin && (
                <>
                  <Link passHref href="/org-management">
                    <Button
                      size="lg"
                      onClick={onClose}
                      isFullWidth
                      variant="ghost"
                      color="blue.700"
                      colorScheme="blue"
                    >
                      <span className="my-4">Org Management</span>
                      <span className="flex-grow text-right" />
                    </Button>
                  </Link>
                  <Link passHref href="/report-management">
                    <Button
                      size="lg"
                      onClick={onClose}
                      isFullWidth
                      colorScheme="blue"
                      color="blue.700"
                      variant="ghost"
                    >
                      <span className="my-4">Report Management</span>
                      <span className="flex-grow text-right" />
                    </Button>
                  </Link>
                  <Link passHref href="/user-management">
                    <Button
                      size="lg"
                      onClick={onClose}
                      isFullWidth
                      variant="ghost"
                      color="blue.700"
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
