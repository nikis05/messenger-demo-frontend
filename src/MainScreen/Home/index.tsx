import { Layout } from 'antd';
import React, { useState } from 'react';
import { Menu } from './Menu';
import { Messenger } from './Messenger';

export const Home: React.FC = () => {
  const [activeMessengerId, setActiveMessengerId] = useState<string | null>(
    null
  );
  return (
    <Layout style={{ height: '100vh' }}>
      <Menu
        activeMessengerId={activeMessengerId}
        setActiveMessengerId={setActiveMessengerId}
      />
      <Layout.Content>
        {activeMessengerId && <Messenger id={activeMessengerId} />}
      </Layout.Content>
    </Layout>
  );
};
