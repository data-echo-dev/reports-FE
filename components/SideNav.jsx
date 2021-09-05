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
  useDisclosure
} from "@chakra-ui/react"
import { useAuth } from '../hooks/useAuth'
import {MenuIcon} from '@heroicons/react/outline'


const SideNav = () => {
    const auth = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

  if (!auth.user) return null
    
    return (
      
          <span className='m-4'>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
              <MenuIcon className='w-5 h-5 text-green-300'/>
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
                  <Link href={'/org-reports'}>
                    <button
                      onClick={onClose}
                      className="flex items-start w-full p-2 my-6 text-left text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                      disabled={!auth}
                    >
                      <span className="mx-4 text-lg font-normal">
                        Organisation Reports
                      </span>
                      <span className="flex-grow text-right"></span>
                    </button>
                  </Link>
                  <Link href={'/my-reports'}>
                    <button
                      onClick={onClose}
                      className="flex items-center w-full p-2 my-6 text-gray-800 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-100 dark:bg-gray-600"
                      disabled={!auth}
                    >
                      <span className="mx-4 text-lg font-normal">My Reports</span>
                      <span className="flex-grow text-right"></span>
                    </button>
                  </Link>
                  {auth.user.isSuperAdmin && (
                    <>
                      <Link href={'/org-management'}>
                        <button onClick={onClose} className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 ">
                          <span className="mx-4 text-lg font-normal">
                            Org Management
                          </span>
                          <span className="flex-grow text-right"></span>
                        </button>
                      </Link>
                      <Link href={'/user-management'}>
                        <button onClick={onClose} className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 ">
                          <span className="mx-4 text-lg font-normal">
                            User Management
                          </span>
                          <span className="flex-grow text-right"></span>
                        </button>
                      </Link>
                      <Link href={'/report-management'}>
                        <button
                          onClick={onClose}
                          className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 ">
                          <span className="mx-4 text-lg font-normal">
                            Report Management
                          </span>
                          <span className="flex-grow text-right"></span>
                        </button>
                      </Link>
                    </>
                  )}
            </nav>

                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                  <Button color='red' variant="outline" mr={3} onClick={() => auth.signOut()}>
                    Sign Out
                  </Button>
              </DrawerFooter>
      
              </DrawerContent>
            </Drawer>
          </span>
      
    )
}

export default SideNav
