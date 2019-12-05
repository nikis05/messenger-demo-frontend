import { MessengerQuery, useViewerIdQuery } from '@api';
import { Empty } from 'antd';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowRenderer
} from 'react-virtualized';
import { Message, MessageMethods } from './Message';

export interface FeedMethods {
  scrollToBottom: () => void;
  scrollToMessage: (id: string) => void;
  resetMessageMeasurement: (id: string) => void;
}

type Message = MessengerQuery['messenger']['messages'][0];

const getRowRenderer: (props: {
  messages: Message[];
  cache: CellMeasurerCache;
  popoverOpenMessageId: string | null;
  setPopoverOpenMessageId: (id: string | null) => void;
  setRespondsTo: (messageId: Message | null) => void;
  setEdits: (message: Message | null) => void;
  scrollToMessage: (id: string) => void;
  messageComponentsRef: {
    current: { [messageId: string]: MessageMethods | null };
  };
  viewerId: string;
}) => ListRowRenderer = ({
  messages,
  cache,
  popoverOpenMessageId,
  setPopoverOpenMessageId,
  setRespondsTo,
  setEdits,
  scrollToMessage,
  messageComponentsRef,
  viewerId
}) => ({ parent, index, style }) => (
  <CellMeasurer cache={cache} parent={parent} rowIndex={index} columnIndex={0}>
    <Message
      style={style}
      message={messages[index]}
      popoverOpen={popoverOpenMessageId === messages[index].id}
      setPopoverOpen={open => {
        if (open) setPopoverOpenMessageId(messages[index].id);
        else setPopoverOpenMessageId(null);
      }}
      setRespondsTo={() => {
        setRespondsTo(messages[index]);
        setPopoverOpenMessageId(null);
      }}
      setEdits={() => {
        setEdits(messages[index]);
        setPopoverOpenMessageId(null);
      }}
      scrollToMessage={scrollToMessage}
      ref={instance => {
        messageComponentsRef.current[messages[index].id] = instance;
      }}
      revert={messages[index].sender.id === viewerId}
    />
  </CellMeasurer>
);

export const Feed = forwardRef<
  FeedMethods,
  {
    messages: Message[];
    loadMoreBefore: () => Promise<void>;
    loadMoreAfter: () => Promise<void>;
    onBottomVisibilityChange: (visible: boolean) => void;
    setRespondsTo: (message: Message | null) => void;
    setEdits: (message: Message | null) => void;
    around: string | null;
    setAround: (id: string) => void;
    viewerId: string;
  }
>(
  (
    {
      messages,
      loadMoreBefore,
      loadMoreAfter,
      onBottomVisibilityChange,
      setRespondsTo,
      setEdits,
      around,
      setAround,
      viewerId
    },
    ref
  ) => {
    const messagesRef = useRef(messages);
    messagesRef.current = messages;
    const cache = useMemo(() => {
      return new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 52,
        keyMapper: rowIndex => {
          return messagesRef.current[rowIndex].id;
        }
      });
    }, [around]);

    const initStatus = useRef<
      'loading' | 'loaded' | 'rendered' | 'scroll-established'
    >('loaded');
    const messageLockRef = useRef<{
      id: string;
      align: 'start' | 'center' | 'end';
    } | null>(
      messages.length === 0
        ? null
        : around
        ? { id: around, align: 'center' }
        : { id: messages[messages.length - 1].id, align: 'end' }
    );

    const [_, forceRerender] = useState();

    const scrollToBottom = () => {
      messageLockRef.current = {
        id: messages[messages.length - 1].id,
        align: 'end'
      };
      forceRerender({});
      setImmediate(() => {
        messageLockRef.current = null;
      });
    };

    const messageComponentsRef = useRef<{
      [messageId: string]: MessageMethods | null;
    }>({});

    const flickerMessage = (id: string) => {
      messageComponentsRef.current[id]!.flicker();
    };

    const scrollToMessage = (id: string) => {
      const messageLoaded =
        messages.find(message => message.id === id) !== undefined;
      if (messageLoaded) {
        initStatus.current = 'rendered';
        messageLockRef.current = { id, align: 'center' };
        forceRerender({});
        setImmediate(() => {
          messageLockRef.current = null;
          forceRerender({});
        });
        setTimeout(() => {
          flickerMessage(id);
        }, 500);
      } else setAround(id);
    };

    const resetMessageMeasurement = (id: string) => {
      const rowIndex = messages.findIndex(message => message.id === id);
      cache.clear(rowIndex, 0);
    };

    useImperativeHandle(
      ref,
      () => ({ scrollToBottom, scrollToMessage, resetMessageMeasurement }),
      [scrollToBottom]
    );

    const [popoverOpenMessageId, setPopoverOpenMessageId] = useState<
      string | null
    >(null);

    useEffect(() => {
      if (!around) {
        if (messages.length !== 0) setTimeout(() => scrollToBottom(), 100);
      } /*else setTimeout(() => flickerMessage(around), 500);*/
    }, []);

    if (messages.length === 0)
      return (
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Empty description="Write a message to start conversation" />
        </div>
      );

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            style={{ outline: 'none', marginTop: '16px', marginBottom: '16px' }}
            onRowsRendered={({
              overscanStartIndex,
              overscanStopIndex,
              stopIndex
            }) => {
              if (stopIndex < messages.length - 3)
                onBottomVisibilityChange(false);
              else onBottomVisibilityChange(true);

              if (initStatus.current !== 'scroll-established') {
                if (initStatus.current === 'loaded')
                  initStatus.current = 'rendered';
                if (initStatus.current === 'rendered') {
                  initStatus.current = 'scroll-established';
                  messageLockRef.current = null;
                }
                return;
              }
              if (overscanStartIndex === 0) {
                initStatus.current = 'loading';
                messageLockRef.current = { id: messages[0].id, align: 'start' };
                loadMoreBefore().then(() => (initStatus.current = 'loaded'));
              }
              if (overscanStopIndex === messages.length - 1) loadMoreAfter();
            }}
            overscanRowCount={10}
            height={height}
            width={width}
            rowHeight={cache.rowHeight}
            rowCount={messages.length}
            rowRenderer={getRowRenderer({
              messages,
              cache,
              popoverOpenMessageId,
              setPopoverOpenMessageId,
              setRespondsTo,
              setEdits,
              scrollToMessage,
              messageComponentsRef,
              viewerId
            })}
            scrollToAlignment={
              messageLockRef.current ? messageLockRef.current.align : undefined
            }
            scrollToIndex={
              messageLockRef.current === null
                ? undefined
                : messages.findIndex(
                    message => message.id === messageLockRef.current!.id
                  )!
            }
          />
        )}
      </AutoSizer>
    );
  }
);
