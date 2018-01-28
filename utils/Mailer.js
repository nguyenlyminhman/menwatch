const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'mannlmgt60850@fpt.edu.vn',
      pass: 'Yokk@ichi8'
  }
});

let sendEmail = async (to_email,msg) => {
  let mailOptions = {
      from: '"Luxury Watch - Please do not reply" <mannlmgt60850@fpt.edu.vn>',
      to: `${to_email}`,
      subject: 'Email from Luxury Watch',
      text: 'Mail Auto',
      html: `${msg}`
  };

  let sendToEmail = () => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return reject(console.log(err));
        }
        resolve();
        // console.log("messages %s send: %s", info.messageId,info.response)
      });
    });
  }
  await sendToEmail();
}

module.exports = {sendEmail};
