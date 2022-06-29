import Router from 'next/router'
import NProgress from 'nprogress'
import { db } from '../config/firebase'

const addReport = (report) => {
  NProgress.start()
  const newReport = {
    ...report,
  }
  db.collection('reports')
    .add(newReport)
    .then((doc) => {
      console.log('successfully added new doc:', doc.id)
    })
    .catch((error) => console.error('Error adding new doc:', error))
  NProgress.done()
}

const updateReport = (data) => {
  NProgress.start()
  const {
    organisationID: organisation,
    title,
    teacherID: teacher,
    url,
    subject,
    reportClass,
  } = data

  const preFlight = {
    organisation,
    teacher,
    title,
    url,
    subject,
    reportClass,
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
