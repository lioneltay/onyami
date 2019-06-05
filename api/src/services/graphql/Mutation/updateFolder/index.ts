import { MutationResolvers } from "services/graphql/types"
import { db } from "services/db"
import { snakecase, camelcase } from "lib/utils"

export const resolver: MutationResolvers["updateFolder"] = async (
  _,
  { input: { id, data } },
) => {
  const [folder] = await db("folder")
    .where({ id })
    .update(snakecase(data))
    .returning("*")

  if (!folder) {
    throw Error("Failed to update folder")
  }

  return camelcase(folder)
}
