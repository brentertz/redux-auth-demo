module.exports = (app) => {
  require('./secrets')(app);
  require('./sessions')(app);
};

