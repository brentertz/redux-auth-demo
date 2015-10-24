const path = require('path');

module.exports = () => {
  return {
    index: function(req, res) {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    }
  };
};
