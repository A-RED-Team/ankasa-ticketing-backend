const app = require('./app');
const { APP_NAME, APP_VERSION, PORT } = require('./helpers/env');
const { failed } = require('./helpers/response');

app.use(require('./routes/auth.route'));

// root router
app.use('/', (req, res) => {
  res.send(`${APP_NAME} ${APP_VERSION}`);
});

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
const port = PORT;
app.listen(port, () => console.log(`Server running at port ${port}`));
