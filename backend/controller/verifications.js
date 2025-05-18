const validatorModel= require("../models/validatorModel");
const lowerUserModel = require("../models/lowuserModel");
var mongoose = require("mongoose");

const isVerified = async (req,res)=>{
    try{
        let visitorId = req.params.id ;
        let validatorId = req.headers.validatorid ;

        console.log("isVerified is called" , visitorId , " ----->" , validatorId);

        let visitorData = await lowerUserModel.find({_id : visitorId}).exec();
        if(!visitorData){
            return res.status(200).json({
                err : err ,
                success : false,
                msg : "Visitor does Not exist"
            })
        }

        let ans = visitorData[0].validater_list.includes(validatorId);
        let ans2 = visitorData[0].validation_status ;
        console.log("Result :" , ans);


        return res.status(200).json({
            success : ans ,
            verified : ans && !ans2 ,
            vdata : visitorData[0],
            msg : ans ? "Visitor Verified" : "Not Valid"
        })
        
    }
    catch(err){
        return res.status(400).json({
            err : err ,
            success : false ,
            msg : "No Relevant data"
        })
    }
}

module.exports = {
    isVerified,
}