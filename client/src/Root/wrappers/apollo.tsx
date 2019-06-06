import React from "react"
import { ApolloProvider } from "react-apollo"
import { client } from "services/graphql"

type Props = {
  children: React.ReactNode
}

export default ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
