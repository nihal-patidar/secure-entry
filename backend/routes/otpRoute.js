const express= require("express");
const route= express.Router();
const { verifyOtp , sendOtp } = require("../controller/otpVerification");

route.post("/send",sendOtp);

route.post("/verify",verifyOtp);

module.exports = route ;