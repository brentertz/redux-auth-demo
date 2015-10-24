const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = (app) => {
  const SessionsHandler = require('../../handlers/api/sessions-handler')(app);

  app.post('/api/sessions', jsonParser, SessionsHandler.index);
};

