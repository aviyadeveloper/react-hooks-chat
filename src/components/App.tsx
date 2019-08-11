import React, { useReducer } from 'react';

import { context } from '../context/context';
import { messagesReducer } from '../reducers/messagesReducer';
import { MessageList } from '../components/MessagesList';
import { MessageInput } from '../components/MessageInput';

const App = () => {
  // Set up reducer.
  const [messagesList, messagesDispatch] = useReducer(messagesReducer, []);

  return (
    <context.Provider
      value={{
        messages: {
          list: messagesList,
          dispatch: messagesDispatch
        }
      }}
    >
      <MessageList />
      <MessageInput />
    </context.Provider>
  );
};

export { App };
