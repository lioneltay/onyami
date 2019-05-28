import { firestore, dataWithId, collection } from "services/firebase"

export type Document = {
  id: ID
  name: string
  createdAt: number
  updatedAt: number
}

export const getDocuments = (): Promise<Document[]> => {
  return collection("document")
    .get()
    .then(ref => {
      return ref.docs.map(dataWithId) as Document[]
    })
}
