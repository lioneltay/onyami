import React, { useEffect, useState, Fragment } from "react"
import { noopTemplate as css } from "lib/utils"

import { getDocuments } from "./api"
import { createFolder, getRootFolders } from "services/api/folders"

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

import { FolderGrid } from "components"


export const Page = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [folders, setFolders] = useState<Folder[]>([])

  useEffect(() => {
    getDocuments().then(docs => setDocuments(docs))
    getRootFolders().then(folders => setFolders(folders))
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

      {folders ? <FolderGrid folders={folders} /> : null}
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
