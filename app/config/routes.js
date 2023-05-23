const isLive = true;
let BASE_URL_SERVER;
if (isLive) {
  BASE_URL_SERVER = 'https://offcourtz.uc.r.appspot.com/api';
}
export const SERVER_URL = BASE_URL_SERVER;
export const END_POINTS = {
  register: '/users',
};
