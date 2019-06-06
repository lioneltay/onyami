import firebase from "firebase"

declare global {
  export type ID = string

  export type User = firebase.User

  export type Folder = {
    id: ID
    name: string
    path: string
  }

  export type FirebaseCollection = "document" | "content" | "folder"
}

export {}
