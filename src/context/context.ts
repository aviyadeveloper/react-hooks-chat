import React from 'react';
import { TMessage } from '../type-declarations/MessageType';
import { MessagesReducerAction } from '../reducers/messagesReducer';

type TContext = {
  messages: {
    list: TMessage[];
    dispatch?: React.Dispatch<MessagesReducerAction>;
  };
  [propName: string]: any;
};

const initContext: TContext = {
  messages: {
    list: [],
    dispatch: undefined
  }
};

const context = React.createContext<TContext>(initContext);

export { context, initContext };
