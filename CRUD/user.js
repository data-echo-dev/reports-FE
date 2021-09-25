import { db } from '../config/firebase'

const updateUser = (data) => {
  db.collection('users')
    .doc(data.uid)
    .update(data)
    .then((doc) => {
      console.log(doc)
    })
}

export { updateUser }
