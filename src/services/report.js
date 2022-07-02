import Router from 'next/router'
import NProgress from 'nprogress'
import { db } from '../config/firebase'

const addReport = (report) => {
  const newReport = {
    ...report,
  }
  return db.collection('reports').add(newReport)
}

const updateReport = (data) => {
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

  return db.collection('reports')
    .doc(data.reportID)
    .update(preFlight)
}

const deleteReport = (id) => {
  return db.collection('reports')
    .doc(id)
    .delete()
}

export { addReport, updateReport, deleteReport }
