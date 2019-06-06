import * as admin from "firebase-admin"

var serviceAccount = require("../../../keys/onyami-firebase-adminsdk.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://onyami.firebaseio.com",
})
