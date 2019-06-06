import { DocumentResolvers } from "services/graphql/types"
import { db } from "services/db"
import { camelcase } from "lib/utils"

export const resolvers: DocumentResolvers = {
  id: parent => parent.id,
  folderId: parent => parent.folderId,
  createdAt: parent => parent.createdAt,
  name: parent => parent.name,

  folder: async parent => {
    if (!parent.folderId) {
      return null
    }

    const [folder] = await db("folder")
      .select("*")
      .where("id", parent.folderId)

    if (!folder) {
      return null
    }

    return camelcase(folder)
  },
}
