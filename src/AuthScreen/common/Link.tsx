import React from 'react';
import { useHistory } from 'react-router-dom';

export const Link: React.FC<{ path: string }> = ({ path, children }) => {
  const history = useHistory();
  return (
    <a
      href={path}
      onClick={e => {
        e.preventDefault();
        history.push(path);
      }}
    >
      {children}
    </a>
  );
};
