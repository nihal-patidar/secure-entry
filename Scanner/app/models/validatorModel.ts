import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the Validator document
export interface IValidator extends Document {
  validator_name: string;
  validator_image_url: string;
  validator_email: string;
  password: string;
  mobile_number: string;
  aadhar_number?: string; // Optional field
  validator_address?: string; // Optional field
  service_id: string;
  validator_id?: string; // Optional field
  validator_password?: string; // Optional field
}

// Define the schema for the Validator model
const ValidatorSchema: Schema<IValidator> = new Schema({
  validator_name: {
    type: String,
    required: true,
  },
  validator_image_url: {
    type: String,
    required: true,
  },
  validator_email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  aadhar_number: {
    type: String,
  },
  validator_address: {
    type: String,
  },
  service_id: {
    type: String,
    required: true,
  },
  validator_id: {
    type: String,
  },
  validator_password: {
    type: String,
  },
});

// Export the Validator model
// const Validator: Model<IValidator> = mongoose.model<IValidator>("Validator", ValidatorSchema);
const Validator: Model<IValidator> = mongoose.models.Validator || mongoose.model<IValidator>("Validator", ValidatorSchema);


export default Validator;
