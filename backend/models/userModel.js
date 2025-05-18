const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    isMobileVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
    service_list : {
      type: Array, // A container for additional fields
      default: [], // Initialize as an empty object
    },
    // validator_list : {
    //   type: Array, // A container for additional fields
    //   default: [], // Initialize as an empty object
    // },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("User", userSchema);
