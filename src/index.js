const app = require('./app');
const { APP_NAME, APP_VERSION, PORT } = require('./helpers/env');
const { failed } = require('./helpers/response');
const userRoute = require('./routes/user.router');
const bookingRoute = require('./routes/booking.route');
const countryRoute = require('./routes/country.route');
const cityRoute = require('./routes/city.route');

app.use(require('./routes/auth.route'));
app.use(require('./routes/airlines.route'));
app.use(require('./routes/flights.route'));
app.use(require('./routes/pic.route'));

// root router
// app.use('/', (req, res) => {
//   res.send(`${APP_NAME} ${APP_VERSION}`);
// });

// handling error route doesn't exist
// app.use('/*', (req, res) => {
//   failed(res, {
//     code: 404,
//     status: 'error',
//     message: 'not found',
//     error: 'url not found',
//   });
// });
app.use(userRoute);
app.use(bookingRoute);
app.use(countryRoute);
app.use(cityRoute);

// set port or using default port, listen for requests
const port = PORT;
app.listen(port, () => console.log(`Server running at port ${port}`));
