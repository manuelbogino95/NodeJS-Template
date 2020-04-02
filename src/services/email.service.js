const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (email, subject, text) => {
  sgMail.send({
    to: email,
    from: process.env.EMAIL,
    subject,
    text,
  });
};

module.exports = {
  sendEmail,
};
