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
  id: Scalars['String']
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
  messegerId: Scalars['ID']
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