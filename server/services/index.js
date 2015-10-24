const database = require('./database');

module.exports = (app) => {
  app.services = {
    database
  };
};
