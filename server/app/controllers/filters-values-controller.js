var baseController = require('./baseController');
const sql = require('mssql');

var filterValuesController = {
  get: function (req, res) {
    var query = `SELECT tf.TargetFilterId, tf.FilterText, tfv.TargetFilterValueId, tfv.AlgorithmValue, 
                  rm.ResultMenuId, 
                  rm.Name AS ResultMenuName
                 FROM [dbo].[TargetFilters] tf
                 INNER JOIN TargetFilterGroups tfg
                 ON tfg.TargetFilterGroupId=tf.TargetFilterGroupId
                 JOIN [dbo].[ResultMenu] rm
                 ON rm.TopicId = tfg.TopicId
                 LEFT JOIN [dbo].[TargetFilterValues] tfv
                 ON tfv.TargetFilterId = tf.TargetFilterId AND tfv.ResultMenuId = rm.ResultMenuId
                 WHERE tf.TargetFilterGroupId=@TargetFilterGroupId
                 ORDER BY tf.TargetFilterId`;
    let inputList = [{ parameter: "TargetFilterGroupId", type: sql.Int, value: req.params.id }];
    baseController.executeQuery(query, inputList)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  find: function (req, res) {
    baseController.find(req, res, 'TargetFilters', 'TargetFilterId', req.params.id);
  },

  post: function (req, res) {
    let insertQuery = `INSERT INTO [dbo].[TargetFilterValues] ([TargetFilterId], [AlgorithmValue], [ResultMenuId]) VALUES `;
    let updateQuery = "";
    if (Array.isArray(req.body.resultMenu) && req.body.resultMenu.length > 0) {
      let newValues = req.body.resultMenu.filter(m => typeof m.AlgorithmValue === 'number' && !m.TargetFilterValueId);
      newValues.forEach((element, i) => {
        insertQuery += `(${element.TargetFilterId}, ${element.AlgorithmValue}, ${element.ResultMenuId}),`;
      });
      if (newValues && newValues.length > 0)
        insertQuery = insertQuery.slice(0, -1);
      else
        insertQuery = "";

      let updatedValues = req.body.resultMenu.filter(m => typeof m.AlgorithmValue === 'number' && m.TargetFilterValueId);
      updatedValues.forEach(element => {
        updateQuery += `UPDATE [dbo].[TargetFilterValues]
                        SET AlgorithmValue=${element.AlgorithmValue}
                        WHERE TargetFilterValueId=${element.TargetFilterValueId} `;
      });

    }
    var query = updateQuery + insertQuery;
    baseController.executeQuery(query)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    var query = `DELETE FROM [dbo].[TargetFilterValues]
                 WHERE TargetFilterId = @TargetFilterId
                 DELETE FROM TargetFilters 
                 WHERE TargetFilterId=@TargetFilterId`;

    let inputList = [{ parameter: "TargetFilterId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  }
};

module.exports = filterValuesController;