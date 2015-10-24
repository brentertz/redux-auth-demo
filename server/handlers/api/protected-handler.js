module.exports = () => {
  return {
    index: function(req, res) {
      res.status(200).send('This is protected content');
    }
  };
};

