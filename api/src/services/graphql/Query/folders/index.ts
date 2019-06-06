import { db } from "services/db"
import { QueryResolvers } from "services/graphql/types"
import { camelcase } from "lib/utils"

export const resolver: QueryResolvers["folders"] = async () => {
  const folders = await db("folder").select("*")
  return folders.map(camelcase)
}
