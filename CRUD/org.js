import Router from 'next/router'
import { db } from '../config/firebase'

const updateOrg = (data) => {
  db.collection('organisations')
    .doc(data.id)
    .update(data)
    .then((doc) => {
      console.log(doc)
    })
}

const addOrg = async () => {
  const newOrg = {
    name: '',
    roles: [],
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
  db.collection('organisations')
    .doc(id)
    .delete()
    .then(() => console.log('it gone bruh'))
    .catch((error) => console.error('Error deleting the doc:', error))
}

export { addOrg, updateOrg, deleteOrg }
