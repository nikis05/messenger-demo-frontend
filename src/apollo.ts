import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const batchHttpLink = new BatchHttpLink({
  uri: process.env.REACT_APP_HTTP_ENDPOINT!
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_ENDPOINT!
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

export const client = new ApolloClient({ link: transportLink, cache });
