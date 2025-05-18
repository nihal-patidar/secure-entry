const express= require("express");
const auth= require("../middleware/auth");
const generatePDF = require("../helper/generatepdf");
const route= express.Router();
const {setLoweruserData , getLowerusersData, updateVisitorStatus,setLoweruserDataT2 , optVerification}= require("../controller/loweruserCtrl");
const upload = require("../middleware/uploadFile");


route.post("/set-visitor/:id",setLoweruserData); // service id

route.post("/set-visitor-t2/:id",upload.single('image'),setLoweruserDataT2)

route.get("/get-visitors/:id",auth,getLowerusersData);

route.put("/update-visitor-status/:id",auth,updateVisitorStatus);


module.exports= route;