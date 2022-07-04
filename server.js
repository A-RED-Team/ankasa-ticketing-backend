const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const bodyParser = require('body-parser');
const { APP_NAME, APP_VERSION, NODE_ENV, PORT } = require('./src/helpers/env');
const { failed } = require('./src/helpers/response');

const app = express();

app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

// set security HTTP headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// sanitize request data
app.use(xss());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// ejs
app.set('views', `${__dirname}/src/views`);
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.send(`${APP_NAME} API - ${NODE_ENV[0].toUpperCase() + NODE_ENV.slice(1)}`)
);

app.use(require('./src/routes/auth.route'));
app.use(require('./src/routes/user.route'));
app.use(require('./src/routes/booking.route'));
app.use(require('./src/routes/flights.route'));
app.use(require('./src/routes/country.route'));
app.use(require('./src/routes/city.route'));
app.use(require('./src/routes/airlines.route'));
app.use(require('./src/routes/pic.route'));

app.use((req, res) => {
  failed(res, {
    code: 404,
    message: 'Resource on that url not found',
    error: 'Not Found',
  });
});

app.listen(PORT, () => {
  console.log(
    `Server running running at port ${PORT} with ${NODE_ENV} environment`
  );
});
