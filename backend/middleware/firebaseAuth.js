var admin = require("firebase-admin");
const uuid = require("uuidv4");


var serviceAccount = require("E:\Important_Data\pdf\e-validation-2-firebase-adminsdk-h6x70-dd873b04f4.json");
const { application } = require("express");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "e-validation-2.appspot.com",
});

const bucket = admin.storage().bucket();

const storage = multer.memoryStorage();
const upload = multer({storage : storage});

app.post('/upload', upload.single('image'), async (req, res) => {
    if(!req.file){
        return res.status(400).send("No file uploaded.");
    }

    const metadata = {
        metadata : {
            firebaseStorageDownloadTokens : uuid()
        },
        contentType: req.file.mimetype,
        cacheControl: "public, max-age=31536000"
    };

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStreaam({
        metadata: metadata,
        gzip:true
    });

    blobStream.on("finish",()=>{
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    })

    blobStream.end(req.file.buffer);
});




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDoZEt2iyeT1kBrtsrIXjEFueC7ECWc1Fk",
//   authDomain: "e-validation-2.firebaseapp.com",
//   projectId: "e-validation-2",
//   storageBucket: "e-validation-2.appspot.com",
//   messagingSenderId: "827827730397",
//   appId: "1:827827730397:web:ee0776bf0fe1498333e834",
//   measurementId: "G-0QDLYGFS4J"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);