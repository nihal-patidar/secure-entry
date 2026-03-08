const serviceModel = require("../models/serviceModel");
const userModel = require("../models/userModel");
var QRCode = require("qrcode-generator");
var mongoose = require("mongoose");
const { findOneAndDelete } = require("../models/lowuserModel");
const { v4: uuid } = require("uuid");
var admin = require("firebase-admin");
const bucket = admin.storage().bucket();

const addService = async (req, res) => {
  try {
    let id = req.user.user._id;
    const parsedData = JSON.parse(req.body.data);
    console.log("service/addService body data", parsedData);

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
      const blobStream = blob.createWriteStream({
        metadata: metadata,
        gzip: true,
      });
      console.log("s1");
      var imageUrl = "";
      blobStream.on("finish", async () => {
        try {
          // Make the file publicly accessible
          console.log("s2");

          await blob.makePublic();
          console.log("s3");

          // Get the public URL
          imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log("service image url !!!", imageUrl);

          var newService = new serviceModel({
            ...parsedData,
            service_image_url: imageUrl,
          });
          //   console.log("");
          console.log("service: ", newService);
          newService.save().then((result) => {
            // console.log("yes");
            console.log("newService Save result!!!", result);
          });

          userModel
            .updateOne({ _id: id }, { $push: { service_list: newService._id } })
            .exec()
            .then(() => {
              res.status(200).json({
                success: true,
                service: newService,
                msg: "Add Succefully!",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                success: false,
                err: err,
                msg: "Service not Add",
              });
            });
        } catch (err) {
          res.status(500).send(err.message);
        }
      });

      blobStream.end(req.file.buffer);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err: err,
      msg: "Service is not create",
    });
  }
};

const createForm = async (req, res) => {
  let id = req.params.id;
  // let formData = req.body ;
  // console.log("form-data",data);

  try {
    let typeNumber = 5;
    let errorCorrectionLevel = "M";
    let mode = "Byte";
    let text = `https://secure-entry.netlify.app/form/${id}`;
    let size = 4;
    let mar = 0;

    const qr = QRCode(typeNumber, errorCorrectionLevel);

    // Set data and encoding mode
    qr.addData(text, mode);

    // Make QR code matrix
    qr.make();

    // Generate QR code as SVG
    var svg = qr.createSvgTag({ cellSize: size, margin: mar });
    svg = svg.replace("\\", "");
    let formData = req.body;
    let data = await serviceModel
      .findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            form_structure: formData,
            service_qr: svg,
            service_url: text,
          },
        },
        { new: true }
      )
      .exec();
    if (!data) {
      return res.status(400).json({
        success: false,
        msg: "Form is Not add",
      });
    }
    return res.status(200).json({
      success: true,
      serviceData: data,
      msg: "Form Added Successfully!!!",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      err: err,
      msg: "Form does not Add",
    });
  }
};

const getServices = async (req, res) => {
  let id = req.user.user._id;
  try {
    let clientData = await userModel.findOne({ _id: id });
    let serviceList = clientData.service_list;

    let services = await serviceModel.find({ _id: serviceList }).exec();
    if (!services) {
      return res.status(400).json({
        success: false,
        msg: "Services Not Found!",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Fetched Services",
      services: services,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
      msg: "Services Not Found!",
    });
  }
};

const getThisService = async (req, res) => {
  let id = req.params.id;
  try {
    let service = await serviceModel.find({ _id: id }).exec();
    console.log("this id service", service[0].validater_list);
    if (!service) {
      return res.status(400).json({
        success: false,
        msg: "Services Not Found!",
        // validator_list : services
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Fetched Services",
      validater_list: service[0].validater_list,
      service_data: service[0],
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
      msg: "Services Not Found!",
    });
  }
};

const getFormStructure = async (req, res) => {
  console.log("getFormData called");
  let id = req.params.id;
  if (id == undefined) {
    return res.status(400).json({
      success: false,
      msg: "FormData Not Found!",
    });
  }
  try {
    let serviceData = await serviceModel.findOne({ _id: id }).exec();
    return res.status(200).json({
      success: true,
      form_structure : serviceData.form_structure,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
      msg: "FormData Not Found!",
    });
  }
};

const getFormData = async (req, res) => {
  console.log("getFormData called");
  let id = req.params.id;
  if (id == undefined) {
    return res.status(400).json({
      success: false,
      msg: "FormData Not Found!",
    });
  }
  try {
    let serviceData = await serviceModel.findOne({ _id: id }).exec();
    return res.status(200).json({
      success: true,
      serviceData: serviceData,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
      msg: "FormData Not Found!",
    });
  }
};

// update service

const updateService = async (req, res) => {
  try {
    let serviceId = req.params.id;
    let newServiceData = req.body;
    let updatedServiceData = await serviceModel
      .findByIdAndUpdate(
        serviceId,
        {
          $set: {
            ...newServiceData,
          },
        },
        { new: true }
      )
      .exec();

    if (updatedServiceData) {
      console.log("updatedService",updatedServiceData);
      res.status(200).json({
        success: true,
        serviceData: updatedServiceData,
        msg: "Update Succesfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Some problem to Update the Service",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
      msg: "Service not found",
    });
  }
};

const deleteService = async (req, res) => {
  try {
    let serviceId = req.params.id;
    console.log(serviceId);
    let deletedstatus = await serviceModel.findOneAndDelete({ _id: serviceId });

    // userModel.updateOne({ _id: id }, { $pull: { service_list: serviceId } }).then((response) => {
    //     console.log("service_id has been removed", response);
    //   })
    //   .catch((error) => {
    //     console.log("service delete" , error);
    //   });
    console.log("Delete Status: ", deletedstatus);
    if (deletedstatus) {
      res.status(200).json({
        success: true,
        msg: "Delete Succesfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Some problem to Delete the Service",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
      msg: "Service not found",
    });
  }
};

module.exports = {
  addService,
  createForm,
  getServices,
  getFormData,
  getThisService,
  updateService,
  deleteService,
  getFormStructure
};
