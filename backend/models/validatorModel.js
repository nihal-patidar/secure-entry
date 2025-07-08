const mongoose = require('mongoose');
const { Schema } = mongoose;

// const ValidatorSchema = new Schema({
const ValidatorSchema = new mongoose.Schema({
    validator_name: {
        type: String,
        required: true
    },
    validator_image_url: {
        type: String,
    },
    validator_email: {
        type: String,
        required: true
    },
    validator_password: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String
    },
    aadhar_number: {
        type: String
    },
    validator_address: {
        type: String
    },
    service_id: {
        type: String,
        required: true
    },
    validator_id: {
        type: String
    }
});


module.exports= mongoose.model("Validator",ValidatorSchema);
