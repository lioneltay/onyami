import React, { useState, Fragment } from "react"
import { noopTemplate as css } from "lib/utils"

import { Link } from "react-router-dom"
import {
  Paper,
  Text,
  IconButton,
  Modal,
  Button,
  TextField,
} from "lib/components"
import { AddIcon, ClearIcon } from "lib/icons"

import { folderUrl } from "features/folder/routing"
import { createFolder } from "services/api/folders"

type FolderListProps = {
  folders: {
    id: ID
    name: string
    path: string
  }[]
}

const FolderGrid = ({ folders }: FolderListProps) => {
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
          <Link key={folder.id} to={folderUrl(folder.id)}>
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
              onClick={async () => {
                await createFolder({ name: folderName })
                setShow(false)
              }}
            >
              Create
            </Button>
          </div>
        </Paper>
      </Modal>
    </Fragment>
  )
}

export default FolderGrid
