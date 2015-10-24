const express = require('express');
const logger = require('morgan');
const path = require('path');
const pushState = require('connect-pushstate');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require( '../../webpack.config.dev');
const compiler = webpack(config);
const auth = require('./auth');

module.exports = (app) => {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));

  app.use(pushState({ allow: '^/api' }));

  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use(express.static(path.join(__dirname, '../public')));

  auth(app);

  app.use(logger('dev'));
};
