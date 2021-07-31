import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react'
import { auth, db } from '../config/firebase'

const authContext = createContext({ user: {} })
const { Provider } = authContext

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider()
  return <Provider value={auth}>{props.children}</Provider>
}
export const useAuth: any = () => {
  return useContext(authContext)
}

// Provider hook that creates an auth object and handles it's state
const useAuthProvider = () => {
  const [user, setUser] = useState(null)

  const createUser = (user) => {
    return db
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user)
        return user
      })
      .catch((error) => {
        return { error }
      })
  }

  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth?.currentUser?.sendEmailVerification()
        return createUser({ uid: response?.user?.uid, email, name })
      })
      .catch((error) => {
        return { error }
      })
  }
  return {
    user,
    signUp,
  }
}
