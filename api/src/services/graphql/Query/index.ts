import { QueryResolvers, Document, Folder } from "services/graphql/types"

import { resolver as documents } from "./documents"
import { resolver as folders } from "./folders"
import { resolver as folder } from "./folder"
import { resolver as rootFolders } from "./rootFolders"

export const resolvers = {
  date: (parent, args) => {
    console.log(args)
    return args.date
  },
  url: (parent, args) => {
    console.log(args)
    return args.url
  },

  documents,
  folders,
  folder,
  rootFolders,
} as Required<QueryResolvers>
