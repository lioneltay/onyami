import React from "react"
import { noopTemplate as css } from "lib/utils"

import AceEditor, { AceEditorProps } from "react-ace"
import "brace"
import "brace/mode/typescript"
import "brace/mode/javascript"
import "brace/mode/markdown"
import "brace/theme/dracula"
import "brace/ext/language_tools"
import "brace/keybinding/vim"

export type CodeEditorProps = AceEditorProps

const CodeEditor = ({
  fontSize,
  className,
  style,
  ...rest
}: AceEditorProps) => {
  return (
    <AceEditor
      css={css`
        & * {
          font-size: ${fontSize};
          font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
            "source-code-pro", monospace;
        }
      `}
      {...rest}
      className={className}
      style={style}
      fontSize={fontSize}
    />
  )
}

export default CodeEditor
