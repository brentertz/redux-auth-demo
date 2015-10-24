const http = require('http');

const app = require('./lib/app');
const port = app.get('port');

app.services.database.init(app).then(() => {
  http.createServer(app).listen(port, (err) => {
    if (err) {
      console.err(err);
      return;
    }
    console.log('🌍  Server listening on port %d', port);
  });
});
