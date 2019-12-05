import {
  createOperation,
  fromPromise,
  NextLink,
  Operation,
  toPromise
} from 'apollo-link';
import { onError } from 'apollo-link-error';
import { getTokens, setAccessToken } from 'auth';
import gql from 'graphql-tag';

const refreshAccessTokenAndRetry = async (
  operation: Operation,
  forward: NextLink
) => {
  const refreshToken = getTokens()!.refreshToken;
  const refreshOperation = createOperation(
    {},
    {
      query: gql`
        mutation RefreshAccessToken($refreshToken: String!) {
          refreshAccessToken(refreshToken: $refreshToken)
        }
      `,
      variables: { refreshToken }
    }
  );
  const accessToken = await toPromise(forward(refreshOperation)).then(
    result => result.data!.refreshAccessToken
  );
  setAccessToken(accessToken);
  operation.setContext({
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return toPromise(forward(operation));
};

export const refreshLink = onError(({ graphQLErrors, operation, forward }) => {
  if (
    graphQLErrors &&
    graphQLErrors.find(
      error =>
        error.message === 'Context creation failed: Token refresh required'
    )
  )
    return fromPromise(refreshAccessTokenAndRetry(operation, forward));
});
