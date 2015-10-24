module.exports = (app) => {
  require('./app')(app);
  require('./api')(app);
};
