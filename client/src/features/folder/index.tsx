import React, { useEffect, useState, Fragment } from "react"
import { RouteComponentProps } from "react-router-dom"
import { noopTemplate as css } from "lib/utils"

// import { getDocuments } from "./api"
import { getRootFolders } from "services/api/folders"

import { Text } from "lib/components"
import { AddIcon, ClearIcon } from "lib/icons"
import { Link } from "react-router-dom"

import { documentUrl, newDocumentUrl } from "features/document-editor/routing"
import { FolderGrid } from "components"

type PageProps = RouteComponentProps<{ folderId: string }>

export const Page = ({ match }: PageProps) => {
  const [folders, setFolders] = useState<Folder[]>([])

  useEffect(() => {
    getRootFolders().then(folders => setFolders(folders))
  }, [])

  return (
    <div>
      <Text className="ml-4" variant="subtitle1">
        Folders
      </Text>

      {folders ? <FolderGrid folders={folders} /> : null}
    </div>
  )
}
