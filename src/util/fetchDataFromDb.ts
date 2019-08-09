import { isValidJSONString } from './jsonValidator';
import { TMessage } from '../type-declarations/MessageType';

/**
 * @description simulates an async call to database. */
const fetchDataFromDb = new Promise<TMessage[]>((resolve, reject) => {
  setTimeout(() => {
    try {
      const messages = localStorage.getItem('messages');
      const parsedMessages =
        isValidJSONString(messages) &&
        messages !== null &&
        JSON.parse(messages);
      if (!!parsedMessages) {
        resolve(parsedMessages);
      }
      throw Error('invalid messages object on localStroage');
    } catch (error) {
      reject(error.message);
    }
  }, 2000);
});

export { fetchDataFromDb };
