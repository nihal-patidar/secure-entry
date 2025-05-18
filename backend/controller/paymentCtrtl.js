const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_SECRET_KEY',
});

// Route to create an order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be in paise, e.g., 5000 (₹50)

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: 'INR',
      receipt: `receipt_${Math.random()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating Razorpay order' });
  }
});

module.exports = router;
