const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName: "e-validation",
            w: 1,
        });
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("DB connection error:", error.message);
        if (error.code === 11000) {
            console.error("Duplicate key error:", error.keyPattern, error.keyValue);
        }
        process.exit(1);
    }
};

module.exports = connectDB;
