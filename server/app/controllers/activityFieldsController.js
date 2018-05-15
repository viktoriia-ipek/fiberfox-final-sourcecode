var baseController = require('./baseController');
var sql = require('mssql');

var activityFieldCtrl = {
  get: function (req, res) {
    baseController.get(req, res, 'ActivityFields');
  },

  find: function (req, res) {
    baseController.find(req, res, 'ActivityFields', 'ActivityFieldId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[ActivityFields] 
      ([FieldName], [SortOrder]) 
      VALUES 
      (@FieldName, @SortOrder)`;
    let inputList = [
      { parameter: "FieldName", type: sql.NVarChar, value: req.body.FieldName },
      { parameter: "SortOrder", type: sql.Int, value: req.body.SortOrder }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[ActivityFields]
      SET [FieldName] = @FieldName,
          [SortOrder] = @SortOrder
      WHERE ActivityFieldId = @ActivityFieldId`;
    let inputList = [
      { parameter: "FieldName", type: sql.NVarChar, value: req.body.FieldName },
      { parameter: "SortOrder", type: sql.NVarChar, value: req.body.SortOrder },
      { parameter: "ActivityFieldId", type: sql.Int, value: req.params.id }];
      
    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'ActivityFields', 'ActivityFieldId', req.params.id);
  }
};

module.exports = activityFieldCtrl;
