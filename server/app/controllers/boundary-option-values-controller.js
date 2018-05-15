var baseController = require('./baseController');
const sql = require('mssql');

var filterValuesController = {
  get: function (req, res) {
    var query = `SELECT bo.BoundaryOptionId, bo.BoundaryText, bov.BoundaryOptionValueId, bov.AlgorithmValue, 
                  rm.ResultMenuId, 
                  rm.Name AS ResultMenuName
                FROM [dbo].[BoundaryOptions] bo
                INNER JOIN [Boundaries] b
                ON b.BoundaryId = bo.BoundaryId
                JOIN [dbo].[ResultMenu] rm
                ON b.TopicId = rm.TopicId
                LEFT JOIN [dbo].[BoundaryOptionValues] bov
                ON bov.BoundaryOptionId = bo.BoundaryOptionId AND bov.ResultMenuId = rm.ResultMenuId
                WHERE bo.BoundaryId=@BoundaryId
                ORDER BY bo.BoundaryOptionId`;
    let inputList = [{ parameter: "BoundaryId", type: sql.Int, value: req.params.id }];
    baseController.executeQuery(query, inputList)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  find: function (req, res) {
    baseController.find(req, res, 'BoundaryOptions', 'BoundaryOptionId', req.params.id);
  },

  post: function (req, res) {
    let insertQuery = `INSERT INTO [dbo].[BoundaryOptionValues] ([BoundaryOptionId], [AlgorithmValue], [ResultMenuId]) VALUES `;
    let updateQuery = "";
    if (Array.isArray(req.body.resultMenu) && req.body.resultMenu.length > 0) {
      let newValues = req.body.resultMenu.filter(m => typeof m.AlgorithmValue === 'number' && !m.BoundaryOptionValueId);
      newValues.forEach((element, i) => {
        insertQuery += `(${element.BoundaryOptionId}, ${element.AlgorithmValue}, ${element.ResultMenuId}),`;
      });
      if (newValues && newValues.length > 0)
        insertQuery = insertQuery.slice(0, -1);
      else
        insertQuery = "";

      let updatedValues = req.body.resultMenu.filter(m =>typeof m.AlgorithmValue === 'number' && m.BoundaryOptionValueId);
      updatedValues.forEach(element => {
        updateQuery += `UPDATE [dbo].[BoundaryOptionValues]
                        SET AlgorithmValue=${element.AlgorithmValue}
                        WHERE BoundaryOptionValueId=${element.BoundaryOptionValueId} `;
      });

    }
    var query = updateQuery + insertQuery;
    baseController.executeQuery(query)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'BoundaryOptions', 'BoundaryOptionId', req.params.id);
  }
};

module.exports = filterValuesController;