import firebase from '../../../config/firebase-admin'

// TODO: write code to delete user
// TODO: write code to update user details
// this has to take care of firestore & authentication data

export default (req, res) => {
  firebase
    .collection('users')
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
