import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Panel: React.FC<{ title: string; footer: React.ReactNode }> = ({
  title,
  children,
  footer
}) => {
  return (
    <Container>
      <Card title={title}>{children}</Card>
      <br />
      <span>{footer}</span>
    </Container>
  );
};
