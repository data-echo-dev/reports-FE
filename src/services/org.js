import Router from 'next/router'
import NProgress from 'nprogress'
import { db } from '../config/firebase'
import { defaultOrganisation } from '../app/fixtures/organisations'

const updateOrg = async (data) => {
  NProgress.start()
  db.collection('organisations')
    .doc(data.id)
    .update(data)
    .then((doc) => {
      console.log(doc)
    })
  NProgress.done()
}

const addOrg = async (data) => {
  db.collection('organisations')
    .add(data)
    .then((doc) => {
      Router.push(`/org-management`)
    })
    .catch((error) => console.error(error.mesage))
}

const deleteOrg = (id) => {
  NProgress.start()
  db.collection('organisations')
    .doc(id)
    .delete()
    .then(() => {
      console.log('it gone bruh')
      NProgress.done()
    })
    .catch((error) => console.error('Error deleting the doc:', error))
}

export { addOrg, updateOrg, deleteOrg }
