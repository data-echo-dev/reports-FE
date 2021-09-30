import { auth, db } from '../../../config/firebase-admin'

// TODO: write code to delete user
// TODO: write code to update user details
// update & delete have to take care of firestore(email address) & authentication (identifier)

export default (req, res) => {
  db.collection('users')
    .doc(req.query.id)
    .get()
    .then((doc) => {
      res.json(doc.data())
    })
    .catch((error) => {
      res.json({ error })
    })
}

// export default (req, res) => {
//     switch (req.method) {
//       case 'GET':
//         //...
//         break
//       case 'POST':
//         //...
//         break
//       default:
//         res.status(405).end() //Method Not Allowed
//         break
//     }
//   }
