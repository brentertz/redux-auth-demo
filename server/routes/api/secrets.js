const passport = require('passport');

module.exports = (app) => {
  const SecretsHandler = require('../../handlers/api/secrets-handler')(app);

  app.get('/api/secrets', passport.authenticate('jwt', { session: false }), SecretsHandler.index);
};
