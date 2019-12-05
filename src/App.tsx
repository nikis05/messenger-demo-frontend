import { ApolloProvider } from '@apollo/client';
import { client } from 'apollo';
import { useAuth } from 'auth';
import { AuthScreen } from 'AuthScreen';
import { MainScreen } from 'MainScreen';
import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  const [{ isAuthorized }] = useAuth();
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={() => (isAuthorized ? <Redirect to="/" /> : <AuthScreen />)}
          />
          <Route
            path="/signup"
            render={() => (isAuthorized ? <Redirect to="/" /> : <AuthScreen />)}
          />
          <Route
            render={() =>
              isAuthorized ? <MainScreen /> : <Redirect to="/login" />
            }
          />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default hot(module)(App);
