import { db } from "services/db"
import { MutationResolvers } from "services/graphql/types"
import { camelcase } from "lib/utils"

export const resolver: MutationResolvers["moveDocument"] = async (
  parent,
  { input: { documentId, fromFolderId, toFolderId } },
) => {
  const [document] = await db("document")
    .where({ id: documentId, folder_id: fromFolderId })
    .update({ folder_id: toFolderId })
    .returning("*")

  if (!document) {
    throw Error(
      `No folder with id ${documentId} in folder of id ${fromFolderId}`,
    )
  }

  return camelcase(document)
}
