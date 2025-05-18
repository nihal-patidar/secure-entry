require("dotenv").config();
const nodemailer = require("nodemailer");


let otpStore = {}; // Temporary OTP store

// Setup transporter (using Gmail SMTP)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.S_EMAIL, // Your Gmail
        pass: process.env.S_PASSWORD, // App Password (Enable "Less Secure Apps" in Google or use App Password)
    },
});

// Generate OTP and send email
const sendOtp =  async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    otpStore[email] = otp; // Store OTP (use Redis/DB in production)

    const mailOptions = {
        from: process.env.S_EMAIL,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error sending OTP" });
    }
}

const verifyOtp = async(req, res) => {
    const { email, otp } = req.body;
    if (otpStore[email] === otp) {
        delete otpStore[email]; // Remove OTP after successful verification
        return res.json({ success: true, message: "OTP verified successfully" });
    }
    res.status(400).json({ error: "Invalid OTP" });
}

module.exports = {sendOtp , verifyOtp} ;

