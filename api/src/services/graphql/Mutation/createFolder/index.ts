import { MutationResolvers } from "services/graphql/types"
import { db } from "services/db"
import { snakecase, camelcase } from "lib/utils"

export const resolver: MutationResolvers["createFolder"] = async (
  _,
  { input: { data } },
) => {
  const [folder] = await db("folder")
    .insert(snakecase(data))
    .returning("*")

  if (!folder) {
    throw Error("Failed to create folder")
  }

  return camelcase(folder)
}
