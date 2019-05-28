import React, { useEffect, useState, Fragment } from "react"
import { noopTemplate as css } from "lib/utils"

import { getDocuments } from "./api"

import {
  Text,
  Paper,
  IconButton,
  Modal,
  Button,
  TextField,
} from "lib/components"
import { AddIcon, ClearIcon } from "lib/icons"
import { Link } from "react-router-dom"

import { documentUrl, newDocumentUrl } from "features/document-editor/routing"

export const Page = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [folders, setFolders] = useState<Folder[]>([])

  useEffect(() => {
    getDocuments().then(docs => setDocuments(docs))
  }, [])

  return (
    <div>
      <Text className="ml-4" variant="subtitle1">
        Documents
      </Text>

      {documents ? <DocumentList documents={documents} /> : null}

      <Text className="ml-4" variant="subtitle1">
        Folders
      </Text>

      {documents ? <FolderList folders={folders} /> : null}
    </div>
  )
}

type Document = {
  id: ID
  name: string
}

type DocumentListProps = {
  documents: Document[]
}

const DocumentList = ({ documents }: DocumentListProps) => {
  return (
    <div
      className="p-4"
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        grid-gap: 10px;
        justify-content: stretch;
        align-items: stretch;
      `}
    >
      {documents.map(doc => (
        <Link key={doc.id} to={documentUrl(doc.id)}>
          <Paper
            className="p-4"
            css={css`
              height: 100%;
            `}
          >
            <Text>{doc.name || "Untitled Document"}</Text>
          </Paper>
        </Link>
      ))}

      <Link to={newDocumentUrl()}>
        <Paper
          className="fj-c fa-c"
          css={css`
            height: 100%;
          `}
        >
          <IconButton>
            <AddIcon />
          </IconButton>
        </Paper>
      </Link>
    </div>
  )
}

type Folder = {
  id: ID
  name: string
}

type FolderListProps = {
  folders: Folder[]
}

const FolderList = ({ folders }: FolderListProps) => {
  const [show, setShow] = useState(false)
  const [folderName, setFolderName] = useState("Untitled folder")

  return (
    <Fragment>
      <div
        className="p-4"
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          grid-gap: 10px;
          justify-content: stretch;
          align-items: stretch;
        `}
      >
        {folders.map(folder => (
          <Link key={folder.id} to={documentUrl(folder.id)}>
            <Paper
              className="p-4"
              css={css`
                height: 100%;
              `}
            >
              <Text>{folder.name || "Untitled Document"}</Text>
            </Paper>
          </Link>
        ))}

        <Paper className="fj-c fa-c" onClick={() => setShow(true)}>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Paper>
      </div>

      <Modal
        className="fa-c fj-c"
        disableAutoFocus
        css={css`
          position: relative;
        `}
        open={show}
        onClose={() => setShow(false)}
      >
        <Paper
          className="p-4"
          css={css`
            position: relative;
            width: 400px;
            max-width: 95vw;
          `}
          onKeyPress={e => {
            if (
              e.nativeEvent.code === "Enter" ||
              e.nativeEvent.code === "NumpadEnter"
            ) {
              console.log("Enter")
            }
          }}
        >
          <div className="fa-c fj-sb">
            <Text variant="h5">New folder</Text>

            <IconButton>
              <ClearIcon />
            </IconButton>
          </div>

          <TextField
            autoFocus
            fullWidth
            value={folderName}
            onChange={e => setFolderName(e.target.value)}
          />

          <div className="fj-e mt-4">
            <Button onClick={() => setShow(false)}>Cancel</Button>
            <Button
              className="ml-3"
              variant="contained"
              color="primary"
              onClick={() => setShow(false)}
            >
              Create
            </Button>
          </div>
        </Paper>
      </Modal>
    </Fragment>
  )
}
