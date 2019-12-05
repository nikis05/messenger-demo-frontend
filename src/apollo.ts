import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { getTokens } from 'auth';
import { refreshLink } from 'refreshLink';

const batchHttpLink = new BatchHttpLink({
  uri: process.env.REACT_APP_HTTP_ENDPOINT!
});

const httpAuthLink = setContext(() => {
  const tokens = getTokens();
  if (!tokens) return {};
  return {
    headers: {
      authorization: `Bearer ${tokens.accessToken}`
    }
  };
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_ENDPOINT!,
  options: {
    reconnect: true,
    connectionParams: () => {
      const tokens = getTokens();
      if (!tokens) return undefined;
      return {
        Authorization: `Bearer ${tokens.accessToken}`
      };
    }
  }
});

const transportLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink as any,
  batchHttpLink as any
);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: ApolloLink.from([httpAuthLink as any, refreshLink, transportLink]),
  cache
});
