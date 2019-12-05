import {
  useCreateMessengerMutation,
  User,
  UserDocument,
  UserQuery,
  UserQueryVariables
} from '@api';
import { useApolloClient } from '@apollo/client';
import { Button, Empty, Icon, Input, message, Modal } from 'antd';
import React, { useState } from 'react';

export const CreateMessengerModal: React.FC<{
  isOpen: boolean;
  close: () => void;
}> = ({ isOpen, close }) => {
  const [messengerTitle, setMessengerTitle] = useState('');

  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);

  const [searchLogin, setSearchLogin] = useState('');

  const client = useApolloClient();

  const searchUser = () =>
    client
      .query<UserQuery, UserQueryVariables>({
        query: UserDocument,
        variables: { login: searchLogin }
      })
      .then(result => {
        if (!result.data) return;
        if (!result.data.user) message.info('No user found with this login');
        else {
          if (invitedUsers.some(user => user.id === result.data.user!.id))
            message.error('User is already invited');
          else setInvitedUsers([...invitedUsers, result.data.user]);
          setSearchLogin('');
        }
      });

  const [createMessenger, createMessengerResult] = useCreateMessengerMutation({
    variables: {
      input: {
        title: messengerTitle,
        memberIds: invitedUsers.map(user => user.id)
      }
    },
    onCompleted: () => close()
  });

  return (
    <Modal
      title="Create messenger"
      visible={isOpen}
      onCancel={() => close()}
      onOk={() => createMessenger()}
      okButtonProps={{ loading: createMessengerResult.loading }}
    >
      <Input
        placeholder="Messenger title"
        value={messengerTitle}
        onChange={e => setMessengerTitle(e.target.value)}
      />
      <br />
      <br />
      <h3>Invited users</h3>
      {invitedUsers.length === 0 ? (
        <Empty description="No users invited yet" />
      ) : (
        <ul>
          {invitedUsers.map(user => (
            <li key={user.id}>
              {user.login}{' '}
              <Icon
                type="close"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setInvitedUsers(
                    invitedUsers.filter(
                      invitedUser => invitedUser.id !== user.id
                    )
                  )
                }
              />
            </li>
          ))}
        </ul>
      )}
      <br />
      <Input
        placeholder="User login"
        value={searchLogin}
        onChange={e => setSearchLogin(e.target.value)}
      />
      <br />
      <br />
      <Button onClick={() => searchUser()}>Search</Button>
    </Modal>
  );
};
