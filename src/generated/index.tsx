import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};


export type Message = {
  readonly __typename: 'Message',
  readonly id: Scalars['ID'],
  readonly sender: User,
  readonly text: Scalars['String'],
  readonly respondsTo: Maybe<Message>,
  readonly createdAt: Scalars['DateTime'],
  readonly isEdited: Scalars['Boolean'],
};

export type MessageCreateInput = {
  readonly text: Scalars['String'],
  readonly respondsToId?: Maybe<Scalars['String']>,
};

export type MessageWhereInput = {
  readonly before?: Maybe<Scalars['DateTime']>,
  readonly after?: Maybe<Scalars['DateTime']>,
  readonly around?: Maybe<Scalars['ID']>,
};

export type Messenger = {
  readonly __typename: 'Messenger',
  readonly id: Scalars['ID'],
  readonly title: Scalars['String'],
  readonly admin: User,
  readonly members: User,
  readonly pinnedMessage: Maybe<Message>,
  readonly messages: ReadonlyArray<Message>,
  readonly numUnreadMessages: Scalars['Int'],
};


export type MessengerMessagesArgs = {
  where: MessageWhereInput
};

export type MessengerCreateInput = {
  readonly title: Scalars['String'],
  readonly memberIds: ReadonlyArray<Scalars['ID']>,
};

export type Mutation = {
  readonly __typename: 'Mutation',
  /** 
 * Closes all caller's active sessions except current one. To close current
   * session, use logOut instead. Returns the remaining (active) session
 */
  readonly closeAllSessionsExceptCurrent: Session,
  /** Logs caller out */
  readonly logOut: Scalars['Boolean'],
  readonly refreshAccessToken: Scalars['String'],
  /** Registers new user in the system */
  readonly signUp: Tokens,
  readonly logIn: Tokens,
  readonly changePassword: Scalars['Boolean'],
  readonly deleteAccount: Scalars['Boolean'],
  readonly createMessenger: Messenger,
  readonly deleteMessenger: Scalars['ID'],
  readonly leaveMessenger: Scalars['ID'],
  readonly pinMessage: Messenger,
  readonly markAsRead: Messenger,
  readonly postMessage: Message,
  readonly editMessage: Message,
  readonly deleteMessage: Scalars['ID'],
};


export type MutationRefreshAccessTokenArgs = {
  refreshToken: Scalars['String']
};


export type MutationSignUpArgs = {
  input: UserCreateInput
};


export type MutationLogInArgs = {
  password: Scalars['String'],
  login: Scalars['String']
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'],
  oldPassword: Scalars['String']
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String']
};


export type MutationCreateMessengerArgs = {
  input: MessengerCreateInput
};


export type MutationDeleteMessengerArgs = {
  id: Scalars['ID']
};


export type MutationLeaveMessengerArgs = {
  id: Scalars['ID']
};


export type MutationPinMessageArgs = {
  messageId: Maybe<Scalars['ID']>,
  messengerId: Scalars['ID']
};


export type MutationMarkAsReadArgs = {
  messengerId: Scalars['ID']
};


export type MutationPostMessageArgs = {
  input: MessageCreateInput,
  messengerId: Scalars['ID']
};


export type MutationEditMessageArgs = {
  newText: Scalars['String'],
  id: Scalars['ID']
};


export type MutationDeleteMessageArgs = {
  id: Scalars['ID']
};

export type Node = {
  readonly __typename: 'Node',
  readonly id: Scalars['ID'],
};

export type Query = {
  readonly __typename: 'Query',
  /** Returns the list of all caller's active sessions */
  readonly sessions: ReadonlyArray<Session>,
  /** Returns caller's account metadata */
  readonly self: User,
  readonly user: Maybe<User>,
  readonly messenger: Messenger,
  readonly messengers: ReadonlyArray<Messenger>,
};


export type QueryUserArgs = {
  login: Scalars['String']
};


export type QueryMessengerArgs = {
  id: Scalars['ID']
};

export type Session = {
  readonly __typename: 'Session',
  readonly id: Scalars['ID'],
  readonly lastUsed: Scalars['DateTime'],
};

export type Subscription = {
  readonly __typename: 'Subscription',
  readonly userInvitedToMessenger: Messenger,
  readonly userLeftMessenger: Messenger,
  readonly pinMessageChanged: Messenger,
  readonly messengerDeleted: Scalars['ID'],
  readonly messagePosted: Message,
  readonly messageEdited: Message,
  readonly messageDeleted: Scalars['ID'],
};


export type SubscriptionUserLeftMessengerArgs = {
  messengerId: Scalars['String']
};


export type SubscriptionPinMessageChangedArgs = {
  messengerId: Scalars['String']
};


export type SubscriptionMessengerDeletedArgs = {
  id: Scalars['String']
};


export type SubscriptionMessagePostedArgs = {
  messengerId: Scalars['ID']
};


export type SubscriptionMessageEditedArgs = {
  messengerId: Scalars['ID']
};


export type SubscriptionMessageDeletedArgs = {
  messengerId: Scalars['ID']
};

export type Tokens = {
  readonly __typename: 'Tokens',
  readonly accessToken: Scalars['String'],
  readonly refreshToken: Scalars['String'],
};

export type User = {
  readonly __typename: 'User',
  readonly id: Scalars['ID'],
  readonly login: Scalars['String'],
};

export type UserCreateInput = {
  readonly login: Scalars['String'],
  readonly password: Scalars['String'],
};

export type LogInMutationVariables = {
  login: Scalars['String'],
  password: Scalars['String']
};


export type LogInMutation = (
  { readonly __typename: 'Mutation' }
  & { readonly logIn: (
    { readonly __typename: 'Tokens' }
    & BothTokensFragment
  ) }
);

export type SignUpMutationVariables = {
  input: UserCreateInput
};


export type SignUpMutation = (
  { readonly __typename: 'Mutation' }
  & { readonly signUp: (
    { readonly __typename: 'Tokens' }
    & BothTokensFragment
  ) }
);

export type BothTokensFragment = (
  { readonly __typename: 'Tokens' }
  & Pick<Tokens, 'accessToken' | 'refreshToken'>
);

export type LogOutMutationVariables = {};


export type LogOutMutation = (
  { readonly __typename: 'Mutation' }
  & Pick<Mutation, 'logOut'>
);

export type CreateMessengerMutationVariables = {
  input: MessengerCreateInput
};


export type CreateMessengerMutation = (
  { readonly __typename: 'Mutation' }
  & { readonly createMessenger: (
    { readonly __typename: 'Messenger' }
    & MessengerBasicFragment
  ) }
);

export type UserQueryVariables = {
  login: Scalars['String']
};


export type UserQuery = (
  { readonly __typename: 'Query' }
  & { readonly user: Maybe<(
    { readonly __typename: 'User' }
    & UserDataFragment
  )> }
);

export type MessengersQueryVariables = {};


export type MessengersQuery = (
  { readonly __typename: 'Query' }
  & { readonly messengers: ReadonlyArray<(
    { readonly __typename: 'Messenger' }
    & MessengerBasicFragment
  )> }
);

export type UserInvitedToMessengerSubscriptionVariables = {};


export type UserInvitedToMessengerSubscription = (
  { readonly __typename: 'Subscription' }
  & { readonly userInvitedToMessenger: (
    { readonly __typename: 'Messenger' }
    & MessengerBasicFragment
  ) }
);

export type DeleteMessageMutationVariables = {
  id: Scalars['ID']
};


export type DeleteMessageMutation = (
  { readonly __typename: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type MessageDataFragment = (
  { readonly __typename: 'Message' }
  & Pick<Message, 'id' | 'text' | 'isEdited' | 'createdAt'>
  & { readonly respondsTo: Maybe<(
    { readonly __typename: 'Message' }
    & Pick<Message, 'id' | 'text'>
    & { readonly sender: (
      { readonly __typename: 'User' }
      & UserDataFragment
    ) }
  )>, readonly sender: (
    { readonly __typename: 'User' }
    & UserDataFragment
  ) }
);

export type ViewerIdQueryVariables = {};


export type ViewerIdQuery = (
  { readonly __typename: 'Query' }
  & { readonly self: (
    { readonly __typename: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type MessageDeletedSubscriptionVariables = {
  messengerId: Scalars['ID']
};


export type MessageDeletedSubscription = (
  { readonly __typename: 'Subscription' }
  & Pick<Subscription, 'messageDeleted'>
);

export type MessagePostedSubscriptionVariables = {
  messengerId: Scalars['ID']
};


export type MessagePostedSubscription = (
  { readonly __typename: 'Subscription' }
  & { readonly messagePosted: (
    { readonly __typename: 'Message' }
    & MessageDataFragment
  ) }
);

export type MessageEditedSubscriptionVariables = {
  messengerId: Scalars['ID']
};


export type MessageEditedSubscription = (
  { readonly __typename: 'Subscription' }
  & { readonly messageEdited: (
    { readonly __typename: 'Message' }
    & MessageDataFragment
  ) }
);

export type MessengerQueryVariables = {
  id: Scalars['ID'],
  around?: Maybe<Scalars['ID']>
};


export type MessengerQuery = (
  { readonly __typename: 'Query' }
  & { readonly self: (
    { readonly __typename: 'User' }
    & Pick<User, 'id'>
  ), readonly messenger: (
    { readonly __typename: 'Messenger' }
    & Pick<Messenger, 'id'>
    & { readonly messages: ReadonlyArray<(
      { readonly __typename: 'Message' }
      & MessageDataFragment
    )> }
  ) }
);

export type MoreMessagesQueryVariables = {
  id: Scalars['ID'],
  before?: Maybe<Scalars['DateTime']>,
  after?: Maybe<Scalars['DateTime']>
};


export type MoreMessagesQuery = (
  { readonly __typename: 'Query' }
  & { readonly messenger: (
    { readonly __typename: 'Messenger' }
    & Pick<Messenger, 'id'>
    & { readonly messages: ReadonlyArray<(
      { readonly __typename: 'Message' }
      & MessageDataFragment
    )> }
  ) }
);

export type PostMessageMutationVariables = {
  messengerId: Scalars['ID'],
  input: MessageCreateInput
};


export type PostMessageMutation = (
  { readonly __typename: 'Mutation' }
  & { readonly postMessage: (
    { readonly __typename: 'Message' }
    & Pick<Message, 'id'>
  ) }
);

export type EditMessageMutationVariables = {
  id: Scalars['ID'],
  newText: Scalars['String']
};


export type EditMessageMutation = (
  { readonly __typename: 'Mutation' }
  & { readonly editMessage: (
    { readonly __typename: 'Message' }
    & MessageDataFragment
  ) }
);

export type MessengerBasicFragment = (
  { readonly __typename: 'Messenger' }
  & Pick<Messenger, 'id' | 'title' | 'numUnreadMessages'>
);

export type SelfQueryVariables = {};


export type SelfQuery = (
  { readonly __typename: 'Query' }
  & { readonly self: (
    { readonly __typename: 'User' }
    & UserDataFragment
  ) }
);

export type ChangePasswordMutationVariables = {
  oldPassword: Scalars['String'],
  newPassword: Scalars['String']
};


export type ChangePasswordMutation = (
  { readonly __typename: 'Mutation' }
  & Pick<Mutation, 'changePassword'>
);

export type CloseAllSessionsExceptCurrentMutationVariables = {};


export type CloseAllSessionsExceptCurrentMutation = (
  { readonly __typename: 'Mutation' }
  & { readonly closeAllSessionsExceptCurrent: (
    { readonly __typename: 'Session' }
    & Pick<Session, 'id'>
  ) }
);

export type DeleteAccountMutationVariables = {
  password: Scalars['String']
};


export type DeleteAccountMutation = (
  { readonly __typename: 'Mutation' }
  & Pick<Mutation, 'deleteAccount'>
);

export type SessionsQueryVariables = {};


export type SessionsQuery = (
  { readonly __typename: 'Query' }
  & { readonly sessions: ReadonlyArray<(
    { readonly __typename: 'Session' }
    & Pick<Session, 'id' | 'lastUsed'>
  )> }
);

export type UserDataFragment = (
  { readonly __typename: 'User' }
  & Pick<User, 'id' | 'login'>
);

export const BothTokensFragmentDoc = gql`
    fragment BothTokens on Tokens {
  accessToken
  refreshToken
}
    `;
export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  id
  login
}
    `;
export const MessageDataFragmentDoc = gql`
    fragment MessageData on Message {
  id
  text
  respondsTo {
    id
    sender {
      ...UserData
    }
    text
  }
  isEdited
  sender {
    ...UserData
  }
  createdAt
}
    ${UserDataFragmentDoc}`;
export const MessengerBasicFragmentDoc = gql`
    fragment MessengerBasic on Messenger {
  id
  title
  numUnreadMessages
}
    `;
export const LogInDocument = gql`
    mutation LogIn($login: String!, $password: String!) {
  logIn(login: $login, password: $password) {
    ...BothTokens
  }
}
    ${BothTokensFragmentDoc}`;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        return ApolloReactHooks.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, baseOptions);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = ApolloReactCommon.MutationResult<LogInMutation>;
export type LogInMutationOptions = ApolloReactCommon.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: UserCreateInput!) {
  signUp(input: $input) {
    ...BothTokens
  }
}
    ${BothTokensFragmentDoc}`;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut
}
    `;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, baseOptions);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = ApolloReactCommon.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const CreateMessengerDocument = gql`
    mutation CreateMessenger($input: MessengerCreateInput!) {
  createMessenger(input: $input) {
    ...MessengerBasic
  }
}
    ${MessengerBasicFragmentDoc}`;

/**
 * __useCreateMessengerMutation__
 *
 * To run a mutation, you first call `useCreateMessengerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessengerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessengerMutation, { data, loading, error }] = useCreateMessengerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMessengerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMessengerMutation, CreateMessengerMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMessengerMutation, CreateMessengerMutationVariables>(CreateMessengerDocument, baseOptions);
      }
export type CreateMessengerMutationHookResult = ReturnType<typeof useCreateMessengerMutation>;
export type CreateMessengerMutationResult = ApolloReactCommon.MutationResult<CreateMessengerMutation>;
export type CreateMessengerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMessengerMutation, CreateMessengerMutationVariables>;
export const UserDocument = gql`
    query User($login: String!) {
  user(login: $login) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      login: // value for 'login'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const MessengersDocument = gql`
    query Messengers {
  messengers {
    ...MessengerBasic
  }
}
    ${MessengerBasicFragmentDoc}`;

/**
 * __useMessengersQuery__
 *
 * To run a query within a React component, call `useMessengersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessengersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessengersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessengersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MessengersQuery, MessengersQueryVariables>) {
        return ApolloReactHooks.useQuery<MessengersQuery, MessengersQueryVariables>(MessengersDocument, baseOptions);
      }
export function useMessengersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MessengersQuery, MessengersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MessengersQuery, MessengersQueryVariables>(MessengersDocument, baseOptions);
        }
export type MessengersQueryHookResult = ReturnType<typeof useMessengersQuery>;
export type MessengersLazyQueryHookResult = ReturnType<typeof useMessengersLazyQuery>;
export type MessengersQueryResult = ApolloReactCommon.QueryResult<MessengersQuery, MessengersQueryVariables>;
export const UserInvitedToMessengerDocument = gql`
    subscription UserInvitedToMessenger {
  userInvitedToMessenger {
    ...MessengerBasic
  }
}
    ${MessengerBasicFragmentDoc}`;

/**
 * __useUserInvitedToMessengerSubscription__
 *
 * To run a query within a React component, call `useUserInvitedToMessengerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserInvitedToMessengerSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInvitedToMessengerSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserInvitedToMessengerSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<UserInvitedToMessengerSubscription, UserInvitedToMessengerSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<UserInvitedToMessengerSubscription, UserInvitedToMessengerSubscriptionVariables>(UserInvitedToMessengerDocument, baseOptions);
      }
export type UserInvitedToMessengerSubscriptionHookResult = ReturnType<typeof useUserInvitedToMessengerSubscription>;
export type UserInvitedToMessengerSubscriptionResult = ApolloReactCommon.SubscriptionResult<UserInvitedToMessengerSubscription>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($id: ID!) {
  deleteMessage(id: $id)
}
    `;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = ApolloReactCommon.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const ViewerIdDocument = gql`
    query ViewerId {
  self {
    id
  }
}
    `;

/**
 * __useViewerIdQuery__
 *
 * To run a query within a React component, call `useViewerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ViewerIdQuery, ViewerIdQueryVariables>) {
        return ApolloReactHooks.useQuery<ViewerIdQuery, ViewerIdQueryVariables>(ViewerIdDocument, baseOptions);
      }
export function useViewerIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ViewerIdQuery, ViewerIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ViewerIdQuery, ViewerIdQueryVariables>(ViewerIdDocument, baseOptions);
        }
export type ViewerIdQueryHookResult = ReturnType<typeof useViewerIdQuery>;
export type ViewerIdLazyQueryHookResult = ReturnType<typeof useViewerIdLazyQuery>;
export type ViewerIdQueryResult = ApolloReactCommon.QueryResult<ViewerIdQuery, ViewerIdQueryVariables>;
export const MessageDeletedDocument = gql`
    subscription messageDeleted($messengerId: ID!) {
  messageDeleted(messengerId: $messengerId)
}
    `;

/**
 * __useMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageDeletedSubscription({
 *   variables: {
 *      messengerId: // value for 'messengerId'
 *   },
 * });
 */
export function useMessageDeletedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>(MessageDeletedDocument, baseOptions);
      }
export type MessageDeletedSubscriptionHookResult = ReturnType<typeof useMessageDeletedSubscription>;
export type MessageDeletedSubscriptionResult = ApolloReactCommon.SubscriptionResult<MessageDeletedSubscription>;
export const MessagePostedDocument = gql`
    subscription MessagePosted($messengerId: ID!) {
  messagePosted(messengerId: $messengerId) {
    ...MessageData
  }
}
    ${MessageDataFragmentDoc}`;

/**
 * __useMessagePostedSubscription__
 *
 * To run a query within a React component, call `useMessagePostedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessagePostedSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagePostedSubscription({
 *   variables: {
 *      messengerId: // value for 'messengerId'
 *   },
 * });
 */
export function useMessagePostedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MessagePostedSubscription, MessagePostedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<MessagePostedSubscription, MessagePostedSubscriptionVariables>(MessagePostedDocument, baseOptions);
      }
export type MessagePostedSubscriptionHookResult = ReturnType<typeof useMessagePostedSubscription>;
export type MessagePostedSubscriptionResult = ApolloReactCommon.SubscriptionResult<MessagePostedSubscription>;
export const MessageEditedDocument = gql`
    subscription messageEdited($messengerId: ID!) {
  messageEdited(messengerId: $messengerId) {
    ...MessageData
  }
}
    ${MessageDataFragmentDoc}`;

/**
 * __useMessageEditedSubscription__
 *
 * To run a query within a React component, call `useMessageEditedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageEditedSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageEditedSubscription({
 *   variables: {
 *      messengerId: // value for 'messengerId'
 *   },
 * });
 */
export function useMessageEditedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MessageEditedSubscription, MessageEditedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<MessageEditedSubscription, MessageEditedSubscriptionVariables>(MessageEditedDocument, baseOptions);
      }
export type MessageEditedSubscriptionHookResult = ReturnType<typeof useMessageEditedSubscription>;
export type MessageEditedSubscriptionResult = ApolloReactCommon.SubscriptionResult<MessageEditedSubscription>;
export const MessengerDocument = gql`
    query Messenger($id: ID!, $around: ID) {
  self {
    id
  }
  messenger(id: $id) {
    id
    messages(where: {around: $around}) {
      ...MessageData
    }
  }
}
    ${MessageDataFragmentDoc}`;

/**
 * __useMessengerQuery__
 *
 * To run a query within a React component, call `useMessengerQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessengerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessengerQuery({
 *   variables: {
 *      id: // value for 'id'
 *      around: // value for 'around'
 *   },
 * });
 */
export function useMessengerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MessengerQuery, MessengerQueryVariables>) {
        return ApolloReactHooks.useQuery<MessengerQuery, MessengerQueryVariables>(MessengerDocument, baseOptions);
      }
export function useMessengerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MessengerQuery, MessengerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MessengerQuery, MessengerQueryVariables>(MessengerDocument, baseOptions);
        }
export type MessengerQueryHookResult = ReturnType<typeof useMessengerQuery>;
export type MessengerLazyQueryHookResult = ReturnType<typeof useMessengerLazyQuery>;
export type MessengerQueryResult = ApolloReactCommon.QueryResult<MessengerQuery, MessengerQueryVariables>;
export const MoreMessagesDocument = gql`
    query MoreMessages($id: ID!, $before: DateTime, $after: DateTime) {
  messenger(id: $id) {
    id
    messages(where: {before: $before, after: $after}) {
      ...MessageData
    }
  }
}
    ${MessageDataFragmentDoc}`;

/**
 * __useMoreMessagesQuery__
 *
 * To run a query within a React component, call `useMoreMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoreMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoreMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useMoreMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MoreMessagesQuery, MoreMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<MoreMessagesQuery, MoreMessagesQueryVariables>(MoreMessagesDocument, baseOptions);
      }
export function useMoreMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MoreMessagesQuery, MoreMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MoreMessagesQuery, MoreMessagesQueryVariables>(MoreMessagesDocument, baseOptions);
        }
export type MoreMessagesQueryHookResult = ReturnType<typeof useMoreMessagesQuery>;
export type MoreMessagesLazyQueryHookResult = ReturnType<typeof useMoreMessagesLazyQuery>;
export type MoreMessagesQueryResult = ApolloReactCommon.QueryResult<MoreMessagesQuery, MoreMessagesQueryVariables>;
export const PostMessageDocument = gql`
    mutation PostMessage($messengerId: ID!, $input: MessageCreateInput!) {
  postMessage(messengerId: $messengerId, input: $input) {
    id
  }
}
    `;

/**
 * __usePostMessageMutation__
 *
 * To run a mutation, you first call `usePostMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMessageMutation, { data, loading, error }] = usePostMessageMutation({
 *   variables: {
 *      messengerId: // value for 'messengerId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PostMessageMutation, PostMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<PostMessageMutation, PostMessageMutationVariables>(PostMessageDocument, baseOptions);
      }
export type PostMessageMutationHookResult = ReturnType<typeof usePostMessageMutation>;
export type PostMessageMutationResult = ApolloReactCommon.MutationResult<PostMessageMutation>;
export type PostMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<PostMessageMutation, PostMessageMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($id: ID!, $newText: String!) {
  editMessage(id: $id, newText: $newText) {
    ...MessageData
  }
}
    ${MessageDataFragmentDoc}`;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      newText: // value for 'newText'
 *   },
 * });
 */
export function useEditMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditMessageMutation, EditMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<EditMessageMutation, EditMessageMutationVariables>(EditMessageDocument, baseOptions);
      }
export type EditMessageMutationHookResult = ReturnType<typeof useEditMessageMutation>;
export type EditMessageMutationResult = ApolloReactCommon.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const SelfDocument = gql`
    query Self {
  self {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useSelfQuery__
 *
 * To run a query within a React component, call `useSelfQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelfQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelfQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelfQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SelfQuery, SelfQueryVariables>) {
        return ApolloReactHooks.useQuery<SelfQuery, SelfQueryVariables>(SelfDocument, baseOptions);
      }
export function useSelfLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SelfQuery, SelfQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SelfQuery, SelfQueryVariables>(SelfDocument, baseOptions);
        }
export type SelfQueryHookResult = ReturnType<typeof useSelfQuery>;
export type SelfLazyQueryHookResult = ReturnType<typeof useSelfLazyQuery>;
export type SelfQueryResult = ApolloReactCommon.QueryResult<SelfQuery, SelfQueryVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
    `;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CloseAllSessionsExceptCurrentDocument = gql`
    mutation CloseAllSessionsExceptCurrent {
  closeAllSessionsExceptCurrent {
    id
  }
}
    `;

/**
 * __useCloseAllSessionsExceptCurrentMutation__
 *
 * To run a mutation, you first call `useCloseAllSessionsExceptCurrentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseAllSessionsExceptCurrentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeAllSessionsExceptCurrentMutation, { data, loading, error }] = useCloseAllSessionsExceptCurrentMutation({
 *   variables: {
 *   },
 * });
 */
export function useCloseAllSessionsExceptCurrentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CloseAllSessionsExceptCurrentMutation, CloseAllSessionsExceptCurrentMutationVariables>) {
        return ApolloReactHooks.useMutation<CloseAllSessionsExceptCurrentMutation, CloseAllSessionsExceptCurrentMutationVariables>(CloseAllSessionsExceptCurrentDocument, baseOptions);
      }
export type CloseAllSessionsExceptCurrentMutationHookResult = ReturnType<typeof useCloseAllSessionsExceptCurrentMutation>;
export type CloseAllSessionsExceptCurrentMutationResult = ApolloReactCommon.MutationResult<CloseAllSessionsExceptCurrentMutation>;
export type CloseAllSessionsExceptCurrentMutationOptions = ApolloReactCommon.BaseMutationOptions<CloseAllSessionsExceptCurrentMutation, CloseAllSessionsExceptCurrentMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($password: String!) {
  deleteAccount(password: $password)
}
    `;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, baseOptions);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = ApolloReactCommon.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const SessionsDocument = gql`
    query Sessions {
  sessions {
    id
    lastUsed
  }
}
    `;

/**
 * __useSessionsQuery__
 *
 * To run a query within a React component, call `useSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SessionsQuery, SessionsQueryVariables>) {
        return ApolloReactHooks.useQuery<SessionsQuery, SessionsQueryVariables>(SessionsDocument, baseOptions);
      }
export function useSessionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SessionsQuery, SessionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SessionsQuery, SessionsQueryVariables>(SessionsDocument, baseOptions);
        }
export type SessionsQueryHookResult = ReturnType<typeof useSessionsQuery>;
export type SessionsLazyQueryHookResult = ReturnType<typeof useSessionsLazyQuery>;
export type SessionsQueryResult = ApolloReactCommon.QueryResult<SessionsQuery, SessionsQueryVariables>;