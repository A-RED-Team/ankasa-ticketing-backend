const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const { GMAIL_PASS, GMAIL_USER, APP_URL, APP_CLIENT } = require('./env');

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
  sendConfirmationEmail: (email, confirmationCode, photo) => {
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
      subject: 'Please Confirm Your Reset Password',
      text: 'Confirm Your Reset Password Ankasa Ticketing Account',
      template: 'reset-password',
      context: {
        url: `${APP_CLIENT}/reset-password?token=${confirmationCode}`,
        photo: `${APP_CLIENT}/uploads/user/${photo}`,
      },
    };

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};
