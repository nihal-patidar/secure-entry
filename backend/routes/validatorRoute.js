const express = require("express");
const route = express.Router();
const auth = require("../middleware/auth");
const vAuth = require("../middleware/vAuth")
const upload = require("../middleware/uploadFile")
const {userLogin, userProfile} = require("../controller/validatorUserCtrl")
const {addValidator , getValidators} = require("../controller/validatorCtrl");

route.put("/addValidator/:id",auth,upload.single("image"),addValidator);
route.get("/getValidators/:id",getValidators);
route.post("/login",userLogin);
route.get("/profile",vAuth,userProfile);

module.exports = route ;