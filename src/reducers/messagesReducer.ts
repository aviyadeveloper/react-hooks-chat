import { TMessage } from '../type-declarations/MessageType';

type MessagesReducerState = TMessage[];

interface MessagesReducerAction {
  type: 'POPULATE_MESSAGES' | 'ADD_MESSAGE' | 'REMOVE_MESSAGE';
  messages: TMessage[];
}

const messagesReducer: React.Reducer<
  MessagesReducerState,
  MessagesReducerAction
> = (state, action) => {
  switch (action.type) {
    case 'POPULATE_MESSAGES':
      return action.messages;
    case 'ADD_MESSAGE':
      return [...state, ...action.messages];
    case 'REMOVE_MESSAGE':
      return state.filter(
        message => message.messageID !== action.messages[0].messageID
      );
    default:
      return state;
  }
};

export { messagesReducer };
