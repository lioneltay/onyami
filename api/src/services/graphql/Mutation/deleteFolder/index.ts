import { db } from "services/db"
import { MutationResolvers } from "services/graphql/types"

export const resolver: MutationResolvers["deleteFolder"] = async (
  _,
  { input: { id } },
) => {
  await db("folder")
    .where({ id })
    .delete()

  return id
}
