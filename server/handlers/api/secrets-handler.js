module.exports = (app) => {
  return {
    index: (req, res) => {
      app.services.database.db.query(
        (doc, emit) => {
          if (doc._id.startsWith('secret')) {
            emit(doc);
          }
        }, { include_docs: true } // eslint-disable-line camelcase
      ).then((result) => {
        const secrets = result.rows.map(row => row.doc);
        res.status(200).send({ secrets: secrets });
      }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    }
  };
};

