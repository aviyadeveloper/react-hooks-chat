import React, { useContext, useEffect, useState } from 'react';
import { Message } from './Message';
import { context } from '../context/context';
import { fetchDataFromDb } from '../util/fetchDataFromDb';

const MessageList = () => {
  const { messages } = useContext(context);
  const [loaded, loadedDispatch] = useState<boolean>(false);

  // Init - Fetch data from db and populate state with it.
  useEffect(() => {
    fetchDataFromDb
      .then(data => {
        messages.dispatch &&
          messages.dispatch({ type: 'POPULATE_MESSAGES', messages: data });
        loadedDispatch(true);
        console.log(`Populating messages with ${data.length} items`);
      })
      .catch(error => {
        console.log({ error });
        console.log('Populating messages with empty array');
        messages.dispatch &&
          messages.dispatch({ type: 'POPULATE_MESSAGES', messages: [] });
        loadedDispatch(true);
      });
  }, []);

  // Synchronize db with messages state
  useEffect(() => {
    // Avoid initial empty array from wiping db before loaded.
    if (loaded) {
      console.log('synchronizing messages in db');
      console.log({ messages: messages['list'] });
      localStorage.setItem('messages', JSON.stringify(messages.list));
    }
  }, [messages.list]);

  return (
    <div>
      {!loaded && <p>loading messages...</p>}
      {messages.list.map(m => (
        <Message
          title={m.title}
          messageID={m.messageID}
          body={m.body}
          key={m.messageID}
        />
      ))}
    </div>
  );
};

export { MessageList };
