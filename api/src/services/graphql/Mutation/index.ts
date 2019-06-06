import { MutationResolvers, Document, Folder } from "services/graphql/types"

import { resolver as createDocument } from "./createDocument"
import { resolver as updateDocument } from "./updateDocument"
import { resolver as deleteDocument } from "./deleteDocument"

import { resolver as createFolder } from "./createFolder"
import { resolver as updateFolder } from "./updateFolder"
import { resolver as deleteFolder } from "./deleteFolder"

import { resolver as moveDocument } from "./moveDocument"
import { resolver as moveFolder } from "./moveFolder"

export const resolvers = {
  ping: () => "pong",
  createDocument,
  updateDocument,
  deleteDocument,
  createFolder,
  updateFolder,
  deleteFolder,
  moveDocument,
  moveFolder,
} as Required<MutationResolvers>
