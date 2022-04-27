import Router from 'next/router'
import NProgress from 'nprogress'
import { db } from '../config/firebase'

const addReport = () => {
  const newReport = {
    // this is the unassigned org ID
    organisation: 'XNcDtlEkoTFw3ybonFua',
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
  NProgress.start()
  const {
    organisationID: organisation,
    title,
    teacherID: teacher,
    url,
  } = data

  const preFlight = {
    organisation,
    teacher,
    title,
    url,
  }

  db.collection('reports')
    .doc(data.reportID)
    .update(preFlight)
    .then((doc) => {
      NProgress.done()
      console.log(doc)
    })
}

const deleteReport = (id) => {
  NProgress.start()
  db.collection('reports')
    .doc(id)
    .delete()
    .then(() => {
      console.log('it gone bruh')
      NProgress.done()
    })
    .catch((error) => console.error('Error deleting the doc:', error))
}

export { addReport, updateReport, deleteReport }
