require("dotenv").config();
var admin = require("firebase-admin");
// const uuid = require("uuidv4");
const { v4: uuid } = require("uuid");
const connectDB = require("./config/db");
const setupLogger = require("./middleware/logger")
const corsMiddleware = require("./middleware/corsMiddleware")
const express= require("express");
const multer = require("multer");
const app= express();
const userRoute= require("./routes/userRoute");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");
const authRoute= require("./routes/authRoute");
const serviceRoute= require("./routes/serviceRoute");
const validatorRoute = require("./routes/validatorRoute");
const loweruserRoute= require("./routes/loweruserRoute");
const paymentRoute = require("./routes/paymentRoute");
const otpRoute = require("./routes/otpRoute");
const cors= require("cors");
const { isVerified } = require("./controller/verifications");
// const { sendOtp, verifyOtp } = require("./controller/otpVerification");

connectDB();



app.use(cors());
app.use(corsMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));


// Logger (Interval logs)
setupLogger();

// EJS view engine
app.set("view engine", "ejs");
app.set("views","./views");

// Routes
app.use("/api", userRoute);
app.use("/", authRoute);
app.use("/service", serviceRoute);
app.use("/validator", validatorRoute);
app.use("/visitor", loweruserRoute);
app.use("/payment", paymentRoute);
app.use("/otp", otpRoute);
app.use("/ticket-verification/:id", isVerified);

// Health check
app.get("/test", (req, res) => {
    res.json({ success: true, data: { author: "Happy", mood: "running" } });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
