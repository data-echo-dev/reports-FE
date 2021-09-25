// @ts-nocheck
import Router from 'next/router'
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react'
import firebase from 'firebase/app'
import { auth, db } from '../config/firebase'

const authContext = createContext<firebase.User | null>(null)
const { Provider } = authContext

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider()
  return <Provider value={auth}>{props.children}</Provider>
}
export const useAuth: any = () => useContext(authContext)

// Provider hook that creates an auth object and handles it's state
const useAuthProvider = () => {
  // Q: will I have to create a custom user type?
  const [user, setUser] = useState<firebase.User | null>(null)

  const signUp = ({ name, email, password }) => {
    const UNASSIGNED_ORG = 'XNcDtlEkoTFw3ybonFua'

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth?.currentUser?.sendEmailVerification()
        return createUser({
          uid: response?.user?.uid,
          email,
          name,
          organisation: UNASSIGNED_ORG,
        })
      })
      .catch((error) => ({ error }))
  }
  const createUser = (user) =>
    db
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user)
        return user
      })
      .catch((error) => ({ error }))

  const signIn = ({ email, password }) =>
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        if (response.user) {
          setUser(response.user)
          getUserAdditionalData(user)
          return response.user
        }
      })
      .catch((error) => ({ error }))
  const getUserAdditionalData = (user: firebase.User) =>
    db
      .collection('users')
      .doc(user.uid)
      .get()
      .then((userData) => {
        if (userData.data()) {
          // this is why I might need a custom user type?
          setUser(userData.data())
        }
      })

  // handleAuthStateChanged & the useEffect allow you to refresh a page & remain logged in.
  // need to read into this
  const handleAuthStateChanged = (user) => {
    setUser(user)
    if (user) {
      getUserAdditionalData(user)
      Router.push('/dashboard')
    }
  }
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged)

    return () => unsub()
  }, [user?.uid])

  // this effect updates the application's state whenever the user document changes
  // read into .onSnapshot
  useEffect(() => {
    if (user?.uid) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection('users')
        .doc(user?.uid)
        .onSnapshot((doc) => setUser(doc.data()))
      return () => unsubscribe()
    }
  }, [user?.uid])

  const signOut = () =>
    auth.signOut().then(() => {
      setUser(null)
      Router.push('/login')
    })

  const sendPasswordResetEmail = (email) =>
    auth.sendPasswordResetEmail(email).then((response) => response)

  return {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
  }
}
