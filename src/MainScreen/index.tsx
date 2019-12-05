import { Layout } from 'antd';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './Header';
import { Home } from './Home';
import { Settings } from './Settings';

export const MainScreen: React.FC = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header />
      <Switch>
        <Route path="/settings" component={Settings} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Layout>
  );
};
