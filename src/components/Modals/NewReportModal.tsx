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
  useToast,
} from '@chakra-ui/react'
import { Report } from '../../app/types'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { db } from '../../config/firebase'
import { defaultReport } from '../../app/fixtures/reports'
import { addReport } from '../../services/report'
import NProgress from 'nprogress'

interface Props {
  isSuperAdmin?: boolean
  orgId?: string
  children: React.ReactNode
}

const NewReportModal: FC<Props> = ({ isSuperAdmin, orgId, children }) => {
  const toast = useToast()

  const [reportID, setReportID] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [report, setReport] = useState<Report>({
    ...defaultReport,
  })

  const organisationId = orgId ?? 'fakeorgid'
  const isEditor = isSuperAdmin ? false : true

  const {
    data: organisations,
    status: orgStatus,
    error: orgError,
  } = useFirestoreQuery(db.collection('organisations'))

  const {
    data: editorOrg,
    status: editorOrgStatus,
    error: editorOrgError,
  } = useFirestoreQuery(
    db.collection('organisations').where('id', '==', organisationId)
  )

  const {
    data: teachers,
    status: teachersStatus,
    error: teachersError,
  } = useFirestoreQuery(
    db.collection('users').where('organisation', '==', report.organisation)
  )

  function handleChange(e) {
    const { id, value } = e.target
    setReport((prevRep) => ({ ...prevRep, [id]: value }))
  }

  async function handleSave() {
    NProgress.start()
    try {
      const doc = await addReport({
        ...report,
      })
      if (!doc.id) {
        throw Error('failed to create new report')
      }
      toast({
        title: 'Report created.',
        description:
          'You successfully created your report. You can now access it from the table below',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
      setReport(defaultReport)
      NProgress.done()
      onClose()
    } catch (e) {
      toast({
        title: 'Failed to create report.',
        description:
          'A problem occurred whilst attempting to create your report.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
      setReport(defaultReport)
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
          <ModalHeader>New Report Details</ModalHeader>
          <ModalCloseButton color="#FF0000" />
          <ModalBody>
            <>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="relative p-1 transition-all duration-500 border rounded ">
                  <div className="absolute px-1 -mt-4 text-xs tracking-wider uppercase">
                    <label htmlFor="id" className="px-1 text-gray-600 bg-white">
                      ID
                    </label>
                  </div>
                  <input
                    id="id"
                    readOnly
                    autoComplete="false"
                    tabIndex={0}
                    type="text"
                    value={reportID}
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
                  {isEditor ? (
                    <select
                      id="organisation"
                      autoComplete="false"
                      tabIndex={0}
                      value={report.organisation}
                      onChange={handleChange}
                      className="block w-full h-full px-1 py-1 text-gray-900 outline-none "
                    >
                      {editorOrgStatus === 'success' &&
                        editorOrg?.map((org) => (
                          <option value={org.id} key={org.id}>
                            {org.name}
                          </option>
                        ))}
                    </select>
                  ) : (
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
                  )}
                </div>
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
                      htmlFor="reportClass"
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

export default NewReportModal
