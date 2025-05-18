const mongoose = require('mongoose');
const { Schema } = mongoose;


const LoweruserSchema = new Schema({
    visitor_data : {
        type : Object,
    },
    payment_status : {
        type : String,
        default : false
    },
    payment_id : {
        type : String,
        default : ""
    },
    email : {
        type : String,
        default : ""
    },
    validater_list : {
        type : Array,
        default: []
    },
    validation_status : {
        type : Boolean,
        default: false,
    },
    remain_scans : {
        type : Number,
    },
    qrcode:{
        type:String,
        default : ""
    },
    service_id:{
        type:String,
        ref:"Service"
    },
    image_url : {
        type : String,
        default : ""
    },
    expired_time : {
        type : Number,
    },
    vis_id : {
        type : String,
        default : ""
    },
    payment_id : {
        type : String,
        default : ""
    },
    order_id : {
        type : String,
        default : ""
    },
    time_stamps : {
        type : Array,
        default: []
    }
    
})

module.exports= mongoose.model("Loweruser",LoweruserSchema);
