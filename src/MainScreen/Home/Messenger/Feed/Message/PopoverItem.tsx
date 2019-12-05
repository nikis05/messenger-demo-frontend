import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const Wrapper = styled.div`
  border-bottom: 1px solid rgb(236, 236, 236);
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #3399f0;
  }
  &:first-child {
    padding-top: 5px;
  }
  &:last-child {
    border-bottom: 0;
    padding-bottom: 5px;
  }
`;

export const PopoverItem: React.FC<{
  icon: string;
  title: string;
  onClick: () => void;
}> = ({ icon, title, onClick }) => (
  <Wrapper onClick={onClick}>
    <Icon type={icon} style={{ marginRight: '8px', marginLeft: '4px' }} />
    {title}
  </Wrapper>
);
