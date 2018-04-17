const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'menwatch001@gmail.com',
      pass: 'Yokk@ichi8'
  }
});

let sendEmail = async (to_email,msg) => {
  let mailOptions = {
      from: '"MenWatches - Please do not reply" <menwatch001@gmail.com>',
      to: `${to_email}`,
      subject: 'Email from MenWatches',
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
