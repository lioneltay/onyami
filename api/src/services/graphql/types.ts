import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql"
import { ResolverContext } from "services/graphql/contextType"
export type Maybe<T> = T | null
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: Date
  URL: string
}

export type CreateDocumentData = {
  folderId?: Maybe<Scalars["ID"]>
  name: Scalars["String"]
  content: Scalars["String"]
}

export type CreateDocumentInput = {
  data: CreateDocumentData
}

export type CreateFolderData = {
  parentId?: Maybe<Scalars["ID"]>
  name: Scalars["String"]
}

export type CreateFolderInput = {
  data: CreateFolderData
}

export type DeleteDocumentInput = {
  id: Scalars["ID"]
}

export type DeleteFolderInput = {
  id: Scalars["ID"]
}

export type Document = {
  __typename?: "Document"
  id: Scalars["ID"]
  folderId?: Maybe<Scalars["ID"]>
  createdAt: Scalars["Date"]
  name: Scalars["String"]
  content: Scalars["String"]
  folder?: Maybe<Folder>
}

export type Folder = {
  __typename?: "Folder"
  id: Scalars["ID"]
  parentId?: Maybe<Scalars["ID"]>
  createdAt: Scalars["Date"]
  name: Scalars["String"]
  parent?: Maybe<Folder>
  ancestors?: Maybe<Array<Folder>>
  children: Array<Folder>
  documents: Array<Document>
}

export type FolderInput = {
  id: Scalars["ID"]
}

export type MoveDocumentInput = {
  documentId: Scalars["ID"]
  fromFolderId: Scalars["ID"]
  toFolderId: Scalars["ID"]
}

export type MoveFolderInput = {
  folderId: Scalars["ID"]
  fromFolderId: Scalars["ID"]
  toFolderId: Scalars["ID"]
}

export type Mutation = {
  __typename?: "Mutation"
  createDocument?: Maybe<Document>
  createFolder?: Maybe<Folder>
  deleteDocument: Scalars["ID"]
  deleteFolder: Scalars["ID"]
  moveDocument: Document
  moveFolder: Folder
  ping?: Maybe<Scalars["String"]>
  updateDocument?: Maybe<Document>
  updateFolder?: Maybe<Folder>
}

export type MutationCreateDocumentArgs = {
  input: CreateDocumentInput
}

export type MutationCreateFolderArgs = {
  input: CreateFolderInput
}

export type MutationDeleteDocumentArgs = {
  input: DeleteDocumentInput
}

export type MutationDeleteFolderArgs = {
  input: DeleteFolderInput
}

export type MutationMoveDocumentArgs = {
  input: MoveDocumentInput
}

export type MutationMoveFolderArgs = {
  input: MoveFolderInput
}

export type MutationUpdateDocumentArgs = {
  input: UpdateDocumentInput
}

export type MutationUpdateFolderArgs = {
  input: UpdateFolderInput
}

export type Query = {
  __typename?: "Query"
  documents: Array<Document>
  folder: Folder
  folders: Array<Folder>
  date: Scalars["Date"]
  url: Scalars["URL"]
  rootFolders: Array<Folder>
}

export type QueryFolderArgs = {
  input: FolderInput
}

export type QueryDateArgs = {
  date: Scalars["Date"]
}

export type QueryUrlArgs = {
  url: Scalars["URL"]
}

export type UpdateDocumentData = {
  folderId?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  content?: Maybe<Scalars["String"]>
}

export type UpdateDocumentInput = {
  id: Scalars["ID"]
  data: UpdateDocumentData
}

export type UpdateFolderData = {
  parentId?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
}

export type UpdateFolderInput = {
  id: Scalars["ID"]
  data: UpdateFolderData
}

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {}
  Document: any
  ID: string
  Date: Date
  String: string
  Folder: any
  FolderInput: any
  URL: string
  Mutation: {}
  CreateDocumentInput: any
  CreateDocumentData: any
  CreateFolderInput: any
  CreateFolderData: any
  DeleteDocumentInput: any
  DeleteFolderInput: any
  MoveDocumentInput: any
  MoveFolderInput: any
  UpdateDocumentInput: any
  UpdateDocumentData: any
  UpdateFolderInput: any
  UpdateFolderData: any
  Boolean: boolean
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date"
}

export type DocumentResolvers<
  ContextType = ResolverContext,
  ParentType = ResolversTypes["Document"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  folderId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  folder?: Resolver<Maybe<ResolversTypes["Folder"]>, ParentType, ContextType>
}

export type FolderResolvers<
  ContextType = ResolverContext,
  ParentType = ResolversTypes["Folder"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  parentId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  parent?: Resolver<Maybe<ResolversTypes["Folder"]>, ParentType, ContextType>
  ancestors?: Resolver<
    Maybe<Array<ResolversTypes["Folder"]>>,
    ParentType,
    ContextType
  >
  children?: Resolver<Array<ResolversTypes["Folder"]>, ParentType, ContextType>
  documents?: Resolver<
    Array<ResolversTypes["Document"]>,
    ParentType,
    ContextType
  >
}

export type MutationResolvers<
  ContextType = ResolverContext,
  ParentType = ResolversTypes["Mutation"]
> = {
  createDocument?: Resolver<
    Maybe<ResolversTypes["Document"]>,
    ParentType,
    ContextType,
    MutationCreateDocumentArgs
  >
  createFolder?: Resolver<
    Maybe<ResolversTypes["Folder"]>,
    ParentType,
    ContextType,
    MutationCreateFolderArgs
  >
  deleteDocument?: Resolver<
    ResolversTypes["ID"],
    ParentType,
    ContextType,
    MutationDeleteDocumentArgs
  >
  deleteFolder?: Resolver<
    ResolversTypes["ID"],
    ParentType,
    ContextType,
    MutationDeleteFolderArgs
  >
  moveDocument?: Resolver<
    ResolversTypes["Document"],
    ParentType,
    ContextType,
    MutationMoveDocumentArgs
  >
  moveFolder?: Resolver<
    ResolversTypes["Folder"],
    ParentType,
    ContextType,
    MutationMoveFolderArgs
  >
  ping?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  updateDocument?: Resolver<
    Maybe<ResolversTypes["Document"]>,
    ParentType,
    ContextType,
    MutationUpdateDocumentArgs
  >
  updateFolder?: Resolver<
    Maybe<ResolversTypes["Folder"]>,
    ParentType,
    ContextType,
    MutationUpdateFolderArgs
  >
}

export type QueryResolvers<
  ContextType = ResolverContext,
  ParentType = ResolversTypes["Query"]
> = {
  documents?: Resolver<
    Array<ResolversTypes["Document"]>,
    ParentType,
    ContextType
  >
  folder?: Resolver<
    ResolversTypes["Folder"],
    ParentType,
    ContextType,
    QueryFolderArgs
  >
  folders?: Resolver<Array<ResolversTypes["Folder"]>, ParentType, ContextType>
  date?: Resolver<
    ResolversTypes["Date"],
    ParentType,
    ContextType,
    QueryDateArgs
  >
  url?: Resolver<ResolversTypes["URL"], ParentType, ContextType, QueryUrlArgs>
  rootFolders?: Resolver<
    Array<ResolversTypes["Folder"]>,
    ParentType,
    ContextType
  >
}

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["URL"], any> {
  name: "URL"
}

export type Resolvers<ContextType = ResolverContext> = {
  Date?: GraphQLScalarType
  Document?: DocumentResolvers<ContextType>
  Folder?: FolderResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  URL?: GraphQLScalarType
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>
