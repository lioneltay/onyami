import { firestore, collection, dataWithId } from "services/firebase"
import uuid from "uuid/v4"

export type Folder = {
  id: ID
  name: string
  path: string
  createdAt: number
  updatedAt: number
}

export const getRootFolders = (): Promise<Folder[]> => {
  return collection("folder")
    .get()
    .then(ref => {
      return ref.docs.map(dataWithId) as Folder[]
    })
}

type CreateFolderInput = {
  parentPath?: string
} & Omit<Folder, "id" | "path" | "createdAt" | "updatedAt">

export const createFolder = async ({
  parentPath,
  ...rest
}: CreateFolderInput): Promise<Folder> => {
  const id = uuid()

  await collection("folder")
    .doc(id)
    .set({
      ...rest,
      path: [parentPath, id].filter(Boolean).join("."),
    })

  return await collection("folder")
    .doc(id)
    .get()
    .then(res => res.data() as Folder)
}