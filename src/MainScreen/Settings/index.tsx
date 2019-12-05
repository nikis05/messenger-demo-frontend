import {
  Session,
  SessionsDocument,
  SessionsQuery,
  SessionsQueryVariables,
  useChangePasswordMutation,
  useCloseAllSessionsExceptCurrentMutation,
  useSessionsQuery,
  useDeleteAccountMutation
} from '@api';
import { Button, Input, Layout, message, Modal, Spin, Table } from 'antd';
import React, { useState } from 'react';
import { useAuth } from 'auth';

export const Settings: React.FC = () => {
  const sessions = useSessionsQuery();

  const [
    closeAllSessions,
    closeAllSessionsResult
  ] = useCloseAllSessionsExceptCurrentMutation({
    update: (client, result) => {
      if (!result.data) return;
      const cacheData = client.readQuery<SessionsQuery, SessionsQueryVariables>(
        { query: SessionsDocument }
      );
      if (!cacheData) return;
      client.writeQuery<SessionsQuery, SessionsQueryVariables>({
        query: SessionsDocument,
        data: {
          ...cacheData,
          sessions: [
            cacheData.sessions.find(
              session =>
                session.id === result.data!.closeAllSessionsExceptCurrent.id
            )!
          ]
        }
      });
    },
    onCompleted: () => {
      message.success('All inactive sessions have been closed');
    }
  });

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [changePassword, changePasswordResult] = useChangePasswordMutation({
    variables: { oldPassword, newPassword },
    onError: error => {
      if (error.message === 'GraphQL error: Invalid password')
        Modal.error({ title: 'Wrong current password' });
    },
    onCompleted: () => {
      message.success('Password successfully changed');
    }
  });

  const [
    deleteAccountConfirmPassword,
    setDeleteAccountConfirmPassword
  ] = useState('');

  const [, { setDeauthorized }] = useAuth();

  const [deleteAccount, deleteAccountResult] = useDeleteAccountMutation({
    variables: { password: deleteAccountConfirmPassword },
    onError: error => {
      if (error.message === 'GraphQL error: Invalid password')
        Modal.error({ title: 'Wrong password' });
    },
    onCompleted: () => setDeauthorized()
  });

  return (
    <Layout.Content
      style={{
        margin: '24px',
        backgroundColor: 'white',
        padding: '24px'
      }}
    >
      <h3>Sessions</h3>
      {sessions.loading ? (
        <Spin />
      ) : sessions.data ? (
        <Table
          columns={[
            { title: 'Id', dataIndex: 'id' },
            { title: 'Last used', dataIndex: 'lastUsed' }
          ]}
          dataSource={sessions.data.sessions as Session[]}
          pagination={false}
        />
      ) : null}
      <br />
      <Button
        onClick={() => closeAllSessions()}
        loading={closeAllSessionsResult.loading}
      >
        Close all except current
      </Button>
      <br />
      <br />
      <h3>Change password</h3>
      <Input
        type="password"
        style={{ width: '200px' }}
        placeholder="Current password"
        value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}
      />
      <br />
      <br />
      <Input
        type="password"
        style={{ width: '200px' }}
        placeholder="New password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <br />
      <br />
      <Button
        onClick={() =>
          Modal.confirm({
            title: 'Change password?',
            onOk: () => changePassword()
          })
        }
        loading={changePasswordResult.loading}
      >
        Change password
      </Button>
      <br />
      <br />
      <h3>Delete account</h3>
      <Input
        type="password"
        style={{ width: '200px' }}
        placeholder="Password confirmation"
        value={deleteAccountConfirmPassword}
        onChange={e => setDeleteAccountConfirmPassword(e.target.value)}
      />
      <br />
      <br />
      <Button
        type="danger"
        onClick={() =>
          Modal.confirm({
            title: 'Delete account?',
            okType: 'danger',
            onOk: () => deleteAccount()
          })
        }
      >
        Delete account
      </Button>
    </Layout.Content>
  );
};
