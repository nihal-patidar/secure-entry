const express= require("express");
const route= express.Router();
const upload= require("../middleware/uploadFile");
const {userRegistor,mailVarification,resetPassword,userLogin,userProfile,userProfileUpdate,logout,sendOtp,otpVerification,mobileOtpSend,mobileOtpVerify,getUser}= require("../controller/userCtrl");
const {registerValidator,mailVarificationValidator,resetPasswordValidator}= require("../helper/validator");
const auth= require("../middleware/auth");
const resetPasswordModel= require("../models/resetPasswordModel");
const bcrypt = require("bcrypt");
route.post("/register",userRegistor);

route.post("/mail-verification",mailVarificationValidator,mailVarification);

route.post("/forget-password",resetPasswordValidator,resetPassword);

route.post("/login",userLogin);

route.get("/profile",auth,userProfile);

route.post("/update-profile",auth,upload.single("image"),userProfileUpdate);

route.get("/logout",auth,logout);

route.get("/send-otp",mailVarificationValidator,sendOtp);

route.post("/otp-verify",otpVerification);

route.post("/mobile-otp-send",mobileOtpSend);

route.post("/mobile-otp-verify",mobileOtpVerify);

route.post("/get-user",getUser);

route.post("/reset-password",async (req,res)=>{

    try{
        let {user_id,password,c_password}= req.body;
        let tokenData= resetPasswordModel.findOne({user_id});
        if(password != c_password){
            return res.render("reset-password",{tokenData:tokenData,error:"password and confirm password not match!"});
        }

        let salt= bcrypt.genSaltSync(10);
        let hashPass= bcrypt.hashSync(c_password,salt);
        await User.findByIdAndUpdate({_id:user_id},{
            $set:{
                password:hashPass,
            }
        })
        await resetPasswordModel.deleteMany({user_id})
        return res.render("reset-success");

    }catch(err){
        console.log(err);
        return res.render("404");
    }

})

module.exports= route;