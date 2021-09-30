import { auth, db } from '../../../config/firebase-admin'

// TODO: figure out how to properly resolve these requests for the frontend

export default (req, res) => {
  const uid = req.query.id

  switch (req.method) {
    case 'GET':
      db.collection('users')
        .doc(uid)
        .get()
        .then((doc) => {
          res.json(doc.data())
        })
        .catch((error) => {
          res.json({ error })
        })
      // ...
      break
    case 'POST':
      db.collection('users')
        .doc(uid)
        .update(req.body)
        .then(() => {
          auth.updateUser(uid, req.body)
        })
        .then((userRecord) => res.json(userRecord))
        .catch((error) => res.json({ error }))
      break
    case 'DELETE':
      auth
        .deleteUser(uid)
        .then(() => console.log('jahman vabaya'))
        .catch((error) => res.json({ error }))
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }

  console.log(req.method)
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
