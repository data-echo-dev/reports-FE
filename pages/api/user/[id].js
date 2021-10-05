import { auth, db } from '../../../config/firebase-admin'

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
    case 'PUT':
      db.collection('users')
        .doc(uid)
        .update(req.body)
        .then((x) => {
          console.log(x)
          res.send({
            status: 200,
            message: 'entry added successfully',
            data: req.body,
          })
        })
        .catch((error) => res.json({ error }))

      auth
        .updateUser(uid, req.body)
        .then((userRecord) => {
          console.log('Successfully updated user', userRecord.toJSON())
          res.send({
            status: 200,
            message: 'entry added successfully',
            data: req.body,
          })
        })
        .catch((error) => {
          console.log('Error updating user:', error)
        })

      break
    case 'DELETE':
      auth
        .deleteUser(uid)
        .then(() => console.log('jahman vabaya'))
        .catch((error) => res.json({ error }))

      db.collection('users')
        .doc(uid)
        .delete()
        .then(() => console.log('jahman vabaya oan'))
        .catch((error) => res.json({ error }))
      break
    default:
      res.status(405).end() // this is Method Not Allowed
      break
  }
}
