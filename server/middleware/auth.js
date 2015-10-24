const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

module.exports = (app) => {
  passport.use(new JwtStrategy({ secretOrKey: 'secret' }, (payload, done) => {
    app.services.database.db.find({
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
};
