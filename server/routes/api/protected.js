const passport = require('passport');

module.exports = (app) => {
  const ProtectedHandler = require('../../handlers/api/protected-handler')();

  app.get('/api/protected', passport.authenticate('jwt', { session: false }), ProtectedHandler.index);
};
