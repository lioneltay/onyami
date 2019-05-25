import {
  createDocument,
  Document,
  getDocument,
  updateDocument,
  deleteDocument,
} from "features/document-editor/api"
import { Button, CodeEditor, Markdown } from "lib/components"
import { debounce, noopTemplate as css } from "lib/utils"
import mdParsers from "prettier/parser-markdown"
import tsParsers from "prettier/parser-typescript"
import { format } from "prettier/standalone"
import React, { useEffect, useMemo, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import Header from "./Header"

const plugins = [mdParsers, tsParsers]

type Props = RouteComponentProps<{ documentId: string | undefined }> & {}

export const Page = ({ history, match }: Props) => {
  const documentId = match.params.documentId
  const [document, setDocument] = useState<Document | null>(null)

  useEffect(() => {
    if (documentId) {
      getDocument(documentId).then(document => {
        if (document) {
          setDocument(document)
          setContent(document.content)
        }
      })
    }
  }, [documentId])

  const [fontSize, setFontSize] = useState(14)
  const [content, setContent] = useState("")

  const persistDocumentDebounced = useMemo(
    () => debounce(5000, (source: string) => persistDocument(source)),
    [],
  )

  const persistDocument = async (source: string) => {
    if (document) {
      updateDocument({
        documentId: document.id,
        data: { content },
      })
    } else {
      const document = await createDocument({ content })
      history.push(`/document/${document.id}`)
    }
  }

  if (!document) {
    return <h1>Loading...</h1>
  }

  const formatDocument = () =>
    setContent(
      format(content, {
        parser: "markdown",
        plugins,
        singleQuote: false,
        printWidth: 80,
        semi: false,
        trailingComma: "all",
      }),
    )

  return (
    <div
      css={css`
        display: grid;
        height: 100vh;
        grid-template-rows: auto minmax(0, 1fr);
        grid-template-columns: 1fr 1fr;
      `}
    >
      <Header
        css={css`
          grid-column: span 2;
        `}
      />

      <div
        className="fd-c"
        onKeyDown={e => {
          const code = e.nativeEvent.code

          if (e.metaKey && code === "KeyS") {
            e.preventDefault()
            e.stopPropagation()
            persistDocument(content)
          }

          if (e.altKey && e.shiftKey && code === "KeyF") {
            e.preventDefault()
            e.stopPropagation()
            formatDocument()
          }
        }}
      >
        <div>
          <Button onClick={() => setFontSize(size => size + 1)}>+</Button>
          <Button onClick={() => setFontSize(size => size - 1)}>-</Button>

          <Button onClick={formatDocument}>Format</Button>

          <Button onClick={() => persistDocument(content)}>Save</Button>
          {document ? (
            <Button onClick={() => deleteDocument(document.id)}>Delete</Button>
          ) : null}
        </div>

        <CodeEditor
          className="fg-1"
          css={css`
            min-height: 0;
            /* height: 100%; */
            /* max-height: 100%; */
          `}
          style={{ width: "100%" }}
          mode="markdown"
          theme="dracula"
          name="blah2"
          keyboardHandler="vim"
          value={content}
          onChange={source => {
            setContent(source)

            // Only auto save new documents
            if (documentId) {
              persistDocumentDebounced(source)
            }
          }}
          fontSize={fontSize}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>

      <div
        className="p-4"
        css={css`
          min-height: 0;
          height: 100%;
          max-height: 100%;
          overflow: auto;

          width: 100%;
          max-width: 1000px;
          margin: auto;
        `}
      >
        <Markdown source={content} />
      </div>
    </div>
  )
}
