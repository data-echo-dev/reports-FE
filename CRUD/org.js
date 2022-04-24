import Router from 'next/router'
import NProgress from 'nprogress'
import { db } from '../config/firebase'

const updateOrg = (data) => {
  NProgress.start()
  db.collection('organisations')
    .doc(data.id)
    .update(data)
    .then((doc) => {
      console.log(doc)
    })
  NProgress.done()
}

const addOrg = async () => {
  const newOrg = {
    name: '',
  }
  db.collection('organisations')
    .add(newOrg)
    .then((doc) => {
      Router.push(`/organisation/${doc.id}`)
      const withID = { id: doc.id, ...newOrg }
      console.log(withID)
      return updateOrg(withID)
    })
    .catch((error) => ({ error }))
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
