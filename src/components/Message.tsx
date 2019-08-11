import React, { useContext } from 'react';
import { context } from '../context/context';
import { TMessage } from '../type-declarations/MessageType';

const Message = ({ title, messageID, body }: TMessage) => {
  const { messages } = useContext(context);

  const removeMessage = (messageID: string): void => {
    messages.dispatch &&
      messages.dispatch({
        type: 'REMOVE_MESSAGE',
        messages: [{ title: '', body: '', messageID }]
      });
  };

  return (
    <div key={messageID}>
      <h4>{title}</h4>
      <p>{body}</p>
      <p>{messageID}</p>
      <button onClick={() => removeMessage(messageID)}>x</button>
    </div>
  );
};

export { Message };
