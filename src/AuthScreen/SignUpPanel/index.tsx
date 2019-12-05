import { useSignUpMutation } from '@api';
import { Button, Form } from 'antd';
import { useAuth } from 'auth';
import { handleErrors } from 'AuthScreen/common/handleErrors';
import { Input } from 'AuthScreen/common/Input';
import { Link } from 'AuthScreen/common/Link';
import { Panel } from 'AuthScreen/common/Panel';
import React, { useState } from 'react';

export const SignUpPanel: React.FC = () => {
  const [{ login, password }, setFormData] = useState({
    login: '',
    password: ''
  });

  const [, { setAuthorized }] = useAuth();

  const [mutate, { loading, error }] = useSignUpMutation({
    variables: { input: { login, password } },
    onCompleted: data => setAuthorized(data.signUp)
  });

  const getError = handleErrors(['A user with this login already exists'])(
    error
  );

  const loginError = getError('A user with this login already exists');

  return (
    <Panel
      title="Sign up"
      footer={
        <>
          Already have an account? <Link path="/login">Log in!</Link>
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
      <Input
        type="password"
        placeholder="Password"
        onChange={e => setFormData({ login, password: e.target.value })}
      />
      <br />
      <br />
      <Button type="primary" block onClick={() => mutate()} loading={loading}>
        Sign Up
      </Button>
    </Panel>
  );
};
