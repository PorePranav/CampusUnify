const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: 'CampusUnify <noreply@campusunify.com>',
    to: email,
    subject: 'Email Verification for CampusUnify',
    html: `
      <h1>Welcome to CampusUnify!</h1>
      <p>Your verification code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

exports.generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
};