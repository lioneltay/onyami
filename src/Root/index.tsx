/// <reference types="styled-components/cssprop" />

import React from "react"
import { render } from "react-dom"

import App from "./App"
import { BrowserRouter } from "react-router-dom"

import { createGenerateClassName, jssPreset } from "@material-ui/core/styles"
import { create } from "jss"
import { JssProvider } from "react-jss"

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")!,
})

const generateClassName = createGenerateClassName()

export default () => {
  return (
    <div css={``}>
      <BrowserRouter>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <App />
        </JssProvider>
      </BrowserRouter>
    </div>
  )
}
