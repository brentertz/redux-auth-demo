const path = require('path');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
PouchDB.debug.enable('*');
const users = require('../lib/data/users');
const secrets = require('../lib/data/secrets');

module.exports = {
  init: (app) => {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('users', {
        auto_compaction: true, // eslint-disable-line camelcase
        prefix: path.join(__dirname, '../../database/')
      });

      users.forEach(user => db.put(user));
      secrets.forEach(secret => db.put(secret));

      db.createIndex({
        index: {
          fields: ['email', 'password']
        }
      });

      app.services.database.db = db;

      resolve(db);
    });
  }
};
