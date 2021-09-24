import Router from 'next/router'
import { db } from '../config/firebase'

const addReport = () => {
  const newReport = {
    // this is the unassigned org ID
    organisation: 'XNcDtlEkoTFw3ybonFua',
    roles: ['default'],
    teacher: '',
    title: '',
    url: '',
  }
  db.collection('reports')
    .add(newReport)
    .then((doc) => {
      Router.push(`/report/${doc.id}`)
    })
}

const updateReport = (data) => {
  const {
    organisationID: organisation,
    title,
    selectedRoles: roles,
    teacherID: teacher,
    url,
  } = data

  const preFlight = {
    organisation,
    roles,
    teacher,
    title,
    url,
  }

  db.collection('reports')
    .doc(data.reportID)
    .update(preFlight)
    .then((doc) => {
      console.log(doc)
    })
}

const deleteReport = (id) => {
  db.collection('organisations')
    .doc(id)
    .delete()
    .then(() => console.log('it gone bruh'))
    .catch((error) => console.error('Error deleting the doc:', error))
}

export { addReport, updateReport, deleteReport }
