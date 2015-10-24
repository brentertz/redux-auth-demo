module.exports = (app) => {
  require('./protected')(app);
  require('./sessions')(app);
};

