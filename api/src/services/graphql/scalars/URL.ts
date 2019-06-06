import { GraphQLScalarType } from "graphql"
import { Kind } from "graphql/language"

import { isUri } from "valid-url"

export const URLScalar = new GraphQLScalarType({
  name: "URL",
  description: "URL custom scalar type",

  // value from the client
  parseValue(value: string) {
    if (!isUri(value)) {
      throw Error(`Expected Url, got ${value}`)
    }
    return value
  },

  // value sent to the client
  serialize(value: string) {
    if (!isUri(value)) {
      throw Error(`Expected Url, got ${value}`)
    }
    return value
  },

  // ast value is always in string format
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if (!isUri(ast.value)) {
        throw Error(`Expected Url, got ${ast.value}`)
      }
      return ast.value
    }

    throw Error("Invalid URL")
  },
})
