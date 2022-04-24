import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

import { ArrowRightIcon } from '@heroicons/react/solid'

function Header() {
  const [top, setTop] = useState(true)
  const { user, signOut } = useAuth()
  
  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header
      className={`fixed w-screen z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && 'bg-white blur shadow-lg'
      }`}
    >
      <div className="max-w-6xl px-5 mx-auto sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" aria-label="Cruip">
              <a className="block">
                <img
                  className="w-24 md:w-32 lg:w-48"
                  src="/dataecho-logo.svg"
                  alt="DataEcho Logo"
                />
              </a>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-wrap items-center justify-end flex-grow">
              <li>
                {user ? (
                    <a onClick={() => signOut() } type='button' className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900">
                        Sign Out
                    </a>
                  ) : (
                    <Link href='/login'>
                      <a type='button' className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900">
                        Sign In
                      </a> 
                    </Link>
                  )}
              </li>
              <li>
              {user ? (
                <Link passHref href='/my-reports'>
                  <button type='button' className="ml-3 text-gray-200 bg-gray-900 btn-sm hover:bg-gray-800">
                    <span>My Reports</span>
                    <ArrowRightIcon className="flex-shrink-0 w-4 h-4 ml-2 -mr-1 text-gray-400 fill-current"/>
                  </button>
                </Link>
                  ) : (
                    <Link href='/signup' passHref>
                      <button type='button' className="ml-3 text-gray-200 bg-gray-900 btn-sm hover:bg-gray-800">
                        <span>Sign Up</span>
                        <ArrowRightIcon className="flex-shrink-0 w-4 h-4 ml-2 -mr-1 text-gray-400 fill-current"/>
                      </button>
                    </Link>
                  )}
                
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
