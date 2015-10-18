const path = require('path');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
PouchDB.debug.enable('*');

const db = new PouchDB('users', {
  auto_compaction: true, // eslint-disable-line camelcase
  prefix: path.join(__dirname, '../database/')
});

// NOTE: This is for demonstration purposes only. Do not store plain text passwords!
const users = [
  { _id: '1', name: 'Foo Bar', email: 'foo@bar.com', password: 'password' },
  { _id: '2', name: 'Baz Quux', email: 'baz@quux.com', password: 'password' }
];

users.forEach(user => db.put(user));

db.createIndex({
  index: {
    fields: ['email', 'password']
  }
});

module.exports = db;
