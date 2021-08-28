import { db } from '../config/firebase'
import Router from 'next/router'


const addOrg = () => {
  const newOrg = {
      name: '',
      roles: []
  }
  db.collection('organisations').add(newOrg).then((doc) => {
    Router.push(`/organisation/${doc.id}`)
  })
}

const updateOrg = (data) => {
  db.collection('organisations').doc(data.id).update(data).then((doc) => {
    console.log(doc);
  })
}

export {addOrg, updateOrg}
