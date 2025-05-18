const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
// const PaymentDetails = require("../models/paymentDetailsModel");
const paymentDetailsModel = require("../models/paymentDetailsModel");
const lowuserModel = require("../models/lowuserModel");

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.P_KEY,
  key_secret: process.env.P_SECRET,
});

// Route to create an order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("amount", amount);

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("payment order " , order);
    res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating order" });
  }
});

// Route to verify payment
router.post("/verify-payment", async (req, res) => {
  console.log("verifing", req.body);
  try {
    const { paymentId, orderId, signature ,ticketId } = req.body;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.P_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    console.log("String for hashing:", `${orderId}|${paymentId}`);

    console.log("Order ID:", orderId);
    console.log("Payment ID:", paymentId);
    console.log("Received Signature:", signature);
    console.log("Generated Signature:", generatedSignature);

    if (generatedSignature === signature) {

    await paymentDetailsModel.findOneAndUpdate({payment_id : paymentId},{$set : {verified_payment_status : true }})
      await lowuserModel.findByIdAndUpdate({_id : ticketId} , {$set : {payment_status : true}})

      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error verifying payment" });
  }
});

module.exports = router;
