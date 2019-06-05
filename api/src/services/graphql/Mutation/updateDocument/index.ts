import { MutationResolvers } from "services/graphql/types"
import { db } from "services/db"
import { snakecase, camelcase } from "lib/utils"

export const resolver: MutationResolvers["updateDocument"] = async (
  _,
  { input: { id, data } },
) => {
  const [document] = await db("document")
    .where({ id })
    .update(snakecase(data))
    .returning("*")

  if (!document) {
    throw Error("Failed to update document")
  }

  return camelcase(document)
}
