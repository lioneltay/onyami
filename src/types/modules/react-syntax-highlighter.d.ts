import { FunctionComponent } from "react"

declare module "react-syntax-highlighter" {
  export type PrismProps = {
    style?: any
    children: string
    language: "tsx"
  }

  export const Prism: FunctionComponent<PrismProps>
}
