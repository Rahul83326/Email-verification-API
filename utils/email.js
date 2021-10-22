const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "rahulthangamani2002@gmail.com",
      pass: "8608340306",
    },
    tls: {
      rejectUnauthorized: false
    },
 // secure: true, // upgrades later with STARTTLS -- change this based on the PORT

  });

  // 2) Define the email options
  const mailOptions = {
    from: "rahulthangamani2002@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
