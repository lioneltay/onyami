import { db } from "services/db"
import { MutationResolvers } from "services/graphql/types"

export const resolver: MutationResolvers["deleteDocument"] = async (
  _,
  { input: { id } },
) => {
  await db("document")
    .where({ id })
    .delete()

  return id
}
