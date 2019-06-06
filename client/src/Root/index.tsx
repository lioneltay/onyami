/// <reference types="styled-components/cssprop" />

import React from "react"

import App from "./App"

import { BrowserRouter } from "react-router-dom"
import MaterialUIProvider from "./wrappers/material-ui"
import ApolloProvider from "./wrappers/apollo"

export default () => {
  return (
    <BrowserRouter>
      <ApolloProvider>
        <MaterialUIProvider>
          <App />
        </MaterialUIProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}
