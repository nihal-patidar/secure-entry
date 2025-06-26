// <<<<<<< TanaySharma
// const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://secure-entry-f5go.onrender.com";
// const BASE_URL = "https://secure-entry-1.onrender.com"
// =======
// const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://secure-entry-f5go.onrender.com";
const BASE_URL = "https://secure-entry-1.onrender.com"

export const authEndpoints = {
  REGISTER: BASE_URL + "/api/register",
  MAIL_VERIFICATION: BASE_URL + "/api/mail-verification",
  FORGET_PASSWORD: BASE_URL + "/api/forget-password",
  LOGIN: BASE_URL + "/api/login",
  PROFILE: BASE_URL + "/api/profile",
  UPDATE_PROFILE: BASE_URL + "/api/update-profile",
  LOGOUT: BASE_URL + "/api/logout",
  SEND_OTP: BASE_URL + "/api/send-otp",
  OTP_VERIFY: BASE_URL + "/api/otp-verify",
  MOBILE_OTP_SEND: BASE_URL + "/api/mobile-otp-send",
  MOBILE_OTP_VERIFY: BASE_URL + "/api/mobile-otp-verify",
  GET_USER: BASE_URL + "/api/get-user",
  RESET_PASSWORD: BASE_URL + "/api/reset-password",
};

export const eventEndpoints = {
  ADD_SERVICE: `${BASE_URL}/service/addService`, // PUT
  ADD_FORM: (serviceId) => `${BASE_URL}/service/addForm/${serviceId}`, // POST
  GET_SERVICES: `${BASE_URL}/service/getServices`, // GET (requires auth)
  GET_FORM_DATA: (formId) => `${BASE_URL}/service/getFormData/${formId}`, // GET
  GET_THIS_SERVICE: (serviceId) => `${BASE_URL}/service/getThisService/${serviceId}`, // GET
  UPDATE_SERVICE: (serviceId) => `${BASE_URL}/service/updateService/${serviceId}`, // PUT
  DELETE_SERVICE: (serviceId) => `${BASE_URL}/service/deleteService/${serviceId}`, // POST
};

export const validatorEndpoints = {
  ADD_VALIDATOR: (id) => `${BASE_URL}/validator/addValidator/${id}`, // PUT
  GET_VALIDATORS: (id) => `${BASE_URL}/validator/getValidators/${id}`, // GET
  VALIDATOR_LOGIN: `${BASE_URL}/validator/login`, // POST
  VALIDATOR_PROFILE: `${BASE_URL}/validator/profile`, // GET (requires vAuth)
};

export const visitorEndpoints = {
  SET_VISITOR: (id) => `${BASE_URL}/visitor/set-visitor/${id}`, // POST
  SET_VISITOR_T2: (id) => `${BASE_URL}/visitor/set-visitor-t2/${id}`, // POST (with image upload)
  GET_VISITORS: (id) => `${BASE_URL}/visitor/get-visitors/${id}`, // GET (requires auth)
  UPDATE_VISITOR_STATUS: (id) => `${BASE_URL}/visitor/update-visitor-status/${id}`, // PUT (requires auth)
};









// AUTH ENDPOINTS


// RATINGS AND REVIEWS


// CONTACT-US API


// SETTINGS PAGE API
