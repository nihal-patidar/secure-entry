import mongoose from "mongoose";

const MONGO_URI = process.env.DB_URL as string; // Ensure you have a .env file with MONGO_URI

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable in .env.local");
}

// Global cache to prevent multiple connections in development
declare global {
    var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {
            dbName : "e-validation",
            w : 1 
        });
    }

    cached.conn = await cached.promise;
    //console.log("connection successfull")
    return cached.conn;
}

export default connectToDatabase;
