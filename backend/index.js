var admin = require("firebase-admin");
// const uuid = require("uuidv4");
const { v4: uuid } = require("uuid");

const express= require("express");
const multer = require("multer");
const app= express();
require("dotenv").config();
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


app.use(cors());



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName:"e-validation",
            w: 1, // Ensures majority acknowledgment for write operations
        });
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);

        // Additional error details
        if (error.name === "MongoServerError" && error.code === 11000) {
            console.error("Duplicate key error detected:", error.keyPattern, error.keyValue);
        }
        process.exit(1); // Exit the process on failure
    }
};

// Call the function to connect to the database
connectDB();


let count = 0;
const interval = setInterval(() => {
    console.log(`Server is running... ${count + 1}`);
    count++;
}, 3000*60); // Logs every 2 seconds

setTimeout(() => {
    clearInterval(interval);
    console.log("Logging stopped!");
}, 1000*60*60*24*10 );


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views","./views");
app.use("/api",userRoute);
app.use("/",authRoute);
app.use("/service",serviceRoute);
app.use("/validator",validatorRoute)
app.use("/visitor",loweruserRoute);
app.use("/payment",paymentRoute);
app.use("/ticket-verification/:id",isVerified);
app.use("/otp",otpRoute);
app.get("/test", (req, res) => {
    res.json({ success: true, data: {authour : "Happy" , mood : "running"} });
});

// const allowedOrigins = [process.env.ORIGIN_PRODUCTION, process.env.ORIGIN_PRODUCTION_VAL,process.env.ORIGIN_PRODUCTION_2,process.env.ORIGIN1];
// console.log(allowedOrigins);

// app.use((req, res, next) => {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader("Access-Control-Allow-Origin", origin);
//     }
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept,Content-Disposition"
//     );
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

//     // Handle preflight requests
//     if (req.method === "OPTIONS") {
//         res.status(204).end();
//         return;
//     }
//     next();
// });

let port= process.env.PORT || 3000;
app.listen(port,()=> console.log("port is listing port "+port));
