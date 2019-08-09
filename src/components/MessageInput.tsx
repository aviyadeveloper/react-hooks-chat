import React, { FormEvent, useState, ChangeEvent } from 'react';

type TMessageInputProps = {
  saveMessage: (e: FormEvent, title: string, body: string) => boolean;
};

const MessageInput = ({ saveMessage }: TMessageInputProps) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value || '');

  const changeBody = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value || '');

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
