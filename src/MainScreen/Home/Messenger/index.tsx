import {
  MessengerDocument,
  MessengerQuery,
  MessengerQueryVariables,
  MoreMessagesDocument,
  MoreMessagesQuery,
  MoreMessagesQueryVariables,
  useEditMessageMutation,
  useMessageEditedSubscription,
  useMessagePostedSubscription,
  useMessengerQuery,
  usePostMessageMutation,
  useMessageDeletedSubscription
} from '@api';
import { useApolloClient } from '@apollo/client';
import { Badge, Button, Icon, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useRef, useState } from 'react';
import { Feed, FeedMethods } from './Feed';
import { RelatedMessage } from './RelatedMessage';

type Message = MessengerQuery['messenger']['messages'][0];

export const Messenger: React.FC<{ id: string }> = ({ id }) => {
  const [around, setAround] = useState<string | null>(null);
  const { data, loading, refetch } = useMessengerQuery({
    variables: { id, around }
  });

  console.log(around);
  console.log(data && data.messenger.messages);

  useEffect(() => {
    refetch();
  }, [id]);

  const client = useApolloClient();

  const [bottomVisible, setBottomVisible] = useState(true);
  const [newMessagesCounter, setNewMessagesCounter] = useState(0);

  const feedRef = useRef<FeedMethods>(null);

  useMessagePostedSubscription({
    variables: { messengerId: id },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('incoming message');
      const messengerWithoutAround = client.readQuery<
        MessengerQuery,
        MessengerQueryVariables
      >({
        query: MessengerDocument,
        variables: { id, around: null }
      });

      client.writeQuery<MessengerQuery, MessengerQueryVariables>({
        query: MessengerDocument,
        variables: { id, around: null },
        data: {
          ...data!,
          messenger: {
            __typename: 'Messenger',
            ...messengerWithoutAround!.messenger,
            messages: [
              subscriptionData.data!.messagePosted,
              ...messengerWithoutAround!.messenger.messages
            ]
          }
        }
      });
      if (bottomVisible) feedRef.current!.scrollToBottom();
      else setNewMessagesCounter(newMessagesCounter + 1);
    }
  });

  useMessageEditedSubscription({
    variables: { messengerId: id },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;
      feedRef.current!.resetMessageMeasurement(
        subscriptionData.data!.messageEdited.id
      );
    }
  });

  const loadMoreBefore = async () => {
    console.log('loadMoreBefore');
    const result = await client.query<
      MoreMessagesQuery,
      MoreMessagesQueryVariables
    >({
      query: MoreMessagesDocument,
      variables: {
        id,
        before: data!.messenger.messages[data!.messenger.messages.length - 1]
          .createdAt
      }
    });

    client.writeQuery<MessengerQuery, MessengerQueryVariables>({
      query: MessengerDocument,
      variables: { id, around },
      data: {
        ...data!,
        messenger: {
          ...data!.messenger!,
          messages: [
            ...data!.messenger.messages,
            ...result.data.messenger.messages
          ]
        }
      }
    });
  };

  const loadMoreAfter = async () => {
    console.log('loadMoreAfter');
    const result = await client.query<
      MoreMessagesQuery,
      MoreMessagesQueryVariables
    >({
      query: MoreMessagesDocument,
      variables: {
        id,
        after: data!.messenger.messages[0].createdAt
      }
    });

    client.writeQuery<MessengerQuery, MessengerQueryVariables>({
      query: MessengerDocument,
      variables: { id, around },
      data: {
        ...data!,
        messenger: {
          ...data!.messenger!,
          messages: [
            ...result.data.messenger.messages,
            ...data!.messenger.messages
          ]
        }
      }
    });
  };

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [inputState, setInputState] = useState({
    value: '',
    selection: { start: 0, end: 0 }
  });

  useEffect(() => {
    textAreaRef.current!.setSelectionRange(
      inputState.selection.start,
      inputState.selection.end
    );
  }, [inputState.selection.start, inputState.selection.end]);

  const [respondsTo, setRespondsTo] = useState<Message | null>(null);

  const [postMessage] = usePostMessageMutation({
    variables: {
      messengerId: id,
      input: {
        text: inputState.value.trim(),
        respondsToId: respondsTo ? respondsTo.id : null
      }
    }
  });

  const [edits, setEdits] = useState<Message | null>(null);

  const [editMessage] = useEditMessageMutation();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgb(236, 236, 236)'
      }}
    >
      <div style={{ flex: 1 }}>
        {!data && loading && <Spin />}
        {data && (
          <Feed
            viewerId={data.self.id}
            key={id + String(around)}
            ref={feedRef}
            messages={data.messenger.messages.slice().reverse()}
            loadMoreBefore={loadMoreBefore}
            loadMoreAfter={loadMoreAfter}
            onBottomVisibilityChange={visible => {
              setBottomVisible(visible);
              if (visible && newMessagesCounter !== 0) setNewMessagesCounter(0);
            }}
            setRespondsTo={message => {
              if (message && edits) {
                setEdits(null);
                setInputState({ value: '', selection: { start: 0, end: 0 } });
              }
              setRespondsTo(message);
            }}
            setEdits={message => {
              if (message) {
                setRespondsTo(null);
                setInputState({
                  value: message.text,
                  selection: {
                    start: message.text.length,
                    end: message.text.length
                  }
                });
              }
              setEdits(message);
            }}
            around={around}
            setAround={setAround}
          />
        )}
        <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
          {!bottomVisible && (
            <Badge count={newMessagesCounter}>
              <Button
                shape="circle"
                icon="arrow-down"
                size="large"
                onClick={() => {
                  if (around) setAround(null);
                  else feedRef.current!.scrollToBottom();
                }}
              />
            </Badge>
          )}
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgb(236, 236, 236)' }}>
        {respondsTo !== null && (
          <RelatedMessage
            title={
              <>
                Response to: <a href="#">{respondsTo.sender.login}</a>
              </>
            }
            text={respondsTo.text}
            onCancel={() => setRespondsTo(null)}
            onClick={() => feedRef.current!.scrollToMessage(respondsTo.id)}
          />
        )}
        {edits !== null && (
          <RelatedMessage
            title={<b>Editing message</b>}
            text={edits.text}
            onCancel={() => {
              setEdits(null);
              setInputState({ value: '', selection: { start: 0, end: 0 } });
            }}
            onClick={() => feedRef.current!.scrollToMessage(edits.id)}
          />
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px'
          }}
        >
          <Icon type="paper-clip" style={{ fontSize: '24px' }} />
          <TextArea
            ref={antdTextArea => {
              if (antdTextArea === null) return;
              textAreaRef.current = antdTextArea.resizableTextArea.textArea;
            }}
            placeholder="Start typing here. Ctrl + enter for newline, enter to submit."
            style={{
              border: 0,
              margin: '16px',
              outline: 0,
              width: '100%',
              resize: 'none'
            }}
            autoSize={{ minRows: 2, maxRows: 10 }}
            value={inputState.value}
            onChange={e => {
              const textArea = e.target as HTMLTextAreaElement;
              setInputState({
                value: e.target.value,
                selection: {
                  start: textArea.selectionStart,
                  end: textArea.selectionEnd
                }
              });
            }}
            onKeyDown={e => {
              if (e.keyCode !== 13) return;
              if (!e.ctrlKey) {
                e.preventDefault();
                const trimmedValue = inputState.value.trim();
                if (trimmedValue !== '') {
                  if (edits)
                    editMessage({
                      variables: { id: edits.id, newText: inputState.value }
                    });
                  else postMessage();
                  setInputState({ ...inputState, value: '' });
                  if (respondsTo) setRespondsTo(null);
                  if (edits) setEdits(null);
                }
              } else {
                const textArea = e.target as HTMLTextAreaElement;
                setInputState({
                  value:
                    inputState.value.substring(0, textArea.selectionStart) +
                    '\n' +
                    inputState.value.substring(textArea.selectionEnd),
                  selection: {
                    start: textArea.selectionStart + 1,
                    end: textArea.selectionStart + 1
                  }
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
