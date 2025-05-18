
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema({
    service_name:{
     type:String,
     require:true
    },
    service_type:{
     type:String,
     require:true
    },
    service_address:{
        type:String,
        require:true
    },
    ticket_price:{
     type:Number,
     require:true
    },
    valid_scans:{
     type:Number,
     require:true
    },
    account_number:{
        type:Number,
        require:true
    },
    accrount_holder_name:{
        type:String,
        require:true
    },
    bank_name:{
        type:String,
        require:true
    },
    ifsc_number:{
        type:String,
        require:true
    },
    service_discription:{
        type:String,
        require:true
    },
    
    ticket_validity:{
     type:Number,
     require:true
    },
    validater_list:{
     type:Array,
     default: []
    },
    form_structure:{
     type:Object
    },
    service_qr:{
     type:String
    },
    service_url:{
        type:String
    },
    service_image_url:{
        type: String
    }
 });


module.exports= mongoose.model("Service",ServiceSchema);