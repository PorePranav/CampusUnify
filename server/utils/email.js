const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
exports.SEND = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_APP_EMAILID,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'CampusUnify <hello@campusunify.com>',
    to: options.email,
    subject: options.subject,
    html: options.emailBody,
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
