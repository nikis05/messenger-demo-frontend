import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { LoginPanel } from './LogInPanel';
import { SignUpPanel } from './SignUpPanel';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const AuthScreen: React.FC = () => {
  return (
    <Wrapper>
      <Route path="/login" component={LoginPanel} />
      <Route path="/signup" component={SignUpPanel} />
    </Wrapper>
  );
};
