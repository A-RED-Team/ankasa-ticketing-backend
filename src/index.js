const { APP_NAME, APP_VERSION, PORT } = require('./helpers/env');
const { failed } = require('./helpers/response');
const authRoute = require('./routes/auth.route');
const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

// enable cors
app.use(cors());
app.options('*', cors());

// sanitize request data
app.use(xss());

// set security HTTP headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));
// root router
// app.use('/', (req, res) => {
//   res.send(`${APP_NAME} ${APP_VERSION}`);
// });
// router
app.use(authRoute);

// handling error route doesn't exist
app.use('/*', (req, res) => {
  failed(res, {
    code: 404,
    status: 'error',
    message: 'not found',
    error: 'url not found',
  });
});

// set port or using default port, listen for requests
const port = PORT || 3001;
app.listen(port, () => console.log(`Server running at port ${port}`));
