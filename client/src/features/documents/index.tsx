import React from "react"
import gql from "graphql-tag"
import { noopTemplate as css } from "lib/utils"

import { Text, Paper, IconButton } from "lib/components"
import { AddIcon } from "lib/icons"
import { Link } from "react-router-dom"

import { documentUrl, newDocumentUrl } from "features/document-editor/routing"

import { FolderGrid } from "components"

import {
  RootFoldersQueryComponent,
  RootDocumentsQueryComponent,
} from "services/graphql/generated"

gql`
  query RootFoldersQuery {
    rootFolders {
      id
      name
    }
  }
`

gql`
  query RootDocumentsQuery {
    documents {
      id
      name
    }
  }
`

export const Page = () => {
  return (
    <div>
      <Text className="ml-4" variant="subtitle1">
        Documents
      </Text>

      <RootDocumentsQueryComponent>
        {res => {
          if (!res.data || !res.data.documents) {
            return null
          }

          return <DocumentList documents={res.data.documents} />
        }}
      </RootDocumentsQueryComponent>

      <Text className="ml-4" variant="subtitle1">
        Folders
      </Text>

      <RootFoldersQueryComponent>
        {res => {
          if (!res.data || !res.data.rootFolders) {
            return null
          }

          return <FolderGrid folders={res.data.rootFolders} />
        }}
      </RootFoldersQueryComponent>
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
