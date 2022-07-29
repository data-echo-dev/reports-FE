/**
 *
 * @param {import('../app/types').User} user
 * @returns {Promise<Response>}
 */
const updateUser = async (user) => {
  try {
    const response = await fetch(`/api/user/${user.uid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    console.log(response)
    if (response.status !== 200)
      throw new Error('An error occurred whilst updating user')
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 *
 * @param {string} uid
 * @returns {Promise<Response>}
 */
const deleteUser = async (uid) => {
  try {
    const response = await fetch(`/api/user/${uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    if (response.status !== 200)
      throw new Error('An error occurred whilst deleting the user')
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

export { updateUser, deleteUser }
