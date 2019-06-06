import { FolderResolvers } from "services/graphql/types"
import { db } from "services/db"
import { camelcase } from "lib/utils"

export const resolvers: FolderResolvers = {
  id: parent => parent.id,
  parentId: parent => parent.parentId,
  createdAt: parent => parent.createdAt,
  name: parent => parent.name,

  parent: async parent => {
    if (!parent.parentId) {
      return null
    }

    const [parentFolder] = await db("folder")
      .select("*")
      .where("id", parent.parentId)

    if (!parentFolder) {
      return null
    }

    return camelcase(parentFolder)
  },

  children: async parent => {
    const children = await db("folder")
      .select("*")
      .where("parent_id", parent.id)

    return children.map(camelcase)
  },

  ancestors: async (parent, args, context, info) => {
    if (!parent.parentId) {
      return []
    }

    const rawAncestors: any = await db.raw(
      `
      WITH RECURSIVE ancestors AS (
        (
          SELECT *
          FROM folder
          WHERE id = ?
        )
        UNION
        (
          SELECT folder.*
          FROM folder
          INNER JOIN ancestors ON folder.id = ancestors.parent_id
        )
      )
      SELECT *
      FROM ancestors;
    `,
      [parent.parentId],
    )

    const ancestors = rawAncestors.rows.map(camelcase)
    const orderedAncestors = []
    console.log(ancestors)

    function findParent<T extends { id: string; parentId: string }>(
      parentId: string,
      items: T[],
    ): T | null {
      return items.find(item => item.id === parentId) || null
    }

    let last = parent
    while (last) {
      last = findParent(last.parentId, ancestors)
      if (last) {
        orderedAncestors.push(last)
      }
    }

    return orderedAncestors.reverse()
  },

  documents: async ({ id }, args) => {
    const documents = db("document")
      .select("*")
      .where({ folder_id: id })

    return documents.map(camelcase)
  },
}
