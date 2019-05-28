import React, { Fragment } from "react"
import { hot } from "react-hot-loader"

import { GlobalStyles } from "services/theme"

import { Switch, Route, Redirect } from "react-router-dom"

import { Page as SandboxPage } from "features/sandbox"
import { Page as DocumentEditorPage } from "features/document-editor"
import { Page as DocumentsPage } from "features/documents"

const App = () => {
  return (
    <Fragment>
      <GlobalStyles />

      <Switch>
        <Route path="/documents" component={DocumentsPage} />
        <Route path="/document/:documentId?" component={DocumentEditorPage} />
        <Route path="/sandbox" component={SandboxPage} />

        <Route render={() => <Redirect to="documents" />} />
      </Switch>
    </Fragment>
  )
}

export default hot(module)(App)
