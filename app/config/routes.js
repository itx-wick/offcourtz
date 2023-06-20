const isLive = true;
let BASE_URL_SERVER;
if (isLive) {
  BASE_URL_SERVER = 'https://offcourtz.uc.r.appspot.com/api';
}
export const SERVER_URL = BASE_URL_SERVER;
export const END_POINTS = {
  register: '/users',
  login: '/users/login',
  forgotPassword: '/users/forgot-password',
  createPost: '/posts',
  myFriends: '/friends/my',
  subscription: '/payments/start-subscription',
  sentReq: '/friend-requests',
  sentReqList: '/friend-requests/sent',
  fetchAllPosts: '/posts',
};
