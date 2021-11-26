// @ts-nocheck
import { useRouter } from 'next/router'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { db } from '../config/firebase'
import { useFirestoreQuery } from '../hooks/useFirestoreQuery'

const SingleReport = () => {
  const router = useRouter()
  const auth = useRequireAuth()
  const queryId = router.query.id

  const { data, status, error } = useFirestoreQuery(
    db.collection('reports').doc(queryId)
  )
  console.log(data?.url)

  if (!auth.user) return null

  return (
    <main className="mt-16">
      {data && (
        <div
          className="w-screen h-screen"
          dangerouslySetInnerHTML={{ __html: `${data.url}` }}
        />
      )}
    </main>
  )
}

export default SingleReport

// // This gets called on every request
// export async function getServerSideProps({ query }) {
//   // Fetch data from external API
//   // const snapshot = await db.collection('reports').doc(query.id).get()
//   // const data = snapshot.data()
//   // console.log(data)
//   const data = {}

//   return { props: { data } }
// }
