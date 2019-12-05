import { Icon } from 'antd';
import React from 'react';

export const RelatedMessage: React.FC<{
  title: React.ReactNode;
  text: string;
  onCancel?: () => void;
  onClick?: () => void;
}> = ({ title, text, onCancel, onClick }) => {
  return (
    <div
      style={{
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '4px',
        cursor: 'pointer'
      }}
    >
      {onCancel && (
        <Icon
          type="close-circle"
          onClick={onCancel}
          style={{ marginLeft: '16px', fontSize: '16px', marginRight: '16px' }}
        />
      )}
      <div
        style={{
          paddingLeft: '8px',
          borderLeft: '2px solid #3399f0',
          width: '230px'
        }}
        onClick={() => onClick && onClick()}
      >
        <span>{title}</span>
        <br />
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
