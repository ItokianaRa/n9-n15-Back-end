let Matiere = require('../model/matiere');

function getMatiere(req, res) {
    var aggregateQuery = Matiere.aggregate();
    Matiere.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10
      },
      (err, matiere) => {
        if (err) {
          res.send(err);
        }
        res.send(matiere);
      }
    );
   }

   module.exports = { getMatiere}