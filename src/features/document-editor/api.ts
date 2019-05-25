import { firestore, dataWithId } from "services/firebase"
import uuid from "uuid/v4"

import firebase from "firebase"

const collection = (collection: FirebaseCollection) =>
  firestore.collection(collection)

export type Document = {
  id: ID
  createdAt: number
  updatedAt: number
  content: string
}

export const createDocument = async (
  document: Omit<Document, "id" | "createdAt" | "updatedAt">,
): Promise<Document> => {
  const { content, ...rest } = document
  const id = uuid()

  await Promise.all([
    collection("document")
      .doc(id)
      .set({
        ...rest,
        created_at: Date.now(),
        updated_at: Date.now(),
      }),
    collection("content")
      .doc(id)
      .set({
        value: content,
      }),
  ])

  const doc = await getDocument(id)

  if (!doc) {
    throw Error("Failed to create")
  }

  return doc
}

type UpdateDocumentInput = {
  documentId: ID
  data: Partial<Omit<Document, "id">>
}

export const updateDocument = async ({
  documentId,
  data,
}: UpdateDocumentInput): Promise<Document> => {
  const { content, ...rest } = data

  await Promise.all([
    collection("document")
      .doc(documentId)
      .update({
        ...rest,
        created_at: Date.now(),
        updated_at: Date.now(),
      }),
    collection("content")
      .doc(documentId)
      .update({
        value: content,
      }),
  ])

  const doc = await getDocument(documentId)

  if (!doc) {
    throw Error("Failed to create")
  }

  return doc
}

export const getDocument = (documentId: ID): Promise<Document | null> => {
  console.log(documentId)
  return Promise.all([
    collection("document")
      .doc(documentId)
      .get()
      .then(ref => dataWithId(ref)),
    collection("content")
      .doc(documentId)
      .get()
      .then(ref => dataWithId(ref)),
  ]).then(([doc, content]) => {
    return doc
      ? ({ ...doc, content: content ? content.value : "" } as Document)
      : null
  })
}

export const deleteDocument = async (documentId: ID): Promise<void> => {
  await Promise.all([
    collection("document")
      .doc(documentId)
      .delete(),
    collection("content")
      .doc(documentId)
      .delete(),
  ])
}

// type EditTasksPayload = {
//   task_ids: ID[]
//   task_data: Partial<Omit<Task, "id">>
// }
// export const editTasks = async ({
//   task_ids,
//   task_data,
// }: EditTasksPayload): Promise<void> => {
//   const batch = firestore.batch()

//   task_ids.forEach(id => {
//     batch.update(firestore.collection("tasks").doc(id), {
//       ...task_data,
//       updated_at: Date.now(),
//     })
//   })

//   return batch.commit()
// }

// export const checkTasks = (task_ids: ID[]) => {
//   return editTasks({
//     task_ids,
//     task_data: { complete: true },
//   })
// }

// export const uncheckTasks = (task_ids: ID[]) => {
//   return editTasks({
//     task_ids,
//     task_data: { complete: false },
//   })
// }

// export const archiveTask = (task_id: ID) => {
//   return editTask({
//     task_id,
//     task_data: { archived: true },
//   })
// }

// export const archiveTasks = (task_ids: ID[]) => {
//   return editTasks({
//     task_ids,
//     task_data: { archived: true },
//   })
// }

// export const unarchiveTask = (task_id: ID) => {
//   return editTask({
//     task_id,
//     task_data: { archived: false },
//   })
// }

// export const unarchiveTasks = (task_ids: ID[]) => {
//   return editTasks({
//     task_ids,
//     task_data: { archived: false },
//   })
// }

// export const deleteTask = async (task_id: ID): Promise<ID> => {
//   await firestore
//     .collection("tasks")
//     .doc(task_id)
//     .delete()
//   return task_id
// }

// export const deleteTasks = (task_ids: ID[]) => {
//   const batch = firestore.batch()

//   task_ids.forEach(id => {
//     batch.delete(firestore.collection("tasks").doc(id))
//   })

//   return batch.commit()
// }
