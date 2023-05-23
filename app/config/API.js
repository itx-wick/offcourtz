import axios from 'axios';
import { SERVER_URL } from './routes';

export const api = (method, endpoint, body, headers) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: SERVER_URL + endpoint,
      data: body,
      headers: {
        Authorization: 'Bearer ' + headers,
      },
    })
      .then(res => {
        if (res.data.status) resolve(res.data);
        else {
          reject(res.data.message);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
