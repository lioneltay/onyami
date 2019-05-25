import firebase from "firebase"

declare global {
  export type ID = string

  export type User = firebase.User

  export type FirebaseCollection = "document" | "content"
}

export {}
