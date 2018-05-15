var baseController = require('./baseController');
const sql = require('mssql');

var indFieldCtrl = {
  get: function (req, res) {
    baseController.get(req, res, 'IndustryFields');
  },

  find: function (req, res) {
    baseController.find(req, res, 'IndustryFields', 'IndustryFieldId', req.params.id);
  },

  post: function (req, res) {
    var query =
      `INSERT INTO [dbo].[IndustryFields]
        ([FieldName], [Sortorder])
       VALUES (@FieldName, @Sortorder)`;
    let inputList = [
      { parameter: "FieldName", type: sql.NVarChar, value: req.body.FieldName },
      { parameter: "Sortorder", type: sql.Int, value: req.body.SortOrder }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[IndustryFields]
      SET [FieldName] = @FieldName,
          [SortOrder] = @SortOrder
      WHERE IndustryFieldId = @IndustryFieldId`;
    let inputList = [
      { parameter: "FieldName", type: sql.NVarChar, value: req.body.FieldName },
      { parameter: "SortOrder", type: sql.NVarChar, value: req.body.SortOrder },
      { parameter: "IndustryFieldId", type: sql.Int, value: req.params.id }];
      
    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'IndustryFields', 'IndustryFieldId', req.params.id);
  }
};

module.exports = indFieldCtrl;
