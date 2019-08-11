import React, { FormEvent, useState, useContext, ChangeEvent } from 'react';
import { context } from '../context/context';

const MessageInput = () => {
  const { messages } = useContext(context);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value || '');

  const changeBody = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value || '');

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
      messages.dispatch &&
        messages.dispatch({
          type: 'ADD_MESSAGE',
          messages: [{ title, body, messageID }]
        });
      return true;
    } else {
      alert('Title and Body of message cannot be empty');
      return false;
    }
  };

  return (
    <form
      onSubmit={e => {
        if (saveMessage(e, title, body)) {
          // Clear inputs
          setTitle('');
          setBody('');
        }
      }}
    >
      <div>
        <label>Title: </label>
        <input
          value={title}
          onChange={e => {
            changeTitle(e);
          }}
        />
      </div>
      <div>
        <label>Body: </label>
        <textarea
          value={body}
          onChange={e => {
            changeBody(e);
          }}
        />
      </div>
      <button type="submit">save new message</button>
    </form>
  );
};
export { MessageInput };
