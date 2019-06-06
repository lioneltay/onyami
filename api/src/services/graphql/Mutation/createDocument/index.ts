import { MutationResolvers } from "services/graphql/types"
import { db } from "services/db"
import { snakecase, camelcase } from "lib/utils"

export const resolver: MutationResolvers["createDocument"] = async (
  _,
  { input: { data } },
) => {
  const [document] = await db("document")
    .insert(snakecase(data))
    .returning("*")

  if (!document) {
    throw Error("Failed to created document")
  }

  return camelcase(document)
}
