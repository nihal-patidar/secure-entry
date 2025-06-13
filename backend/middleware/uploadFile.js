var admin = require("firebase-admin");
const multer = require("multer");
const { Storage } = require('@google-cloud/storage');
// const { v4: uuid } = require("uuid");

// var serviceAccount = require("E:/Important_Data/photo/e-validation-2-firebase-adminsdk-h6x70-e42b16f310.json");
// var serviceAccount = require('./firebase.json');
var serviceAccount = require(process.env.FIREBASE_FILE_PATH_3);


const { application } = require("express");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "e-validation-2.appspot.com",
});

const bucket = admin.storage().bucket();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;

