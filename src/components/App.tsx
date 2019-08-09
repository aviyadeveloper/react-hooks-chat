import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useReducer,
  useRef
} from 'react';

import { fetchDataFromDb } from '../util/fetchDataFromDb';
import { messagesReducer } from '../reducers/messagesReducer';
import { MessageList } from '../components/MessagesList';
import { MessageInput } from '../components/MessageInput';

type AppProps = {};
const App = ({  }: AppProps) => {
  let isInit = useRef(false);

  // Set up reducer.
  const [messages, messagesDispatch] = useReducer(messagesReducer, []);

  // Init - Fetch data from db and populate state with it.
  useEffect(() => {
    fetchDataFromDb
      .then(messages => {
        isInit.current = true;
        messagesDispatch({ type: 'POPULATE_MESSAGES', messages });
        console.log(`Populating messages with ${messages.length} items`);
      })
      .catch(error => {
        isInit.current = true;
        console.log({ error });
        console.log('Populating messages with empty array');
        messagesDispatch({ type: 'POPULATE_MESSAGES', messages: [] });
      });
  }, []);

  // On messages update, save data to db
  useEffect(() => {}, [messages]);

  const saveMessage = (e: FormEvent, title: string, body: string): boolean => {
    e.preventDefault();

    // Generate messageID
    const messageID = Math.floor(Math.random() * 10000).toString();

    // Add message
    if (
      typeof title === 'string' &&
      title.length > 0 &&
      typeof body === 'string' &&
      body.length > 0
    ) {
      messagesDispatch({
        type: 'ADD_MESSAGE',
        messages: [{ title, body, messageID }]
      });
      return true;
    } else {
      alert('Title and Body of message cannot be empty');
      return false;
    }
  };

  const removeMessage = (messageID: string): void => {
    messagesDispatch({
      type: 'REMOVE_MESSAGE',
      messages: [{ title: '', body: '', messageID }]
    });
  };

  // Synchronize db with messages state
  useEffect(() => {
    // Avoid initial empty array from wiping db before loaded.
    if (isInit.current) {
      console.log('synchronizing messages in db');
      console.log({ messages });
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  return (
    <div>
      <div>
        <MessageList
          isInit={isInit}
          messages={messages}
          removeMessage={removeMessage}
        />
        <MessageInput saveMessage={saveMessage} />
      </div>
    </div>
  );
};

export { App };
