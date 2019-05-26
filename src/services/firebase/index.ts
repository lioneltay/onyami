import firebase_import from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

export const firebase = firebase_import

const config = {
  apiKey: "AIzaSyCoNIBIgirBOBuPUwpWR6HiSzTBl86nWTM",
  authDomain: "onyami.firebaseapp.com",
  databaseURL: "https://onyami.firebaseio.com",
  projectId: "onyami",
  storageBucket: "onyami.appspot.com",
  messagingSenderId: "120880948765",
  appId: "1:120880948765:web:de193ddeb0af702a",
}

firebase.initializeApp(config)

export const firestore = firebase.firestore()

firestore.settings({})

firestore
  .enablePersistence({
    experimentalTabSynchronization: true,
  })
  .catch(function(err) {
    if (err.code == "failed-precondition") {
      console.log(`
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    `)
    } else if (err.code == "unimplemented") {
      console.log(`
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    `)
    }
  })

export function dataWithId(
  doc: firebase.firestore.DocumentSnapshot,
): firebase.firestore.DocumentData | null {
  const data = doc.data()
  return data ? { ...data, id: doc.id } : null
}
