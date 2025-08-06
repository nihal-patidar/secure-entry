import React, { useState } from "react";
import api from "../../../axiosConfig";
import { devLog } from "../../../devLog";

const RazorpayPayment = ({ amount, postData, fData }) => {
  // const [amount, setAmount] = useState(0);

  const handlePayment = async () => {
    try {
      // Step 1: Get the order ID from the backend
      const response = await api.post("/payment/create-order", { amount });
      const { orderId } = response.data;

      // Step 2: Initiate Razorpay Checkout
      const options = {
        key: process.env.P_KEY, // Your Razorpay key ID
        // key: "rzp_test_cEYK0GgkqeH5u6",
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "EntrySecure",
        description: "Payment for Tickets",
        order_id: orderId,
        handler: async function (response) {
          // devLog.log("response handler's", response);
          let paymentId = response.razorpay_payment_id;

          let ticketId = await postData({ fData, paymentId, orderId });
          if (ticketId == null) {
            ticketId = await postData({ fData, paymentId, orderId });
          }
          await api.post("/payment/verify-payment", {
            paymentId: response.razorpay_payment_id,
            orderId: orderId,
            signature: response.razorpay_signature,
            ticketId: ticketId,
          });
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Failed ssss", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-300"
    >
      {`Pay Now  ${amount} .Rs`}
    </button>
  );
};

export default RazorpayPayment;
