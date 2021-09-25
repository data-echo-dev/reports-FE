import { db } from '../config/firebase'

const updateUser = (data) => {
  //   const {
  //     organisationID: organisation,
  //     title,
  //     selectedRoles: roles,
  //     teacherID: teacher,
  //     url,
  //   } = data

  //   const preFlight = {
  //     organisation,
  //     roles,
  //     teacher,
  //     title,
  //     url,
  //   }

  db.collection('users')
    .doc(data.uid)
    .update(data)
    .then((doc) => {
      console.log(doc)
    })
}

const deleteUser = (id) => {
  db.collection('users')
    .doc(id)
    .delete()
    .then(() => console.log('it gone bruh'))
    .catch((error) => console.error('Error deleting the doc:', error))
}

export { updateUser, deleteUser }
