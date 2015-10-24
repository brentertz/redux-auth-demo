const logger = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require( '../../webpack.config.dev');
const compiler = webpack(config);
const auth = require('./auth');

module.exports = (app) => {
  app.use(logger('dev'));

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));

  auth(app);
};
