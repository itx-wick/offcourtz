import axios from 'axios';
import {SERVER_URL} from './routes';
import {API} from '../helpers/api';

export const api = (method, endpoint, body, headers) => {
  return new Promise((resolve, reject) => {
    API.fetch({
      method: method,
      url: SERVER_URL + endpoint,
      data: body,
      headers: {
        Authorization: 'Bearer ' + headers,
      },
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
