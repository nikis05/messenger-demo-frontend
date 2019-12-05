import React from 'react';
import { useSelfQuery } from '@api';

export const MainScreen: React.FC = () => {
  const { data } = useSelfQuery();
  if (!data) return null;
  return <span>{data.self.login}</span>;
};
