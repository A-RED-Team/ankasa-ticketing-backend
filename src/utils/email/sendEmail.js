const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();
// console.log('hhhh');
// console.log(process.env.GOOGLE_REFRESH_TOKEN);
const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const sendEmail = async (dataEmail) => {
  try {
    // nodemailer configuration
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken,
      },
    });

    // send email
    transporter.sendMail(dataEmail, (error, response) => {
      error ? console.log(error) : console.log(response);
      transporter.close();
    });
    // transporter
    //   .sendMail(dataEmail)
    //   .then((info) => {
    //     console.log('Email sended successfully.');
    //     console.log(info);
    //   })
    //   .catch((error) => {
    //     console.log('node mailer error');
    //     console.log(error);
    //     process.exit(1);
    //   });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = sendEmail;
