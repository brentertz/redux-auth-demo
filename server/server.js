const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require( '../webpack.config.dev');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const compiler = webpack(config);
const app = express();
const jsonParser = bodyParser.json();
const port = process.env.PORT || 3000;

const db = require('./database');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(morgan('dev'));

passport.use(new JwtStrategy({ secretOrKey: 'secret' }, (payload, done) => {
  db.find({
    selector: { _id: payload._id },
    limit: 1,
    fields: ['_id', 'name', 'email']
  }).then((result) => {
    const user = result.docs[0];
    done(null, user || false);
  }).catch((err) => {
    console.error(err);
    done(err);
  });
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).send('This is protected content');
});

app.post('/api/sessions', jsonParser, (req, res, next) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  db.find({
    selector: { email: req.body.email, password: req.body.password },
    limit: 1,
    fields: ['_id', 'name', 'email']
  }).then((result) => {
    const user = result.docs[0];
    if (!user) {
      res.sendStatus(401);
    } else {
      const token = jwt.sign(user, 'secret');
      res.status(201).send(token);
    }
  }).catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('🌎  Server listening at http://localhost:%s', port);
  }
});
