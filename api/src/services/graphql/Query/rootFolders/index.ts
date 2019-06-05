import { db } from "services/db"
import { QueryResolvers } from "services/graphql/types"
import { camelcase } from "lib/utils"

export const resolver = async () => {
  return db("folder")
    .select("*")
    .where({ parent_id: null })
}
