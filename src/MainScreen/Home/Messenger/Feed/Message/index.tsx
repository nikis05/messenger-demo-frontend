import { MessengerQuery } from '@api';
import { Avatar, Button, Popover } from 'antd';
import React, {
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react';
import { RelatedMessage } from '../../RelatedMessage';
import { PopoverItem } from './PopoverItem';

export interface MessageMethods {
  flicker: () => void;
}

export const Message = forwardRef<
  MessageMethods,
  {
    message: MessengerQuery['messenger']['messages'][0];
    style?: CSSProperties;
    popoverOpen: boolean;
    setPopoverOpen: (open: boolean) => void;
    setRespondsTo?: () => void;
    setEdits?: () => void;
    onDelete?: () => void;
    scrollToMessage: (id: string) => void;
    revert: boolean;
  }
>(
  (
    {
      message,
      style,
      popoverOpen,
      setPopoverOpen,
      setRespondsTo = () => {},
      setEdits = () => {},
      onDelete = () => {},
      scrollToMessage,
      revert
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const [flickering, setFlickering] = useState(false);
    useImperativeHandle(ref, () => ({
      flicker: () => {
        setFlickering(true);
        setTimeout(() => setFlickering(false), 1000);
      }
    }));
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '16px',
          paddingRight: '16px',
          flexDirection: revert ? 'row-reverse' : 'row'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Avatar style={{ marginTop: '2px' }}>
          {message.sender.login.substr(0, 1)}
        </Avatar>
        <div
          style={{
            display: 'flex',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '16px',
            paddingRight: '16px',
            backgroundColor: flickering ? '#e6f7ff' : 'white',
            transition: 'background-color 1s ease-in-out',
            margin: '8px',
            borderRadius: '10px'
          }}
        >
          <div style={{ flex: 1 }}>
            <a style={{ fontWeight: 'bold' }} href="#">
              {message.sender.login}
            </a>
            {message.text !== '' && message.respondsTo && (
              <RelatedMessage
                onClick={() => scrollToMessage(message.respondsTo!.id)}
                title={message.respondsTo.sender.login}
                text={message.respondsTo.text}
              />
            )}
            <div
              style={{
                marginTop: '2px',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap'
              }}
            >
              {message.text === '' ? <i>Deleted message</i> : message.text}
              {message.text !== '' && message.isEdited && <i> (Edited)</i>}
            </div>
          </div>
        </div>
        {message.text !== '' && (
          <Popover
            visible={popoverOpen}
            onVisibleChange={visible => setPopoverOpen(visible)}
            content={
              <>
                <PopoverItem
                  icon="retweet"
                  title="Reply"
                  onClick={() => setRespondsTo()}
                />
                <PopoverItem
                  icon="edit"
                  title="Edit"
                  onClick={() => setEdits()}
                />
                {/*<PopoverItem icon="pushpin" title="Pin" onClick={() => {}} />
              <PopoverItem icon="export" title="Forward" onClick={() => {}} />*/}
                <PopoverItem
                  icon="delete"
                  title="Delete"
                  onClick={() => onDelete()}
                />
              </>
            }
            placement="bottomRight"
            trigger="click"
          >
            <Button
              size="small"
              icon="ellipsis"
              style={{ display: hovered || popoverOpen ? 'block' : 'none' }}
              onClick={() => setPopoverOpen(true)}
            />
          </Popover>
        )}
      </div>
    );
  }
);
