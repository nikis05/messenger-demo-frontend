import { useLogInMutation } from '@api';
import { Button, Form } from 'antd';
import { useAuth } from 'auth';
import { handleErrors } from 'AuthScreen/common/handleErrors';
import { Input } from 'AuthScreen/common/Input';
import { Link } from 'AuthScreen/common/Link';
import { Panel } from 'AuthScreen/common/Panel';
import React, { useState } from 'react';

export const LoginPanel: React.FC = () => {
  const [{ login, password }, setFormData] = useState({
    login: '',
    password: ''
  });

  const [, { setAuthorized }] = useAuth();

  const [mutate, { error, loading }] = useLogInMutation({
    variables: { login, password },
    onCompleted: data => {
      setAuthorized(data.logIn);
    }
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
