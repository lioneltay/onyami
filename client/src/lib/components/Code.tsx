import React from "react"
import { noopTemplate as css } from "lib/utils"
import { Prism, PrismProps } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/styles/prism"

// console.log(JSON.stringify(tomorrow, null, 2))

const theme = {
  'code[class*="language-"]': {
    color: "#ccc",
    background: "none",
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    borderRadius: "12px",
    color: "#ccc",
    background: "rgb(1, 22, 39)",
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    padding: "1em",
    margin: ".5em 0",
    overflow: "auto",
  },
  ':not(pre) > code[class*="language-"]': {
    background: "#2d2d2d",
    padding: ".1em",
    borderRadius: ".3em",
    whiteSpace: "normal",
  },
  comment: {
    color: "#999",
  },
  "block-comment": {
    color: "#999",
  },
  prolog: {
    color: "#999",
  },
  doctype: {
    color: "#999",
  },
  cdata: {
    color: "#999",
  },
  punctuation: {
    color: "#ccc",
  },
  tag: {
    color: "#e2777a",
  },
  "attr-name": {
    color: "#e2777a",
  },
  namespace: {
    color: "#e2777a",
  },
  deleted: {
    color: "#e2777a",
  },
  "function-name": {
    color: "#6196cc",
  },
  boolean: {
    color: "#82aaff",
  },
  number: {
    color: "#82aaff",
  },
  function: {
    color: "#82aaff",
  },
  property: {
    color: "#f8c555",
  },
  "class-name": {
    color: "#f8c555",
  },
  constant: {
    color: "#f8c555",
  },
  symbol: {
    color: "#f8c555",
  },
  selector: {
    color: "#ffa7c4",
  },
  important: {
    color: "#ffa7c4",
    fontWeight: "bold",
  },
  atrule: {
    color: "#ffa7c4",
  },
  keyword: {
    color: "#ffa7c4",
  },
  builtin: {
    color: "#ffa7c4",
  },
  string: {
    color: "#addb67",
  },
  char: {
    color: "#addb67",
  },
  "attr-value": {
    color: "#addb67",
  },
  regex: {
    color: "#addb67",
  },
  variable: {
    color: "#addb67",
  },
  operator: {
    color: "#67cdcc",
  },
  entity: {
    color: "#67cdcc",
    cursor: "help",
  },
  url: {
    color: "#67cdcc",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  inserted: {
    color: "green",
  },
}

type Props = Stylable &
  Omit<PrismProps, "language" | "children"> & {
    language?: PrismProps["language"]
    value?: string
    source?: string
    children?: string
  }

export default ({
  style,
  className,
  language,
  source,
  value,
  children,
}: Props) => {
  return (
    <div
      css={css`
        & * {
          font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
        }
      `}
    >
      <Prism style={theme} language={language || "tsx"}>
        {value || source || children || ""}
      </Prism>
    </div>
  )
}

// import * as themes from "react-syntax-highlighter/dist/styles/prism"

// export default ({ language, value, source, children }: Props) => {
//   return Object.entries(themes).map(([key, val]) => (
//     <div>
//       <h1>{key}</h1>
//       <Prism language={language || "tsx"} style={val}>
//         {value || source || children || ""}
//       </Prism>
//     </div>
//   ))
// }
