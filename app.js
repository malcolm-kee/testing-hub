require('dotenv').load();
const express = require('express');
const fallback = require('express-history-api-fallback');
const compression = require('compression');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

const routesApi = require('./app_api/routes/index');

const app = express();
const rootPath = path.join(__dirname, 'build');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(express.static(rootPath));

app.use(passport.initialize());

app.use('/api', routesApi);

app.use(fallback('index.html', { root: rootPath }));

app.use((err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: `${err.name}: ${err.message}` });
  }
});

module.exports = app;
