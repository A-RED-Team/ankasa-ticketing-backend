const app = require('./app');
const { APP_NAME, APP_VERSION, PORT } = require('./helpers/env');
const { failed } = require('./helpers/response');

// root path
// app.get('/', (req, res) => {
//   res.send(`${APP_NAME} ${APP_VERSION}`);
// });

app.use(require('./routes/auth.route'));
app.use(require('./routes/user.router'));
app.use(require('./routes/booking.route'));
app.use(require('./routes/flights.route'));
app.use(require('./routes/country.route'));
app.use(require('./routes/city.route'));
app.use(require('./routes/airlines.route'));
app.use(require('./routes/pic.route'));

// error handling route
// app.use((req, res) => {
//   failed(res, {
//     code: 404,
//     status: 'error',
//     message: 'Url not found',
//     error: [],
//   });
// });

// set port or using default port, listen for requests
const port = PORT;
app.listen(port, () => console.log(`Server running at port ${port}`));
