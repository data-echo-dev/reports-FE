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
        res.status(200).send({
          message: 'entry added successfully',
          data: req.body,
        })
      } catch (error) {
        console.log('Error updating user:', error)
        return res.status(500).json({ error })
      }

      break
    case 'DELETE':
      try {
        await auth.deleteUser(uid)
        console.log('jahman vabaya')
        await db.collection('users').doc(uid).delete()
        console.log('jahman vabaya oan')
        res.status(200).send({
          message: 'entry deleted successfully',
          data: req.body,
        })
      } catch (error) {
        console.log('error deleting user :', error)
        return res.status(500).json({ error })
      }
      break
    default:
      res.status(405).end() // this is Method Not Allowed
      break
  }
}

export default userApi
