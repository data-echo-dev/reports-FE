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
  useToast,
} from '@chakra-ui/react'
import { Report } from '../../app/types'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { db } from '../../config/firebase'
import Loading from '../common/loading'
import { defaultReport } from '../../app/fixtures/reports'
import { updateReport } from '../../services/report'
import NProgress from 'nprogress'

interface Props {
  id: string
  isEditor?: boolean
  children: React.ReactNode
}

const ReportDetailsModal: FC<Props> = ({
  id,
  isEditor,
  children,
}) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [report, setReport] = useState<Report>({
    ...defaultReport,
    id:''
  })

  const { data, status, error } = useFirestoreQuery(
    db.collection('reports').doc(id)
  )

  const {
    data: organisations,
    status: orgStatus,
    error: orgError,
  } = useFirestoreQuery(db.collection('organisations'))

  const {
    data: teachers,
    status: teachersStatus,
    error: teachersError,
  } = useFirestoreQuery(
    db.collection('users').where('organisation', '==', report.organisation)
  )

  useEffect(() => {
    if (data && isOpen) {
      setReport(data)
    }
  }, [data, id, isOpen])

  function handleChange(e) {
    const { id, value } = e.target
    setReport((prevRep) => ({ ...prevRep, [id]: value }))
  }

  async function handleSave() {
    NProgress.start()
    try {
      await updateReport({
        ...report,
        organisationID: report.organisation,
        teacherID: report.teacher,
      })
      toast({
        title: 'Update Successful.',
        description: 'You successfully updated your report',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
      NProgress.done()
      onClose()
    } catch (e) {
      toast({
        title: 'Failed to update report.',
        description:
          'A problem occurred whilst attempting to update your report.',
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
      <div className="shadow-xl cursor-pointer" onClick={onOpen}>
        {children}
      </div>

      <Modal isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Report Details</ModalHeader>
          <ModalCloseButton color="#FF0000" />
          <ModalBody>
            {data ? (
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                  {!isEditor && (
                    <>
                      <div className="relative p-1 transition-all duration-500 border rounded ">
                        <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                          <label
                            htmlFor="id"
                            className="px-1 text-gray-600 bg-white"
                          >
                            ID
                          </label>
                        </div>
                        <input
                          id="id"
                          readOnly
                          autoComplete="false"
                          tabIndex={0}
                          type="text"
                          value={report.id}
                          className="block w-full h-full px-1 py-1 text-gray-900 outline-none cursor-not-allowed"
                        />
                      </div>
                      <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                        <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                          <label
                            htmlFor="organisation"
                            className="px-1 text-gray-600 bg-white"
                          >
                            Organisation
                          </label>
                        </div>
                        <select
                          id="organisation"
                          autoComplete="false"
                          tabIndex={0}
                          value={report.organisation}
                          onChange={handleChange}
                          className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
                        >
                          {orgStatus === 'success' &&
                            organisations?.map((org) => (
                              <option value={org.id} key={org.id}>
                                {org.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </>
                  )}
                  <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="title"
                        className="px-1 text-gray-600 bg-white"
                      >
                        Title
                      </label>
                    </div>
                    <input
                      id="title"
                      autoComplete="false"
                      tabIndex={0}
                      type="text"
                      onChange={handleChange}
                      value={report.title}
                      className="block w-full h-full px-1 py-1 outline-none"
                    />
                  </div>
                  <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="teacher"
                        className="px-1 text-gray-600 bg-white"
                      >
                        Teacher
                      </label>
                    </div>
                    <select
                      id="teacher"
                      autoComplete="false"
                      tabIndex={0}
                      value={report.teacher}
                      onChange={handleChange}
                      className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
                    >
                      <option value="" />
                      {teachersStatus === 'success' &&
                        teachers?.map((teacher) => (
                          <option value={teacher.uid} key={teacher.uid}>
                            {teacher.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="class"
                        className="px-1 text-gray-600 bg-white"
                      >
                        Class
                      </label>
                    </div>
                    <input
                      id="reportClass"
                      autoComplete="false"
                      tabIndex={0}
                      type="text"
                      onChange={handleChange}
                      value={report.reportClass}
                      className="block w-full h-full px-1 py-1 outline-none"
                    />
                  </div>
                  <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="subject"
                        className="px-1 text-gray-600 bg-white"
                      >
                        Subject
                      </label>
                    </div>
                    <input
                      id="subject"
                      autoComplete="false"
                      tabIndex={0}
                      type="text"
                      onChange={handleChange}
                      value={report.subject}
                      className="block w-full h-full px-1 py-1 outline-none"
                    />
                  </div>
                  <div className="relative p-1 transition-all duration-500 border rounded focus-within:border-blue-500 focus-within:text-blue-500">
                    <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                      <label
                        htmlFor="url"
                        className="px-1 text-gray-600 bg-white"
                      >
                        Url
                      </label>
                    </div>
                    <textarea
                      id="url"
                      autoComplete="false"
                      tabIndex={0}
                      value={report.url || ''}
                      onChange={handleChange}
                      className="block w-full h-full px-1 py-1 outline-none"
                    />
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
            <Button mr={3} onClick={onClose} className="text-primary-blue4">
              Discard Changes
            </Button>
            <Button
              bgColor="#66CEF5"
              _hover={{ bg: '#339BC2' }}
              _active={{ bg: '#0082B3' }}
              onClick={handleSave}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReportDetailsModal
