import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for the schema
export interface ILoweruser extends Document {
  visitor_data: Record<string, any>; // Adjust type if the shape of visitor_data is known
  payment_status: string;
  payment_id : string ;
  email : string ;
  validater_list: any[]; // Adjust type if the array elements have a specific structure
  validation_status: boolean;
  remain_scans : Number
  qrcode: string;
  service_id: string;
  image_url : string;
  vis_id : string ;
  order_id : string ;
  expired_time : Number ;
  time_stamps : any[] ;
}

// Define the schema
const LoweruserSchema: Schema = new Schema({
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
order_id : {
    type : String,
    default : ""
},
time_stamps : {
    type : Array,
    default : []
}

});

// Export the model with proper typing
const Visitor: Model<ILoweruser> = mongoose.models.Loweruser || mongoose.model<ILoweruser>(
  "Loweruser",
  LoweruserSchema
);

export default Visitor;
