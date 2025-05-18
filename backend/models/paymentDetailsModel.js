const mongoose = require('mongoose');
const { Schema } = mongoose;


const PaymentDetailSchema = new Schema({
    payment_id : {
        type : String,
        require : true
    },
    order_id : {
        type : String,
        require : true
    },
    ticket_delivered : {
        type : String,
        default : false
    },
    ticket_id : {
        type : String,
    },
    verified_payment_status : {
        type : Boolean,
        default : false
    }
    
})

module.exports= mongoose.model("PaymentDetail",PaymentDetailSchema);
