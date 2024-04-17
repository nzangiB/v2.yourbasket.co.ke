import axios from "axios";
import AuthService from "./auth.service";

// const API_URL = (process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://api.yourbasket.co.ke/");
const API_URL = "https://api.yourbasket.co.ke/";

axios.interceptors.request.use(function (config) {
  const token = AuthService.getCurrentUserTokken();
  config.headers.Authorization = "Bearer " + token;

  return config;
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error?.response?.status === 401) {
    localStorage.removeItem("user");
    window.location.href = "/#/login";
    // makes the token refresh request
  }
  return Promise.reject(error);
});

const getUserDetail = () => {
  return axios.get(API_URL + "api/users/detail");
};
const getProduct = (data) => {
  return axios.get(API_URL + "api/products");
};
const getProductDetail = (id, userId) => {
  return axios.get(API_URL + "api/products/" + id + "?userId=" + userId);
};
const getProductDetailWithSlug = (slug, userId) => {
  return axios.get(API_URL + "api/products/" + slug + "?slug=1&userId=" + userId);
};
const getRelatedProducts = (id, userId) => {
  return axios.get(API_URL + "api/products/" + id + "/related?userId=" + userId);
};
const getProductReviews = (id, sort) => {
  return axios.get(API_URL + "api/products/" + id + "/reviews?sort=" + sort);
};
const getAllCategory = (type) => {
  return axios.get(API_URL + "api/categories?type=0&front=yes");
};
const getAllBrand = (type) => {
  return axios.get(API_URL + "api/brands?front=yes");
};
const getBlog = (data) => {
  return axios.get(API_URL + "api/blog");
};
const getBlogDetails = (id) => {
  return axios.get(API_URL + "api/blog/" + id);
};
const getFaqs = (data) => {
  return axios.get(API_URL + "api/faqs");
};
const getPage = (type) => {
  return axios.get(API_URL + "api/pages?page_type=" + type);
};
const addReview = (data) => {
  return axios.post(API_URL + "api/review", data);
};
const getCart = (type) => {
  return axios.get(API_URL + "api/cart?type=" + type);
};
const getTempCart = () => {
  return axios.get(API_URL + "api/cart?option=buynow&type=cart");
};
const addCart = (data) => {
  return axios.post(API_URL + "api/cart", data);
};
const deleteCart = (id) => {
  return axios.delete(API_URL + "api/cart/" + id);
};
const deleteWishlist = (id) => {
  return axios.delete(API_URL + "api/cart/" + id + "/wishlist");
};
const addTempCart = (data) => {
  return axios.post(API_URL + "api/cart/temp", data);
};
const updateCart = (data, id) => {
  return axios.put(API_URL + "api/cart/" + id, data);
};
const getAddress = () => {
  return axios.get(API_URL + "api/address");
};
const addAddress = (data) => {
  return axios.post(API_URL + "api/address", data);
};
const updateAddress = (data, id) => {
  return axios.put(API_URL + "api/address/" + id, data);
};
const deleteAddress = (id) => {
  return axios.delete(API_URL + "api/address/" + id);
};
const getHomePageData = (userId, deals = 0) => {
  return axios.get(API_URL + "api/front?userId=" + userId + (deals > 0 ? "&deals=" + deals : ""));
};
const searchProduct = (data, userId) => {
  return axios.post(API_URL + "api/front/search?userId=" + userId, data);
};
const createOrder = (data) => {
  return axios.post(API_URL + "api/order", data);
};
const getOrder = () => {
  return axios.get(API_URL + "api/order");
};
const updateUser = (data, id) => {
  return axios.put(API_URL + "api/users/" + id, data);
};
const changePassword = (data) => {
  return axios.post(API_URL + "api/users/changepassword", data);
};
const resetPassword = (data) => {
  return axios.post(API_URL + "api/users/resetpassword", data);
};
const getUserField = (id) => {
  return axios.get(API_URL + "api/userfield");
};
const sendOtp = (data) => {
  return axios.post(API_URL + "api/front/sendotp", data);
};
const verifyOtp = (data) => {
  return axios.post(API_URL + "api/front/verifyotp", data);
};
// TODO: Split this to forgotPassword and sendUserOtp
const forgotPassword = (data) => {
  return axios.post(API_URL + "api/users/forgotpassword", data);
};
const verifyUserOtp = (data) => {
  return axios.post(API_URL + "api/users/verifyotp", data);
};
const getOrderDetail = (id) => {
  return axios.get(API_URL + "api/order/" + id);
};
const addNewsletter = (data) => {
  return axios.post(API_URL + "api/newsletter", data);
};
const getSocialLinks = (id) => {
  return axios.get(API_URL + "api/front/social");
};
const cancelOrder = (data, id) => {
  return axios.post(API_URL + "api/order/" + id + "/cancel", data);
};
const getContactUs = (data) => {
  return axios.get(API_URL + "api/front/contact-page", data);
};
const getNotifications = (read = false) => {
  return axios.get(API_URL + "api/users/notifications" + (read === true ? "?read=yes" : ""));
};

const DataService = {
  getProduct,
  getAllCategory,
  getAllBrand,
  getProductDetail,
  getBlog,
  getBlogDetails,
  getPage,
  addReview,
  getCart,
  addCart,
  updateCart,
  addAddress,
  getAddress,
  getHomePageData,
  searchProduct,
  getUserDetail,
  createOrder,
  getOrder,
  addTempCart,
  getTempCart,
  updateUser,
  changePassword,
  resetPassword,
  getUserField,
  sendOtp,
  verifyOtp,
  // TODO: Split this to forgotPassword and sendUserOtp
  forgotPassword,
  verifyUserOtp,
  getFaqs,
  deleteCart,
  deleteWishlist,
  getProductDetailWithSlug,
  updateAddress,
  deleteAddress,
  getOrderDetail,
  addNewsletter,
  getSocialLinks,
  cancelOrder,
  getContactUs,
  getRelatedProducts,
  getProductReviews,
  getNotifications
};

export default DataService;
