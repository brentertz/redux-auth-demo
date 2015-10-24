module.exports = (app) => {
  const AppHandler = require('../handlers/app-handler')();

  app.get('/', AppHandler.index);
};
