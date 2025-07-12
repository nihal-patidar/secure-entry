const express= require("express");
const route= express.Router();
const upload= require("../middleware/uploadFile");
const auth= require("../middleware/auth");
const bcrypt = require("bcrypt");
const {addService,createForm,getServices,getThisService,getFormData, updateService, deleteService, getFormStructure}= require("../controller/serviceCtrl");

route.put("/addService",auth,upload.single("image"),addService);
route.post("/addForm/:id",auth,createForm); //service id
route.get("/getServices",auth,getServices); // auth user_id get kar leta hai
route.get("/getFormData/:id",getFormData);
route.get("/getStructure/:id",getFormStructure);

route.get("/getThisService/:id",getThisService);
route.put("/updateService/:id",updateService);
route.post("/deleteService/:id",deleteService);

module.exports = route;