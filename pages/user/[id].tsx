import React from 'react'

const SingleUser = ({ params: { id } }) => (
  <>
    <h1>user</h1>
    <div>{id}</div>
  </>
)

export default SingleUser

export async function getServerSideProps(context) {
  const { params } = context

  console.log(params)
  return { props: { params } }
}
