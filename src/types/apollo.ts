export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type EditPostDto = {
  _id: Scalars['ObjectId']['input'];
  category: PostCategory;
  content: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export enum FilterOperator {
  Eq = 'EQ',
  Exists = 'EXISTS',
  Gt = 'GT',
  Gte = 'GTE',
  In = 'IN',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE',
  Nin = 'NIN'
}

export type InputFilter = {
  isObjectId?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  operator: FilterOperator;
  value: Scalars['JSON']['input'];
};

export type InputSort = {
  direction: SortDirection;
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _refresh: RefreshDto;
  editPost: Post;
  increasePostViewCount?: Maybe<Post>;
  login: UserDto;
  logout: UserDto;
  refresh: UserDto;
  uploadImage: Scalars['String']['output'];
  writePost: Post;
};


export type MutationEditPostArgs = {
  editPostDto: EditPostDto;
};


export type MutationIncreasePostViewCountArgs = {
  postId: Scalars['ObjectId']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUploadImageArgs = {
  fileData: Scalars['Upload']['input'];
};


export type MutationWritePostArgs = {
  writePostDto: WritePostDto;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNext: Scalars['Boolean']['output'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ObjectId']['output'];
  category: PostCategory;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  numId: Scalars['Int']['output'];
  pickedAt?: Maybe<Scalars['DateTime']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserDto;
  viewCount: Scalars['Int']['output'];
};

export enum PostCategory {
  Dev = 'DEV',
  Diary = 'DIARY'
}

export type PostConnection = {
  __typename?: 'PostConnection';
  nodes?: Maybe<Array<Post>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PostTag = {
  __typename?: 'PostTag';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  me: UserDto;
  post: Post;
  postTagCounts: Array<PostTag>;
  posts: PostConnection;
};


export type QueryPostArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryPostsArgs = {
  filter?: InputMaybe<Array<InputFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputSort>>;
};

export type RefreshDto = {
  __typename?: 'RefreshDto';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UserDto = {
  __typename?: 'UserDto';
  _id: Scalars['ObjectId']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  role: UserRole;
  userId: Scalars['String']['output'];
};

export enum UserRole {
  Admin = 'ADMIN'
}

export type WritePostDto = {
  category: PostCategory;
  content: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type WriteBlogPostMutationVariables = Exact<{
  writePostDto: WritePostDto;
}>;


export type WriteBlogPostMutation = { __typename?: 'Mutation', writePost: { __typename?: 'Post', _id: any, category: PostCategory, title: string, content: string, thumbnail?: string | null, tags?: Array<string> | null, viewCount: number, createdAt: any, updatedAt: any, deletedAt?: any | null } };

export type EditBlogPostMutationVariables = Exact<{
  editPostDto: EditPostDto;
}>;


export type EditBlogPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'Post', _id: any, category: PostCategory, title: string, content: string, thumbnail?: string | null, tags?: Array<string> | null, viewCount: number, createdAt: any, updatedAt: any, deletedAt?: any | null } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'UserDto', _id: any, role: UserRole, firstName: string, lastName: string, userId: string } };

export type GetPostsQueryVariables = Exact<{
  filter?: InputMaybe<Array<InputFilter> | InputFilter>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputSort> | InputSort>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNext: boolean }, nodes?: Array<{ __typename?: 'Post', _id: any, category: PostCategory, title: string, content: string, thumbnail?: string | null, tags?: Array<string> | null, viewCount: number, createdAt: any, updatedAt: any, deletedAt?: any | null }> | null } };

export type GetPostViewCountQueryVariables = Exact<{
  id: Scalars['ObjectId']['input'];
}>;


export type GetPostViewCountQuery = { __typename?: 'Query', post: { __typename?: 'Post', _id: any, viewCount: number } };

export type IncreasePostViewCountMutationVariables = Exact<{
  postId: Scalars['ObjectId']['input'];
}>;


export type IncreasePostViewCountMutation = { __typename?: 'Mutation', increasePostViewCount?: { __typename?: 'Post', _id: any, viewCount: number } | null };

export type GetPostTagCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostTagCountsQuery = { __typename?: 'Query', postTagCounts: Array<{ __typename?: 'PostTag', count: number, name: string }> };

export type UploadImageMutationVariables = Exact<{
  fileData: Scalars['Upload']['input'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: string };

export type LoginMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserDto', _id: any, role: UserRole, firstName: string, lastName: string, userId: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'UserDto', _id: any } };

export type ServerRefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type ServerRefreshMutation = { __typename?: 'Mutation', _refresh: { __typename?: 'RefreshDto', accessToken: string, refreshToken: string } };

export type GetPostQueryVariables = Exact<{
  id: Scalars['ObjectId']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', post: { __typename?: 'Post', _id: any, category: PostCategory, title: string, content: string, thumbnail?: string | null, tags?: Array<string> | null, viewCount: number, createdAt: any, updatedAt: any, deletedAt?: any | null, user: { __typename?: 'UserDto', _id: any, firstName: string, lastName: string, userId: string } } };
