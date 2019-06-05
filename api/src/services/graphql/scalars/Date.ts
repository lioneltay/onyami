import { GraphQLScalarType } from "graphql"
import { Kind } from "graphql/language"

export const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",

  // value from the client
  parseValue(value) {
    return new Date(value)
  },

  // value sent to the client
  serialize(value: Date) {
    return value.toISOString()
  },

  // ast value is always in string format
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }

    throw Error("Date literal should be in ISO string format")
  },
})
