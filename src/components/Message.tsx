import React from 'react';
import { TMessage } from '../type-declarations/MessageType';

interface IMessageProps extends TMessage {
  removeMessage: (messageID: string) => void;
}

const Message = ({ title, messageID, body, removeMessage }: IMessageProps) => (
  <div key={messageID}>
    <h4>{title}</h4>
    <p>{body}</p>
    <p>{messageID}</p>
    <button onClick={() => removeMessage(messageID)}>x</button>
  </div>
);

export { Message };
