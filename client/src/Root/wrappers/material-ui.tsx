import React from "react"
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles"
import { create } from "jss"
import { JssProvider } from "react-jss"

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")!,
})

const generateClassName = createGenerateClassName()

type Props = {
  children: React.ReactNode
}

export default ({ children }: Props) => {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      {children}
    </JssProvider>
  )
}
