import axios from 'axios';

export const api = (method, endpoint, body, headers) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: 'BASE_URL' + endpoint,
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
        Commons.toast(err.message);
        reject(err);
      });
  });
};
