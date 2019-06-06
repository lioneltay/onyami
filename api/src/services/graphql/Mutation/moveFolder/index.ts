import { db } from "services/db"
import { MutationResolvers } from "services/graphql/types"
import { camelcase } from "lib/utils"

const isAncestorOf = async (
  folderId: string,
  candidateId: string,
): Promise<boolean> => {
  const rawAncestors: any = await db.raw(
    `
      WITH RECURSIVE ancestors AS (
        (
          SELECT id, parent_id
          FROM folder
          WHERE id = ?
        )
        UNION
        (
          SELECT folder.id, folder.parent_id
          FROM folder
          INNER JOIN ancestors ON folder.id = ancestors.parent_id
        )
      )
      SELECT *
      FROM ancestors;
    `,
    [folderId],
  )

  const ancestorIds: string[] = rawAncestors.rows.map(
    (ancestor: any) => ancestor.id,
  )

  return !!ancestorIds.find(id => id === candidateId)
}

export const resolver: MutationResolvers["moveFolder"] = async (
  parent,
  { input: { folderId, fromFolderId, toFolderId } },
) => {
  const willCreateCycle = await isAncestorOf(toFolderId, folderId)

  if (willCreateCycle) {
    throw Error(
      "Cannot move since ${folderId} is an ancestor of ${toFolderId} ",
    )
  }

  const [folder] = await db("folder")
    .where({ id: folderId, parent_id: fromFolderId })
    .update({ parent_id: toFolderId })
    .returning("*")

  if (!folder) {
    throw Error(`No folder with id ${folderId} in folder of id ${fromFolderId}`)
  }

  return camelcase(folder)
}
