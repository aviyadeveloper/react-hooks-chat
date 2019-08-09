import React from 'react';
import { MutableRefObject } from 'react';
import { Message } from './Message';
import { TMessage } from '../type-declarations/MessageType';

type TMessageListProps = {
  isInit: MutableRefObject<boolean>;
  messages: TMessage[];
  removeMessage: (messageID: string) => void;
};

const MessageList = ({
  isInit,
  messages,
  removeMessage
}: TMessageListProps) => (
  <div>
    {!isInit.current && <p>loading messages...</p>}
    {messages.map(n => (
      <Message
        title={n.title}
        messageID={n.messageID}
        body={n.body}
        removeMessage={removeMessage}
        key={n.messageID}
      />
    ))}
  </div>
);

export { MessageList };
