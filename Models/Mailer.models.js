const nodemailer = require("nodemailer");

function verificationMail(targetemail) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // replace with your email provider's SMTP server hostname
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "st.4.melhout.202031004493@gmail.com", // replace with your email address
      pass: "zbgfxipgyrmjluxf", // replace with your email password
    },
  });

  function generateRandomNumber() {
    const min = 1000; // Minimum value (inclusive)
    const max = 9999; // Maximum value (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }
  const TheCode = generateRandomNumber();
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"LANCHAT" <st.4.melhout.202031004493@gmail.com>', // replace with your name and email address
    to: targetemail, // replace with the recipient email address
    subject: "Please verify your email address",
    text: "Hello,\n\n" + `Here Your Code : ${TheCode}\n\n` + "Thank you!\n",
  };

  // send mail with defined transport object
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        if (error.code === "ECONNECTION") {
          resolve(false);
        } else {
          throw error;
        }
      } else resolve(TheCode);
    });
  });
}

exports.verificationMail = verificationMail;
