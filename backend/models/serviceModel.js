
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ServiceSchema = new Schema({
    service_name: {
        type: String,
        required: true
    },
    service_type: {
        type: String,
        required: true
    },
    service_address: {
        type: String,
        required: true
    },
    service_date: {
        type: String,  // could also be Date, but you're sending it as string
        required: true
    },
    service_time: {
        type: String,  // assuming HH:mm format
        required: true
    },
    ticket_price: {
        type: String, // using String to accept "" and later convert to Number if needed
        required: false
    },
    valid_scans: {
        type: String,  // also coming as a string in req.body
        required: true
    },
    service_discription: {
        type: String,
        required: true
    },
    ticket_validity: {
        type: String,  // same: sent as string from frontend
        required: true
    },
    payment_option: {
        type: String,  // "Free" or "Paid"
        required: true
    },
    account_number: {
        type: Number,
        required: false
    },
    accrount_holder_name: {
        type: String,
        required: false
    },
    bank_name: {
        type: String,
        required: false
    },
    ifsc_number: {
        type: String,
        required: false
    },
    validater_list: {
        type: Array,
        default: []
    },
    form_structure: {
        type: Object
    },
    service_qr: {
        type: String
    },
    service_url: {
        type: String
    },
    service_image_url: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports= mongoose.model("Service",ServiceSchema);