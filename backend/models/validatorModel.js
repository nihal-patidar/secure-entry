const mongoose = require('mongoose');
const { Schema } = mongoose;

const ValidatorSchema = new Schema({
    validator_name : {
        type: String,
        required: true
    },
    validator_image_url : {
        type : String,
        required : true
    },
    validator_email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required : true
    },
    mobile_number : {
        type: String,
        required: true
    },
    aadhar_number : {
        type: String,
        // required: true
    },
    validator_address : {
        type: String,
        // required: true
    },
    service_id : {
        type : String,
        required : true
    },
    validator_id : {
        type : String,
    },
    
    validator_password : {
            type: String
        },
    })


module.exports= mongoose.model("Validator",ValidatorSchema);
