const nodemailer = require('nodemailer');

// Function to send OTP using Gmail
const sendOTP = async (email, otp) => {
  try {
    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rideshareappkarachi@gmail.com', // Your Gmail email address
        pass: 'kfyxjrhutninnfxw', 
      },
    });

    // Compose the email message
    const mailOptions = {
      from: 'rideshareappkarachi@gmail.com', // Sender email address
      to: email, // Recipient email address
      subject: 'OTP Verification', // Email subject
      text: `Your OTP is: ${otp}`, // Plain text body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = { sendOTP };
