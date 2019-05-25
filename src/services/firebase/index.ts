import firebase_import from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

export const firebase = firebase_import

const config = {
  apiKey: "AIzaSyBiWGAWU13M7vkAATmOOyoFN7NrVmyRBoU",
  authDomain: "lionel-tay.firebaseapp.com",
  databaseURL: "https://lionel-tay.firebaseio.com",
  projectId: "lionel-tay",
  storageBucket: "lionel-tay.appspot.com",
  messagingSenderId: "602899747052",
  appId: "1:602899747052:web:057da42d04d98124",
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
