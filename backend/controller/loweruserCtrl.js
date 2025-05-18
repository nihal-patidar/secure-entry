const LoseruserModel = require("../models/lowuserModel");
var QRCode = require("qrcode-generator");
const ExcelJS = require("exceljs");
const { v4: uuid, stringify } = require("uuid");
const generatePDF = require("../helper/generatepdf");
var admin = require("firebase-admin");
const paymentDetailsModel = require("../models/paymentDetailsModel");
const bucket = admin.storage().bucket();

const setLoweruserData = async (req, res) => {
  try {
    var serviceid = req.params.id;
    var data = req.body.visitorData.visitor_data;
    var paymentId = req.body.paymentId ;
    var orderId = req.body.orderId ;
    var validater_list = req.body.visitorData.validater_list;
    var validity = req.body.visitorData.validity
    var remain_scans = req.body.visitorData.remain_scans
    console.log("visitor data : -", req.body);
    if (data == undefined) {
      return res.status(400).json({
        success: false,
        msg: "There is some problem to create ticket",
      });
    }

    let current_time = Date.now();

    const generatedVisId = Math.floor(100000 + Math.random() * 900000)

    let loweruserData = new LoseruserModel({
      visitor_data: data,
      validater_list: validater_list,
      qrcode: "",
      email : data.email,
      service_id: serviceid,
      expired_time : current_time + validity*60*60*1000,
      vis_id : generatedVisId,
      payment_id : paymentId,
      remain_scans : remain_scans,
      order_id : orderId
    });
    let saveData = await loweruserData.save();

    let id = uuid();
    let typeNumber = 5;
    let errorCorrectionLevel = "M";
    let mode = "Byte";
    let text = `` + saveData._id;
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

    await LoseruserModel.findByIdAndUpdate({_id : saveData._id}, {$set : {qrcode : svg}});
    const payment1 =  new paymentDetailsModel({
      payment_id : paymentId,
      order_id : orderId,
      ticket_delivered : true,
      ticket_id : saveData._id
    })

    let paymentData = await payment1.save();

    // await paymentDetailsModel.findOneAndUpdate({payment_id : paymentId},{$set : {ticket_delivered : true , ticket_id : saveData._id}})

    if (saveData && svg) {
      res.status(200).json({
        success: true,
        msg: "Ticket Created !!!",
        visitorData: saveData,
        qrData: svg,
        paymentData : paymentData
      });
      // res.redirect(process.env.ORIGEN+"/ticket/"+saveData._id);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      msg: "There is some to create ticket",
      err: err,
    });
  }
};

const getTicket = async (req , res) => {
  const {email} = req.body ;

  try {
    const visitor_data = await LoseruserModel.findOne({
      email : email
    })

    return res.status(200).json({
      visitor_data : visitor_data
    })
    
  }catch(err) {
    console.log(err);
    return res.status(400).json({
      err : err ,
      success : false
    })
  }
}

const getLoweruserData = async (req, res) => {
  try {
    let loweruserData = await LoseruserModel.findOne({ _id: id });

    if (!lowerusersData) {
      return res.status(400).json({
        success: false,
        msg: "There is some to create ticket",
      });
    }
    res.status(200).json({
      success: true,
      msg: "There is some to create ticket",
      lowerusersData: lowerusersData,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "There is some to create ticket",
      err: err,
    });
  }
};

const setLoweruserDataT2 = async (req, res) => {
  try {
    console.log("type-2");
    var serviceid = req.params.id;
    var data = req.body.visitorData.visitor_data;
    var validater_list = req.body.visitorData.validater_list;
    console.log("visitor data : -", data);
    if (data == undefined) {
      return res.status(400).json({
        success: false,
        msg: "There is some problem to create ticket",
      });
    }
    var imageUrl = "";
    console.log(req.file,"oka7");

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
          blobStream.on("finish", async () => {
              await blob.makePublic();
              imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
              console.log("service image url !!!", imageUrl);

    const generatedVisId = () => Math.floor(100000 + Math.random() * 900000);


              let loweruserData = new LoseruserModel({
                visitor_data: data,
                validater_list: validater_list,
                qrcode: svg,
                service_id: serviceid,
                image_url : imageUrl ,
                vis_id : generatedVisId
              });
              let saveData = await loweruserData.save();
                    
              let id = uuid();
              let typeNumber = 5;
              let errorCorrectionLevel = "M";
              let mode = "Byte";
              let text = `` + saveData._id;
              let size = 4;
              let mar = 0;
          
              const qr = QRCode(typeNumber, errorCorrectionLevel);
          
              qr.addData(text, mode);
          
              qr.make();
          
              var svg = qr.createSvgTag({ cellSize: size, margin: mar });
              svg = svg.replace("\\", "");
          
              if (saveData && svg) {
                res.status(200).json({
                  success: true,
                  msg: "Ticket Created !!!",
                  visitorData: saveData,
                  qrData: svg,
                });
              }
          });
    
          blobStream.end(req.file.buffer);
        }
 
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      msg: "There is some to create ticket",
      err: err,
    });
  }
};

const getLowerusersData = async (req, res) => {
  try {
    console.log("getLowerusersData called!!");
    let service_id = req.params.id;

    let loweruserData = await LoseruserModel.find({ service_id: service_id });

    if (!loweruserData) {
      return res.status(400).json({
        success: false,
        msg: "QR not exit",
      });
    }
    res.status(200).json({
      success: true,
      msg: "There is some to create ticket",
      visitorList: loweruserData,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "There is some to create ticket",
      err: err,
    });
  }
};

const updateVisitorStatus = async (req, res) => {
  try {
    console.log("updateVisitorStatus called !!");
    let visitorId = req.params.id;
    let result = await LoseruserModel.findByIdAndUpdate(
      { _id: visitorId },
      {
        $set: {
          validation_status: true,
        },
      },
      { new: true }
    ).exec();

    if (result) {
      console.log(result);
      res.status(200).json({
        success: true,
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

// const downloadXLSheet = async (req, res) => {
//   const service_id = req.params.id;

//   try {
//     // const data = await LoseruserModel.find({ service_id: service_id });
//     // console.log(data,"data for excel");
//     // const array = [] ;

//     // data?.map((visitor,index)=>{
//     //   array.push({...visitor.visitor_data , status : visitor.payment_status});
//     // })
//     const data = [
//       ["Name", "Age", "City"],
//       ["John Doe", 30, "New York"],
//       ["Jane Smith", 25, "Los Angeles"],
//       ["Sam Johnson", 35, "Chicago"]
//     ];

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Sheet1");
//     // if(array.length === data.length){
//       worksheet.addRows(data);
//     // }

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=output.xlsx"
//     );

//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       err: err,
//       success: false,
//     });
//   }
// };

module.exports = {
  setLoweruserData,
  getLowerusersData,
  getLoweruserData,
  updateVisitorStatus,
  setLoweruserDataT2
};
