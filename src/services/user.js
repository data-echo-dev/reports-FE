import { db } from '../config/firebase'

/**
 *
 * @param {import('../app/types').User} user
 * @returns {Promise<Response>}
 */
const updateUser = (user) => {
  return fetch(`/api/user/${user.uid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
}

/**
 *
 * @param {string} id
 * @returns {Promise<Response>}
 */
const deleteUser = (id) => {
  return fetch(`/api/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export { updateUser, deleteUser }
