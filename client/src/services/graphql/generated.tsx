import gql from "graphql-tag"
import * as React from "react"
import * as ReactApollo from "react-apollo"
export type Maybe<T> = T | null
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date custom scalar type */
  Date: Date
  /** URL custom scalar type */
  URL: string
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export enum ICacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type ICreateDocumentData = {
  folderId?: Maybe<Scalars["ID"]>
  name: Scalars["String"]
  content: Scalars["String"]
}

export type ICreateDocumentInput = {
  data: ICreateDocumentData
}

export type ICreateFolderData = {
  parentId?: Maybe<Scalars["ID"]>
  name: Scalars["String"]
}

export type ICreateFolderInput = {
  data: ICreateFolderData
}

export type IDeleteDocumentInput = {
  id: Scalars["ID"]
}

export type IDeleteFolderInput = {
  id: Scalars["ID"]
}

export type IDocument = {
  __typename?: "Document"
  id: Scalars["ID"]
  folderId?: Maybe<Scalars["ID"]>
  createdAt: Scalars["Date"]
  name: Scalars["String"]
  content: Scalars["String"]
  folder?: Maybe<IFolder>
}

export type IFolder = {
  __typename?: "Folder"
  id: Scalars["ID"]
  parentId?: Maybe<Scalars["ID"]>
  createdAt: Scalars["Date"]
  name: Scalars["String"]
  parent?: Maybe<IFolder>
  /** Ordered by ...Ancestors -> ... -> Parent */
  ancestors?: Maybe<Array<IFolder>>
  children: Array<IFolder>
  documents: Array<IDocument>
}

export type IFolderInput = {
  id: Scalars["ID"]
}

export type IMoveDocumentInput = {
  documentId: Scalars["ID"]
  fromFolderId: Scalars["ID"]
  toFolderId: Scalars["ID"]
}

export type IMoveFolderInput = {
  folderId: Scalars["ID"]
  fromFolderId: Scalars["ID"]
  toFolderId: Scalars["ID"]
}

export type IMutation = {
  __typename?: "Mutation"
  ping?: Maybe<Scalars["String"]>
  createDocument?: Maybe<IDocument>
  createFolder?: Maybe<IFolder>
  deleteDocument: Scalars["ID"]
  deleteFolder: Scalars["ID"]
  moveDocument: IDocument
  moveFolder: IFolder
  updateDocument?: Maybe<IDocument>
  updateFolder?: Maybe<IFolder>
}

export type IMutationCreateDocumentArgs = {
  input: ICreateDocumentInput
}

export type IMutationCreateFolderArgs = {
  input: ICreateFolderInput
}

export type IMutationDeleteDocumentArgs = {
  input: IDeleteDocumentInput
}

export type IMutationDeleteFolderArgs = {
  input: IDeleteFolderInput
}

export type IMutationMoveDocumentArgs = {
  input: IMoveDocumentInput
}

export type IMutationMoveFolderArgs = {
  input: IMoveFolderInput
}

export type IMutationUpdateDocumentArgs = {
  input: IUpdateDocumentInput
}

export type IMutationUpdateFolderArgs = {
  input: IUpdateFolderInput
}

export type IQuery = {
  __typename?: "Query"
  date: Scalars["Date"]
  url: Scalars["URL"]
  documents: Array<IDocument>
  folder: IFolder
  folders: Array<IFolder>
  rootFolders: Array<IFolder>
}

export type IQueryDateArgs = {
  date: Scalars["Date"]
}

export type IQueryUrlArgs = {
  url: Scalars["URL"]
}

export type IQueryFolderArgs = {
  input: IFolderInput
}

export type IUpdateDocumentData = {
  folderId?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  content?: Maybe<Scalars["String"]>
}

export type IUpdateDocumentInput = {
  id: Scalars["ID"]
  data: IUpdateDocumentData
}

export type IUpdateFolderData = {
  parentId?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
}

export type IUpdateFolderInput = {
  id: Scalars["ID"]
  data: IUpdateFolderData
}

export type IRootFoldersQueryQueryVariables = {}

export type IRootFoldersQueryQuery = { __typename?: "Query" } & {
  rootFolders: Array<{ __typename?: "Folder" } & Pick<IFolder, "id">>
}

export type IRootDocumentsQueryQueryVariables = {}

export type IRootDocumentsQueryQuery = { __typename?: "Query" } & {
  documents: Array<{ __typename?: "Document" } & Pick<IDocument, "id" | "name">>
}

export const RootFoldersQueryDocument = gql`
  query RootFoldersQuery {
    rootFolders {
      id
    }
  }
`
export type RootFoldersQueryComponentProps = Omit<
  Omit<
    ReactApollo.QueryProps<
      IRootFoldersQueryQuery,
      IRootFoldersQueryQueryVariables
    >,
    "query"
  >,
  "variables"
> & { variables?: IRootFoldersQueryQueryVariables }

export const RootFoldersQueryComponent = (
  props: RootFoldersQueryComponentProps,
) => (
  <ReactApollo.Query<IRootFoldersQueryQuery, IRootFoldersQueryQueryVariables>
    query={RootFoldersQueryDocument}
    {...props}
  />
)

export const RootDocumentsQueryDocument = gql`
  query RootDocumentsQuery {
    documents {
      id
      name
    }
  }
`
export type RootDocumentsQueryComponentProps = Omit<
  Omit<
    ReactApollo.QueryProps<
      IRootDocumentsQueryQuery,
      IRootDocumentsQueryQueryVariables
    >,
    "query"
  >,
  "variables"
> & { variables?: IRootDocumentsQueryQueryVariables }

export const RootDocumentsQueryComponent = (
  props: RootDocumentsQueryComponentProps,
) => (
  <ReactApollo.Query<
    IRootDocumentsQueryQuery,
    IRootDocumentsQueryQueryVariables
  >
    query={RootDocumentsQueryDocument}
    {...props}
  />
)
