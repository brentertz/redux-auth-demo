const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require( './webpack.config.dev');
const morgan = require('morgan');

const compiler = webpack(config);
const app = express();
const jsonParser = bodyParser.json();
const port = process.env.PORT || 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(morgan('dev'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.post('/api/auth', jsonParser, (req, res, next) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  // Simulate user lookup.  Please don't actually do this!
  if (req.body.email === 'foo@bar.com' && req.body.password === 'password') {
    const token = Math.random().toString(36).substring(7);
    res.status(200).json({ token });
  } else {
    res.sendStatus(401);
  }
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('🌎  Server listening at http://localhost:%s', port);
  }
});
