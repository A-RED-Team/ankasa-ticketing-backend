const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
// require('dotenv').config();
const { GMAIL_PASS, GMAIL_USER, APP_URL } = require('./env');
const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

module.exports = {
  sendConfirmationEmail: (email, confirmationCode, username) => {
    transport.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.html',
          partialsDir: path.resolve('./src/template/email'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./src/template/email'),
        extName: '.html',
      })
    );
    const mailOptions = {
      from: '"ANKASA TICKETING" <admin@ankasa.co.id>',
      to: email,
      subject: 'Please Confirm Your Account',
      text: 'Confirm Your email Ankasa Ticketing Account',
      template: 'confirm-email',
      context: {
        url: `${APP_URL}/auth/verify-email?token=${confirmationCode}`,
        username: `${username}`,
      },
    };

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};
