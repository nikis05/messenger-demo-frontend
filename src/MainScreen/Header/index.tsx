import { useSelfQuery, useLogOutMutation } from '@api';
import { Icon, Layout, Menu, Modal } from 'antd';
import React from 'react';
import { useAuth } from 'auth';
import { useLocation, useHistory } from 'react-router-dom';

export const Header: React.FC = () => {
  const { data } = useSelfQuery();
  const [, { setDeauthorized }] = useAuth();
  const [logOut] = useLogOutMutation({ onCompleted: () => setDeauthorized() });
  const location = useLocation();
  const history = useHistory();
  return (
    <Layout.Header>
      <Menu
        selectedKeys={[location.pathname]}
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px', position: 'relative' }}
        onSelect={({ key }) => {
          if (key.startsWith('/')) history.push(key);
        }}
      >
        <Menu.Item key="/">Home</Menu.Item>
        <Menu.Item key="/settings">Settings</Menu.Item>
        <Menu.SubMenu
          title={data ? <span>Logged in as: {data.self.login}</span> : '...'}
          style={{ position: 'absolute', right: '50px' }}
        >
          <Menu.Item
            onClick={() =>
              Modal.confirm({ title: 'Log out?', onOk: () => logOut() })
            }
          >
            <Icon type="logout" /> Log out
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Layout.Header>
  );
};
