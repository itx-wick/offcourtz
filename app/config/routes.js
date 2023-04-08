const isLive = false;
const isStaging = true;
const isStagingBullMQ = false;
let BASE_URL_SERVER;
if (isLive) {
  BASE_URL_SERVER = 'https://18.138.154.157';
} else if (isStaging) {
  BASE_URL_SERVER =
    'https://ec2-13-214-86-235.ap-southeast-1.compute.amazonaws.com';
} else if (isStagingBullMQ) {
  BASE_URL_SERVER = 'http://34.125.143.57';
} else {
  BASE_URL_SERVER = 'http://192.168.100.142:3000';
  // BASE_URL_SERVER = 'http://192.168.100.123:3000';
}
export const SERVER_URL = BASE_URL_SERVER;
export const END_POINTS = {
  // login: '/api/auth/login',
};
