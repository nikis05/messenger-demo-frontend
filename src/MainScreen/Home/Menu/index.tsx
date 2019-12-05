import {
  useMessengersQuery,
  useUserInvitedToMessengerSubscription,
  MessengersQuery,
  MessengersDocument
} from '@api';
import { Icon, Layout, Menu as AntdMenu } from 'antd';
import React, { useState } from 'react';
import { CreateMessengerModal } from './CreateMessengerModal';

export const Menu: React.FC<{
  activeMessengerId: string | null;
  setActiveMessengerId: (id: string) => void;
}> = ({ activeMessengerId, setActiveMessengerId }) => {
  const [createMessengerModalOpen, setCreateMessengerModalOpen] = useState(
    false
  );

  const { data } = useMessengersQuery();

  useUserInvitedToMessengerSubscription({
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (!subscriptionData.data) return;
      const cacheData = client.readQuery<MessengersQuery>({
        query: MessengersDocument
      })!;
      client.writeQuery<MessengersQuery>({
        query: MessengersDocument,
        data: {
          ...cacheData,
          messengers: [
            ...cacheData.messengers,
            subscriptionData.data.userInvitedToMessenger
          ]
        }
      });
    }
  });

  return (
    <>
      <Layout.Sider style={{ backgroundColor: 'white' }}>
        <AntdMenu
          selectedKeys={
            createMessengerModalOpen
              ? ['create-messenger']
              : activeMessengerId
              ? [activeMessengerId]
              : []
          }
          onSelect={({ key }) => {
            if (key === 'create-messenger') setCreateMessengerModalOpen(true);
            else setActiveMessengerId(key);
          }}
        >
          {data &&
            data.messengers.map(messenger => (
              <AntdMenu.Item key={messenger.id}>
                {messenger.title}
              </AntdMenu.Item>
            ))}
          <AntdMenu.Item key="create-messenger">
            <Icon type="plus-circle" /> Create messenger
          </AntdMenu.Item>
        </AntdMenu>
      </Layout.Sider>
      <CreateMessengerModal
        isOpen={createMessengerModalOpen}
        close={() => setCreateMessengerModalOpen(false)}
      />
    </>
  );
};
