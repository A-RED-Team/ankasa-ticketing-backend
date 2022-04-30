// importexpressjs
const express = require('express');
// import cors
const cors = require('cors');
// import xss-clean
const xssClean = require('xss-clean');
// import helmet
const helmet = require('helmet');
// importbody-parser
const bodyParser = require('body-parser');
// import authRoute
const authRoute = require('./src/routes/auth.route');
// require('dotenv').config();
const { PORT } = require('./src/helpers/env');
const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(xssClean());
app.use(cors());
app.use(bodyParser.json());
app.use(authRoute);
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log('dek');
  console.log(`service RUN at port ${PORT}`);
});
