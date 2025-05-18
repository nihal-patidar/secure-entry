const serviceModel = require("../models/serviceModel");
const validatorModel = require("../models/validatorModel");
var mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
var admin = require("firebase-admin");

const bucket = admin.storage().bucket();

const addValidator = async (req, res) => {
  try {
    let id = req.params.id;
    console.log("addValidator called !!!");

    if (req.file != undefined) {
      console.log("image file found !!!");
      const metadata = {
        metadata: {
          firebaseStorageDownloadTokens: uuid(),
        },
        contentType: req.file.mimetype,
        cacheControl: "public, max-age=31536000",
      };

      const blob = bucket.file(req.file.originalname);
      console.log("ddd")
      const blobStream = blob.createWriteStream({
        metadata: metadata,
        gzip: true,
      });

      blobStream.on('error', (err) => {
        console.error('Error in blobStream:', err);
      });

      var imageUrl = "";
      blobStream.on('finish', async () => {
        try {
          // Make the file publicly accessible
          console.log("1")
          await blob.makePublic();
          console.log("1")

          // Get the public URL
          imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log("service image url !!!", imageUrl);

          var newValidator = new validatorModel({ ...req.body.validatorData , validator_image_url : imageUrl });

          newValidator.save().then((result) => {
            console.log("newValidator saved to Database !!!");
          });

          serviceModel
            .updateOne(
              { _id: id },
              { $push: { validater_list: newValidator._id } }
            )
            .exec()
            .then(() => {
              console.log("newValidator added to Respected Service !!!");
              res.status(200).json({
                success: true,
                validator: newValidator,
                msg: "Add Succefully!",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                success: false,
                err: err,
                msg: "Validator not Added",
              });
            });
        } catch (err) {
          res.status(500).send(err.message);
        }
      });

      blobStream.on('error', (err) => {
        console.error('Blob stream error:', err);
        return res.status(500).json({ success: false, msg: 'File upload failed', error: err.message });
      });

      blobStream.end(req.file.buffer);
    }
  } catch (err) {
    console.log("this err", err);
    res.status(400).json({
      success: false,
      err: err,
      msg: "Validator is not create",
    });
  }
};

const getValidators = async (req, res) => {
  let id = req.params.id;
  console.log("getValidators is called !!!", id);
  try {
    let clientData = await serviceModel.findOne({ _id: id });
    let validatorList = clientData.validater_list;

    let validators = await validatorModel.find({ _id: validatorList }).exec();
    if (!validators) {
      return res.status(400).json({
        success: false,
        msg: "Validators Not Found!",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Fetched Validators",
      validators: validators,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
      msg: "Validators Not Found!",
    });
  }
};

module.exports = {
  addValidator,
  getValidators,
};
