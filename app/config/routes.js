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
  createGroup: '/groups',
  myFriends: '/friends/my',
  myGroups: '/groups/my',
  subscription: '/payments/start-subscription',
  sentReq: '/friend-requests',
  sentReqList: '/friend-requests/sent',
  receivedReqList: '/friend-requests/received',
  acceptReq: '/friend-requests/accept-request',
  cancelReq: '/friend-requests/cancel-request',
  fetchAllPosts: '/posts',
  unfriend: '/friends/unfriend/',
};
