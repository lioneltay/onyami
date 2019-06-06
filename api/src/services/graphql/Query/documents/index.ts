import { db } from "services/db"
import { Document } from "services/graphql/types"

type RawDocument = {
  id: string
  folder_id: string | null
  created_at: Date
  name: string
  content: string
}

const parseDocument = (raw: RawDocument): Document => {
  return {
    id: raw.id,
    folderId: raw.folder_id,
    createdAt: raw.created_at,
    name: raw.name,
    content: raw.content,
  }
}

export const resolver = async () => {
  const documents = await db("document").select("*")
  return documents.map(parseDocument)
}
