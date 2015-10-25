const jwt = require('jsonwebtoken');

module.exports = (app) => {
  return {
    index: (req, res) => {
      if (!req.body) {
        return res.sendStatus(400);
      }

      app.services.database.db.find({
        selector: { email: req.body.email, password: req.body.password },
        limit: 1,
        fields: ['_id', 'name', 'email']
      }).then((result) => {
        const user = result.docs[0];
        if (!user) {
          res.sendStatus(401);
        } else {
          const token = jwt.sign(user, 'secret');
          res.status(201).send(token);
        }
      }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    }
  };
};

