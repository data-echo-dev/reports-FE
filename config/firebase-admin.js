import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  })
}

// export default admin.firestore()

const auth = admin.auth()
const db = admin.firestore()
const now = admin.firestore.Timestamp.now()
const storage = admin.storage()
export { auth, db, now, storage }

// console.log(admin.apps)
