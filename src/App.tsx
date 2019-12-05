import { ApolloProvider } from '@apollo/client';
import { client } from 'apollo';
import { AuthScreen } from 'AuthScreen';
import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthScreen />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default hot(module)(App);
