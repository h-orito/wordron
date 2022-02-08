import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

import firebase from 'firebase/app'

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGINGSENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}
// initializeを複数回走らせない
if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

const database = firebase.database()
const auth = firebase.auth()
export { auth, database }
