import { db } from "services/db"
import { QueryResolvers } from "services/graphql/types"
import { camelcase } from "lib/utils"

export const resolver: QueryResolvers["folder"] = async (
  _,
  { input: { id } },
) => {
  const [folder] = await db("folder")
    .select("*")
    .where({ id })

  if (!folder) {
    throw Error(`No folder by id ${id}`)
  }

  return camelcase(folder)
}
