const express = require('express');
const app = express();

const middleware = require('../middleware');
const routes = require('../routes');
const services = require('../services');

app.set('port', process.env.PORT || 3000);

services(app);
routes(app);
middleware(app);

module.exports = app;
