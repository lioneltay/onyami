import { firestore, collection, dataWithId } from "services/firebase"

var museums = firestore.collectionGroup("folder")

// firestore
//   .collectionGroup("folder")
//   .get()
//   .then(res => {
//     console.log(res.docs.map(doc => doc.data()))
//   })



firestore.collectionGroup('folder').