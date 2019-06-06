import { ApolloServer } from "apollo-server-express"
import { Application } from "express"
import fs from "fs"
import path from "path"

import { scalarResolvers } from "./scalars"
import { resolvers as queryResolvers } from "./Query"
import { resolvers as mutationResolvers } from "./Mutation"
import { resolvers as entityResolvers } from "./entities"

const resolvers = {
  ...scalarResolvers,
  ...entityResolvers,
  Query: queryResolvers,
  Mutation: mutationResolvers,
}

function recFindByExt(
  base: string,
  ext: string,
  _files?: string[],
  _result?: string[],
): string[] {
  const files: string[] = _files || fs.readdirSync(base)
  let result: string[] = _result || []

  files.forEach(file => {
    var newbase = path.join(base, file)
    if (fs.statSync(newbase).isDirectory()) {
      result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result)
    } else {
      if (file.substr(-1 * (ext.length + 1)) == "." + ext) {
        result.push(newbase)
      }
    }
  })
  return result
}

const typedefFiles = recFindByExt(path.resolve(__filename, ".."), "gql")

const typeDefs = typedefFiles.map(filepath =>
  fs.readFileSync(filepath, { encoding: "utf8" }),
)

const server = new ApolloServer({
  typeDefs: typeDefs as any,
  resolvers: resolvers as any,
})

export const applyGraphql = (app: Application): Application => {
  server.applyMiddleware({ app })
  return app
}
