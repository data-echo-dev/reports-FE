import { auth, db } from '../../../config/firebase-admin'

const userApi = async (req, res) => {
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
      try {
        const x = await db.collection('users').doc(uid).update(req.body)
        console.log(x)
        const userRecord = await auth.updateUser(uid, req.body)
        console.log('Successfully updated user', userRecord.toJSON())
        res.send({
          status: 200,
          message: 'entry added successfully',
          data: req.body,
        })
      } catch (e) {
        console.log('Error updating user:', error)
        return res.json({ error })
      }

      break
    case 'DELETE':
      try {
        await auth.deleteUser(uid)
        console.log('jahman vabaya')
        await db.collection('users').doc(uid).delete()
        console.log('jahman vabaya oan')
        res.send({
          status: 200,
          message: 'entry deleted successfully',
          data: req.body,
        })
      } catch (e) {
        return res.json({ error })
      }
      break
    default:
      res.status(405).end() // this is Method Not Allowed
      break
  }
}

export default userApi
