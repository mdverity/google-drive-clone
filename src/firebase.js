import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const app = Firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

const firestore = app.firestore()

// Exports dumbed down firestore object,
// usually returns entirely too much data for our use-case.
export const database = {
  folders: firestore.collection('folders'),
  files: firestore.collection('files'),

  // Helper function to clean data when a new folder is selected.
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() }
  },

  // Firebase's built-in timestamp generation to get
  // 'Created at' field when data is written to server.
  getTimestamp: Firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = app.storage()
export const auth = app.auth()
export default app
