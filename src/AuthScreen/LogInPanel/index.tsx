import { Button, Form } from 'antd';
import { Input } from 'AuthScreen/common/Input';
import { Link } from 'AuthScreen/common/Link';
import { Panel } from 'AuthScreen/common/Panel';
import React, { useState } from 'react';
import { useLogInMutation } from '@api';
import { handleErrors } from 'AuthScreen/common/handleErrors';

export const LoginPanel: React.FC = () => {
  const [{ login, password }, setFormData] = useState({
    login: '',
    password: ''
  });
  const [mutate, { error, loading }] = useLogInMutation({
    variables: { login, password }
  });

  const getError = handleErrors([
    'No user found with this login',
    'Invalid password'
  ])(error);

  const loginError = getError('No user found with this login');

  const passwordError = getError('Invalid password');

  return (
    <Panel
      title="Log In"
      footer={
        <>
          Don't have an account yet? <Link path="/signup">Sign up!</Link>
        </>
      }
    >
      <Form.Item
        validateStatus={loginError ? 'error' : undefined}
        help={loginError || undefined}
      >
        <Input
          placeholder="Login"
          value={login}
          onChange={e => setFormData({ password, login: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        validateStatus={passwordError ? 'error' : undefined}
        help={passwordError || undefined}
      >
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setFormData({ login, password: e.target.value })}
        />
      </Form.Item>
      <Button type="primary" block loading={loading} onClick={() => mutate()}>
        Log In
      </Button>
    </Panel>
  );
};
