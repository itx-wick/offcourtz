const isLive = false;
const isStaging = true;
const isStagingBullMQ = false;
let BASE_URL_SERVER
if (isLive) {
  BASE_URL_SERVER = 'https://18.138.154.157';
} else if (isStaging) {
  BASE_URL_SERVER = 'https://ec2-13-214-86-235.ap-southeast-1.compute.amazonaws.com';
} else if (isStagingBullMQ) {
  BASE_URL_SERVER = 'http://34.125.143.57';
} else {
  BASE_URL_SERVER = 'http://192.168.100.142:3000';
  // BASE_URL_SERVER = 'http://192.168.100.123:3000';
}
const IMG_BASE_URL_LIVE = 'https://metrob2b.s3.ap-southeast-1.amazonaws.com/products_images_new/'
export const PRODUCT_IMG_BASE_URL_LIVE = IMG_BASE_URL_LIVE
export const SERVER_URL = BASE_URL_SERVER;
export const END_POINTS = {
  login: '/api/auth/login',
  sign_up: '/api/auth/register',
  resetPassword: '/api/auth/resetPassword',
  getCategories: '/api/read/Categories',
  getBusiness: '/api/read/Business_Types?order=priority__ASC',
  getProducts: '/api/custom_route/get_products_by_categories',
  placeOrder: '/api/write/Orders',
  getAllOrder: '/api/read/Orders',
  getUserType: '/api/read/Users',
  getProductsByBusiness: '/api/custom_route/get_products_by_business',
  getSearchProducts: '/api/custom_route/get_products_by_categories',
  getBanners: '/api/read/Banners',
  getBusinessCredit: '/api/read/Businesses',
  getVouchers: '/api/read/Vouchers',
  getLedgers: '/api/custom_route/get_ledger_detail',
  getBusinessUser: '/api/read/Business_Users',
  updateUser: '/api/write/Users/',
  getNotifications: "/api/read/Notifications",
  readNotifications: "/api/write/Notifications/",
  getSignUp2ndScreenData: "/api/auth/getSignUpPageData",
  updateBusiness_Users: "/api/write/Business_Users/",
  getAging: "/api/read/Invoices/",
  getDisCountedProducts: "/api/custom_route/get_products_by_categories/",
  deleteAccount: '/api/write/Businesses/',
  getBrands: '/api/read/Brands',
  reqUpdateMostViewedProducts: '/api/write/Products/',
  readMostViewedProducts: '/api/custom_route/get_products_by_categories?order=viewed_count__DESC&limit=40&offset=0&includeFilter=!stock&includeFilterValue=!0',
  readAddToCartProducts: '/api/custom_route/get_products_by_categories?order=add_to_cart_count__DESC&limit=40&offset=0&includeFilter=!stock&includeFilterValue=!0',
  updateCartItems: '/api/custom_route/get_cip'
};